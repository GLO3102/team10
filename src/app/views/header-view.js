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
            "click #navbar-watchlists": "goToWatchlists",
            "click #navbar-actors": "goToActors"
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