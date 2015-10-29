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
            "click #navbar-home": "goToHome",
            "click .navbar-brand": "goToHome",
            "click #navbar-movies": "goToMovies",
            "click #navbar-tvshows": "goToTvShows",
            "click #navbar-actors": "goToActors"
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToMovies: function() {
            app.Router.navigate("movies", {trigger: true});
        },

        goToTvShows: function() {
            app.Router.navigate("tvshows", {trigger: true});
        },

        goToHome: function() {
            app.Router.navigate("", {trigger: true});
        },

        goToActors: function() {
            app.Router.navigate("actors", {trigger: true});
        }
    });

})(jQuery);