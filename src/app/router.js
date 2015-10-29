var app = app || {};

(function() {

    var Router = Backbone.Router.extend({
        routes: {
            "": "home",

            "movies": "movies",
            "movies/960891136": "movies",

            "actors": "actors",
            "actors/:id": "actors_with_id",

            "tvshows": "tvshows",
            "tvshows/599183923": "tvshows",

            "watchlists": "watchlists"
        }
    });

    app.Router = new Router();

    app.Router.on("route:home", function() {
        app.homeView.render();
    });

    app.Router.on("route:movies", function() {
        app.moviesView.render();
    });

    app.Router.on("route:actors", function() {
        app.actorsView.render("211294246");
    });

    app.Router.on("route:actors_with_id", function(id) {
        app.actorsView.render(id);
    });

    app.Router.on("route:tvshows", function() {
        app.tvShowsView.render();
    });

    app.Router.on("route:watchlists", function() {
        app.watchlistsView.render();
    });

    Backbone.history.start();
})();
