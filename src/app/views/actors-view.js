var app = app || {};

(function ($) {

    app.ActorsView = Backbone.View.extend({

        template: _.template($("#actors-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
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
                console.log(self.model.attributes);

                self.setImageURL(self.model);

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
            var timer = setInterval(checkGoogleLoaded, 100);

            function checkGoogleLoaded() {
                if (app.googleAPILoaded) {
                    clearTimeout(timer);
                    gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                    gapi.client.load('youtube', 'v3', searchOnYoutube)
                }
            }

            function searchOnYoutube() {
                var movieTitle = $(event.currentTarget).data('trackname');
                var request = app.getYoutubeRequestFromMovieTitle(movieTitle);
                request.execute(function(response) {
                    var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                    $('#preview-modal-container').html("<iframe class='preview' width='560' height='315' src='"+ videoURL +"' frameborder='0' allowfullscreen></iframe>");
                });
            }
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
        },

        setImageURL: function(model) {
            app.getGoogleImageURLFromActorName(model);
        }
    });

})(jQuery);