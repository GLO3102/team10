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
            "click #navbar-actors": "goToActors",

            "click #profile": "goToProfile",
            "click #logout": "logoutUser"
        },

        render: function (currentUser) {
            var that = this;

            if (currentUser) {
                that.$el.html(that.template({user: currentUser.attributes}));
            } else {
                that.$el.html(that.template({user: ""}));
            }
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
        },

        logoutUser: function() {
            app.currentUser.logout(function() {
                app.headerView.render();
                app.Router.navigate("login", {trigger: true});
            });
        },

        goToProfile: function() {

        }
    });

})(jQuery);