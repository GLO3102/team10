var app = app || {};

(function ($) {

    app.LoginView = Backbone.View.extend({

        el: '#main-container',

        template: _.template($("#login-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToHome: function() {
            app.Router.navigate("", {trigger: true});
        },

        goToMovies: function() {
            app.Router.navigate("movies", {trigger: true});
        },

        goToTvShows: function() {
            app.Router.navigate("tvshows", {trigger: true});
        },

        goToActors: function() {
            app.Router.navigate("actors", {trigger: true});
        },

        goToWatchlists: function() {
            app.Router.navigate("watchlists", {trigger: true});
        }
    });

})(jQuery);
