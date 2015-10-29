var app = app || {};

(function() {

    var Router = Backbone.Router.extend({
        routes: {
            "": "index",

            "/movies": "movies",
            "/movies/960891136": "movies",

            "/actors": "actors",
            "/actors/211294246": "actors",

            "/tvshows": "tvshows",
            "/tvshows/599183923": "tvshows",

            "/watchlists": "watchlists"
        }
    });

    app.Router = new Router();

    app.Router.on("route:movies", function() {
        console.log("RENDERING MOVIES");
        app.MoviesView.render();
    });

    app.Router.on("route:actors", function() {
        app.ActorsView.render();
    });

    app.Router.on("route:tvshows", function() {
        app.TvShowsView.render();
    });

    app.Router.on("route:watchlists", function() {
        app.WatchlistsView.render();
    });

    Backbone.history.start();
})();
