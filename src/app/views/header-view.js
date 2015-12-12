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
            "click #navbar-search": "goToSearch",

            "click #profile": "goToProfile",
            "click #logout": "logoutUser",
            "click #global-search": "search"
        },

        render: function (currentUser) {
            var that = this;

            if (currentUser) {
                app.currentUser.attributes.gravatar = app.getGravatarFromEmail(app.currentUser.attributes.email);
                that.$el.html(that.template({user: currentUser.attributes}));
            } else {
                that.$el.html(that.template({user: ""}));
            }

            var $searchText = $('#global-search-text');
            $searchText.autocomplete({
                serviceUrl: '/search',
                paramName: "q",
                params: {limit: 5},
                transformResult: function(response) {
                    response = JSON.parse(response);
                    return {
                        suggestions: response.results.map(function(element) {
                            return !!element.trackName ? element.trackName :
                                !!element.collectionName ? element.collectionName :
                                    !!element.artistName ? element.artistName :
                                        !!element.name ? element.name : "Unknown";
                        })
                    };
                }
            });
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
            app.Router.navigate("user/" + app.currentUser.attributes.id,  {trigger: true});

        },

        goToSearch: function() {
            app.Router.navigate("search", {trigger: true});
        },

        search: function() {
            var searchText = this.$('#global-search-text').val();
            app.Router.navigate("search",  {trigger: true});
            app.searchView.searchGlobal(searchText);
        }
    });

})(jQuery);