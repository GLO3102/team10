var app = app || {};

(function ($) {

    var PreviewView = Backbone.View.extend({
        template: _.template($('#preview-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (el, url) {
            el.html(this.template({ url: url }));
        }
    });

    app.MoviesView = Backbone.View.extend({

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.preview = new PreviewView();
        },

        events: {
            "click #btn-add-to-watchlists": "addToWatchlists"
        },

        render: function (id) {
            var that = this;

            that.model = new app.Movie({id: id});
            that.watchlists = new app.Watchlists();

            this.model.fetch().success(function() {
                var date = new moment(that.model.attributes.releaseDate);

                that.model.attributes.releaseDate = date.format("MMM Do YYYY");
                that.model.attributes.artworkUrl100 = that.model.attributes.artworkUrl100.replace("100x100", "600x600");

                that.$el.html(that.template({movie: that.model.toJSON(), watchlists: {}}));

                that.watchlists.fetch().complete(function() {
                    var userWatchlists = [];

                    that.watchlists.toJSON().forEach(function(watchlist) {
                        if (watchlist.owner) {
                            if (watchlist.owner.id === app.currentUser.attributes.id) {
                                userWatchlists.push(watchlist);
                            }
                        }
                    });

                    that.$el.html(that.template({movie: that.model.toJSON(), watchlists: userWatchlists}));
                });

                var timer = setInterval(checkGoogleLoaded, 300);

                function checkGoogleLoaded() {
                    if (app.googleAPILoaded) {
                        clearTimeout(timer);
                        gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                        gapi.client.load('youtube', 'v3', searchOnYoutube)
                    }
                }

                var searchOnYoutube = function() {
                    var request = app.getYoutubeRequestFromTitle(that.model.attributes.trackName);
                    request.execute(function(response) {
                        var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                        that.preview.render($('#movie-preview-container'), videoURL);
                    });
                };
            });
        },

        addToWatchlists: function()
        {
            var self = this;

            var $modal = self.$('#add-movie-to-watchlist-modal');
            var checkboxes = $modal.find('input[type="checkbox"]');
            self.model.isNew = function(){return true;};

            var isValid = true;

            checkboxes.each(function(index, checkbox)
            {
                if($(checkbox).is(':checked'))
                {
                    var watchlistId = $(checkbox).attr("data-watchlist-id");
                    var watchlist = _.find(self.watchlists.models, function(watchlist)
                    {
                       return watchlist.id === watchlistId;
                    });

                    if(watchlist.containsMovie(self.model))
                    {
                        alert("The watchlist " + watchlist.attributes.name + " already contains this movie.");
                        isValid = false;
                        return false;
                    }
                    else
                    {
                        self.model.save({}, {url: "/watchlists/" + watchlistId + "/movies"}).complete(function()
                        {
                            watchlist.fetch();
                        });
                    }
                }
            });

            if(isValid) $modal.modal('hide');
        }
    });

})(jQuery);
