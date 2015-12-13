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

    var MovieModalView = Backbone.View.extend({
        template: _.template($('#actor-movie-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.preview = new PreviewView();
        },

        render: function (movieTitle) {
            $('#actor-movie-modal').html(this.template());

            $('#actor-movie-modal').on('hidden.bs.modal', function () {
                $('#actor-movie-modal').empty();
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
                var request = app.getYoutubeRequestFromTitle(movieTitle);
                request.execute(function(response) {
                    var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                    self.preview.render($('#modal-actor-movie-preview'), videoURL);
                });
            };
        }
    });

    app.ActorsView = Backbone.View.extend({

        template: _.template($("#actors-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');

            this.movieModal = new MovieModalView();
        },

        events: {
            "click #previewButton": "showPreview",
            "click .closePreview": "closePreview"
        },

        render: function (id) {
            var self = this;
            self.$el.html(self.template({actor: {}, movies: {}}));

            self.model = new app.Actor({id: id});

            self.model.fetch().success(function() {
                self.$el.html(self.template({actor: self.model.toJSON(), movies: {}}));

                self.movieCollection = new app.Movies();
                self.movieCollection.url = "/actors/" + self.model.id + "/movies";

                self.movieCollection.fetch({parseModel: false}).complete(function() {
                    self.movieCollection = self.formatMoviesDate(self.movieCollection);

                    self.$el.html(self.template({actor: self.model.toJSON(), movies: self.movieCollection.toJSON()}));
                });
            });
        },

        showPreview: function(event) {
            this.movieModal.render($(event.currentTarget).data('trackname'));
        },

        closePreview: function() {
            $('#preview-modal-container').empty();
        },

        formatMoviesDate: function(movieCollection) {
            for(var i = 0; i < movieCollection.length; i++) {
                var date = new moment(movieCollection.models[i].attributes.releaseDate);

                movieCollection.models[i].attributes.releaseDate = date.format("MMM Do YYYY");
            }
            return movieCollection
        }
    });

})(jQuery);