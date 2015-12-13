var app = app || {};

(function ($) {

    var EpisodesView = Backbone.View.extend({
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

    var PreviewView = Backbone.View.extend({
        template: _.template($('#preview-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (el, url) {
            el.html(this.template({ url: url }));
        }
    });

    var EpisodeModalView = Backbone.View.extend({
        template: _.template($('#tvshow-episode-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.preview = new PreviewView();
        },

        render: function (episode) {
            $('#episode-modal').html(this.template({episode: episode}));
            $('#tvshow-episode-modal-content').css('backgroundImage', 'url(' + episode.artworkUrl100 + ')');

            $('#episode-modal').on('hidden.bs.modal', function () {
                $('#episode-modal').empty();
            });

            var timer = setInterval(checkGoogleLoaded, 300);

            function checkGoogleLoaded() {
                if (app.googleAPILoaded) {
                    clearTimeout(timer);
                    gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                    gapi.client.load('youtube', 'v3', searchOnYoutube)
                }
            }

            var self = this;

            var searchOnYoutube = function() {
                var request = app.getYoutubeRequestFromTitle(episode.collectionName);
                request.execute(function(response) {
                    var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                    self.preview.render($('#modal-tvshow-episode-preview'), videoURL);
                });
            };
        }
    });

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.episodes = new EpisodesView();
            this.episodeModal = new EpisodeModalView();
            this.preview = new PreviewView();
        },

        events: {
            "click .previewButton": "showPreview",
            "keyup #search-episodes-input": "searchEpisodes"
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

                var timer = setInterval(checkGoogleLoaded, 100);

                function checkGoogleLoaded() {
                    if (app.googleAPILoaded) {
                        clearTimeout(timer);
                        gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                        gapi.client.load('youtube', 'v3', searchOnYoutube)
                    }
                }

                function searchOnYoutube() {
                    var episodeTitle = self.model.attributes.collectionName;
                    var request = app.getYoutubeRequestFromTitle(episodeTitle);

                    request.execute(function(response) {
                        var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                        self.preview.render($('#tvshow-preview-container'), videoURL);
                    });
                }
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

            episode.artworkUrl100 = episode.artworkUrl100.replace("100x100", "1000x1000");
            episode.trackTimeMin = Math.round(episode.trackTimeMillis / 60000) + ' min';

            this.episodeModal.render(episode);
        },

        searchEpisodes: function() {
            var q = $('#search-episodes-input').val().toLowerCase();

            if (q.length > 0) {
                var newCollection = new app.Episodes();
                newCollection.models = this.episodes.getEpisodeCollection().models.slice();
                for (var i = newCollection.models.length - 1; i >= 0 ; --i) {
                    if (newCollection.models[i].attributes.trackName.toLowerCase().indexOf(q) == -1) {
                        newCollection.models.splice(i, 1);
                    }
                }

                this.episodes.render(this.id, newCollection);
            } else {
                this.episodes.render(this.id);
            }
        }
    });


})(jQuery);