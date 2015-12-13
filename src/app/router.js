var app = app || {};

(function () {

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",
            "login": "login",
            "subscribe": "subscribe",

            "movies": "movies",
            "movies/:id": "movies_with_id",

            "actors": "actors",
            "actors/:id": "actors_with_id",

            "tvshows": "tvshows",
            "tvshows/:id": "tvshows_with_id",

            "watchlists": "watchlists",
            "search": "search",
            "user/:id": "user_with_id"
        }
    });

    app.Router = new Router();

    app.Router.on("route:home", function () {
        app.setActiveMenuButtonWithId("navbar-home");
        app.homeView.render();
    });

    app.Router.on("route:login", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.Router.navigate("", {trigger: true}); // cant login twice
            } else {
                app.loginView.render();
                app.setActiveMenuButtonWithId("navbar-login");
            }
        })
    });

    app.Router.on("route:subscribe", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.Router.navigate("", {trigger: true}); // cant subscribe twice
            } else {
                app.setActiveMenuButtonWithId("navbar-login");
                app.subscribeView.render();
            }
        })
    });

    app.Router.on("route:movies", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-movies");
                app.browseMoviesView.render();
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        });
    });

    app.Router.on("route:movies_with_id", function (id) {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-movies");
                app.moviesView.render(id);
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        });
    });

    app.Router.on("route:actors", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-actors");
                app.browseActorsView.render();
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        })
    });

    app.Router.on("route:actors_with_id", function (id) {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-actors");
                app.actorsView.render(id);
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        });
    });

    app.Router.on("route:tvshows", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-tvshows");
                app.browseTvShowsView.render();
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        });
    });

    app.Router.on("route:tvshows_with_id", function (id) {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-tvshows");
                app.tvShowsView.render(id);
            } else {
                app.Router.navigate("login", {trigger: true});
            }

        })
    });

    app.Router.on("route:watchlists", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-watchlists");
                app.watchlistsView.render();
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        })
    });

    app.Router.on("route:search", function () {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId("navbar-search");
                app.searchView.render();
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        })
    });

    app.Router.on("route:user_with_id", function (id) {
        app.checkAuthentication(function (isAuthenticated) {
            if (isAuthenticated) {
                app.setActiveMenuButtonWithId();
                app.userView.render(id);
            } else {
                app.Router.navigate("login", {trigger: true});
            }
        })
    });

    Backbone.history.start();
})();
