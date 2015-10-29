var app = app || {};

(function() {

    var Router = Backbone.Router.extend({
        routes: {
            "": "index",

            "movies": "movies",
            "movies/960891136": "movies",

            "/actors": "actors",
            "/actors/211294246": "actors",

            "/tvshows": "tvshows",
            "/tvshows/599183923": "tvshows",

            "/watchlists": "watchlists"
        }
    });

    app.Router = new Router();

    app.Router.on("route:movies", function() {
        app.moviesView.render();
    });

    app.Router.on("route:actors", function() {
        app.actorsView.render();
    });

    app.Router.on("route:tvshows", function() {
        app.tvShowsView.render();
    });

    app.Router.on("route:watchlists", function() {
        app.watchlistsView.render();
    });

    Backbone.history.start();
})();
