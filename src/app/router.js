var app = app || {};

(function() {

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",

            "movies": "movies",
            "movies/:id": "movies_with_id",

            "actors": "actors",
            "actors/:id": "actors_with_id",

            "tvshows": "tvshows",
            "tvshows/:id": "tvshows_with_id",

            "watchlists": "watchlists"
        }
    });

    app.Router = new Router();

    app.Router.on("route:home", function() {
        app.setActiveMenuButtonWithId("navbar-home");
        app.homeView.render();
    });

    app.Router.on("route:movies", function() {
        app.setActiveMenuButtonWithId("navbar-movies");
        app.browseMoviesView.render();
    });

    app.Router.on("route:movies_with_id", function(id) {
        app.setActiveMenuButtonWithId("navbar-movies");
        app.moviesView.render(id);
    });

    app.Router.on("route:actors", function() {
        app.setActiveMenuButtonWithId("navbar-actors");
        app.actorsView.render("211294246"); // todo : changer pour browseActorsView.render
    });

    app.Router.on("route:actors_with_id", function(id) {
        app.setActiveMenuButtonWithId("navbar-actors");
        app.actorsView.render(id);
    });

    app.Router.on("route:tvshows", function() {
        app.setActiveMenuButtonWithId("navbar-tvshows");
        app.tvShowsView.render("599183923"); // todo : changer pour browseActorsView.render
    });

    app.Router.on("route:tvshows_with_id", function(id) {
        app.setActiveMenuButtonWithId("navbar-tvshows");
        app.tvShowsView.render(id);
    });

    app.Router.on("route:watchlists", function() {
        app.setActiveMenuButtonWithId("navbar-watchlists");
        app.watchlistsView.render();
    });

    Backbone.history.start();
})();
