var app = app || {};

(function ($) {

    app.HeaderView = Backbone.View.extend({

        el: '#header',

        template: _.template($("#header-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        events: {
            "click #navbar-movies": "goToMovies",
            "click #navbar-tvshows": "goToTvShows"
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToMovies: function() {
            app.Router.navigate("movies", true);
        },

        goToTvShows: function() {
            app.Router.navigate("tvshows", true);
        }
    });

})(jQuery);