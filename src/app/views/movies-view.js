var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var that = this;

            that.model = new app.Movie({id: id});

            this.model.fetch().success(function() {
                var date = new moment(that.model.attributes.releaseDate);

                that.model.attributes.releaseDate = date.format("MMM Do YYYY");
                that.model.attributes.artworkUrl100 = that.model.attributes.artworkUrl100.replace("100x100", "800x800");

                that.$el.html(that.template(that.model.toJSON()));

                var timer = setInterval(checkGoogleLoaded, 300);

                function checkGoogleLoaded() {
                    if (app.googleAPILoaded) {
                        clearTimeout(timer);
                        gapi.client.setApiKey('AIzaSyB9-JmSKNRx3j6Rtenbxoc0aqw3-I0z8Tk');
                        gapi.client.load('youtube', 'v3', searchOnYoutube)
                    }
                }

                var searchOnYoutube = function() {
                    var request = app.getYoutubeRequestFromMovieTitle(that.model.attributes.trackName);
                    request.execute(function(response) {
                        var videoURL = "http://youtube.com/embed/" + response.items[0].id.videoId;
                        $('#preview-container').html("<iframe class='preview' width='560' height='315' src='"+ videoURL +"' frameborder='0' allowfullscreen></iframe>");
                    });
                };
            });
        }
    });

})(jQuery);
