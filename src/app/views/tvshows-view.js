var app = app || {};

(function ($) {

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var self = this;
            self.$el.html(self.template({tvshow: {}, episodes: {}}));

            self.model = new app.TvShow({id: id});

            self.model.fetch().success(function() {
                var date = new moment(self.model.attributes.releaseDate);

                self.model.attributes.artworkUrl100 = self.model.attributes.artworkUrl100.replace("100x100", "600x600");
                self.model.attributes.releaseDate = date.format("YYYY");

                self.$el.html(self.template({tvshow: self.model.toJSON(), episodes: {}}));

                self.episodeCollection = new app.Episodes();
                self.episodeCollection.url = "/tvshows/season/" + self.model.id + "/episodes";

                self.episodeCollection.fetch({parseModel: false}).complete(function() {
                    self.$el.html(self.template({tvshow: self.model.toJSON(), episodes: self.episodeCollection.toJSON()}));
                    var firstEpisodeDate = new moment(self.episodeCollection.first().attributes.releaseDate);
                    $('#first-episode').text(firstEpisodeDate.format("MMM Do YYYY"));
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
                    var request = app.getYoutubeRequestFromMovieTitle(self.model.attributes.collectionName);
                    request.execute(function(response) {
                        var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                        $('#preview-container').html("<iframe class='preview' width='560' height='315' src='"+ videoURL +"' frameborder='0' allowfullscreen></iframe>");
                    });
                };
            });
        }
    });


})(jQuery);