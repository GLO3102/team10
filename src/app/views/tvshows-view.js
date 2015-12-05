var app = app || {};

(function ($) {

    var episodesView = Backbone.View.extend({
        template: _.template($('#tvshow-episodes-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id, searchEpisodes) {
            var that = this;

            if (typeof searchEpisodes === 'undefined') {
                this.episodeCollection = new app.Episodes();
                this.episodeCollection.url = "/tvshows/season/" + id + "/episodes";

                this.episodeCollection.fetch({parseModel: false}).complete(function() {
                    $('#episodes-container').html(that.template({episodes: that.episodeCollection.toJSON()}));
                    var firstEpisodeDate = new moment(that.episodeCollection.first().attributes.releaseDate);
                    $('#first-episode').text(firstEpisodeDate.format("MMM Do YYYY"));
                });
            } else {
                $('#episodes-container').html(that.template({episodes: searchEpisodes.toJSON()}));
            }
        },

        getEpisodeCollection: function() {
            return this.episodeCollection;
        }
    });

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.episodes = new episodesView();
        },

        events: {
            "click .previewButton": "showPreview",
            "click .closePreview": "closePreview",
            "keydown #search-episodes-input": "searchEpisodes",
            "blur #search-episodes-input": "checkClearSearch"
        },

        render: function (id) {
            var self = this;
            self.id = id;

            self.$el.html(self.template({tvshow: {}}));

            self.model = new app.TvShow({id: id});

            self.model.fetch().success(function() {
                var date = new moment(self.model.attributes.releaseDate);

                self.model.attributes.artworkUrl100 = self.model.attributes.artworkUrl100.replace("100x100", "600x600");
                self.model.attributes.releaseDate = date.format("YYYY");

                self.$el.html(self.template({tvshow: self.model.toJSON()}));

                self.episodes.render(self.id);


                var timer = setInterval(checkGoogleLoaded, 300);

                function checkGoogleLoaded() {
                    if (app.googleAPILoaded) {
                        clearTimeout(timer);
                        gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                        gapi.client.load('youtube', 'v3', searchOnYoutube)
                    }
                }

                var searchOnYoutube = function() {
                    var request = app.getYoutubeRequestFromTitle(self.model.attributes.collectionName);
                    request.execute(function(response) {
                        var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                        $('#preview-container').html("<iframe class='preview' width='560' height='315' src='"+ videoURL +"' frameborder='0' allowfullscreen></iframe>");
                    });
                };
            });
        },

        showPreview: function(event) {
            var trackId = $(event.currentTarget).data('trackid');
            var episode = {};

            var episodeCollection = this.episodes.getEpisodeCollection();

            for (var i = 0; i < episodeCollection.models.length; ++i) {
                if (episodeCollection.models[i].attributes.trackId == trackId) {
                    episode = episodeCollection.models[i].attributes;
                    break;
                }
            }

            episode.artworkUrl100 = episode.artworkUrl100.replace("100x100", "700x700");
            episode.trackTimeMin = Math.round(episode.trackTimeMillis / 60000);

            $('#modal-tvshow-title').text(episode.collectionName);
            $('#modal-tvshow-epidode-title').text(episode.trackName);
            $('#modal-tvshow-epidode-time').text(episode.trackTimeMin + ' min');
            document.getElementById('tvShowEpisodeModalBody').innerHTML = episode.longDescription;
            document.getElementById('tvShowEpisodeModalContent').style.backgroundImage = 'url(' + episode.artworkUrl100 + ')';

            var timer = setInterval(checkGoogleLoaded, 100);

            function checkGoogleLoaded() {
                if (app.googleAPILoaded) {
                    clearTimeout(timer);
                    gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                    gapi.client.load('youtube', 'v3', searchOnYoutube)
                }
            }

            function searchOnYoutube() {
                var episodeTitle = episode.collectionName + ' ' + episode.trackName;
                var request = app.getYoutubeRequestFromTitle(episodeTitle);
                request.execute(function(response) {
                    var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                    document.getElementById('tvShowEpisodeModalBody').innerHTML += "<br><br><iframe class='preview' width='560' height='315' src='"+ videoURL +"' frameborder='0' allowfullscreen></iframe>";
                });
            }

        },

        closePreview: function() {
            $('#tvShowEpisodeModalBody').empty();
        },

        searchEpisodes: function() {
            var q = $('#search-episodes-input').val().toLowerCase();

            if (q.length > 0) {
                var newCollection = new app.Episodes();
                newCollection.models = this.episodes.getEpisodeCollection().models.slice();
                for (var i = newCollection.models.length - 1; i >= 0 ; --i) {
                    if (newCollection.models[i].attributes.trackName.toLowerCase().indexOf(q) == -1 && newCollection.models[i].attributes.longDescription.toLowerCase().indexOf(q) == -1) {
                        newCollection.models.splice(i, 1);
                    }
                }

                this.episodes.render(this.id, newCollection);
            } else {
                this.episodes.render(this.id);
            }
        },

        checkClearSearch: function() {
            var q = $('#search-episodes-input').val();

            if (q.length == 0) {
                this.episodes.render(this.id);
            }
        }

    });


})(jQuery);