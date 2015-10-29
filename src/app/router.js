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
            "tvshows/id": "tvshows_with_id",

            "watchlists": "watchlists"
        }
    });

    app.Router = new Router();

    app.Router.on("route:home", function() {
        app.homeView.render();
    });

    app.Router.on("route:movies", function() {
        app.moviesView.render("960891136");
    });

    app.Router.on("route:movies_with_id", function(id) {
        app.moviesView.render(id);
    });

    app.Router.on("route:actors", function() {
        app.actorsView.render("211294246");
    });

    app.Router.on("route:actors_with_id", function(id) {
        app.actorsView.render(id);
    });

    app.Router.on("route:tvshows", function() {
        app.tvShowsView.render("599183923");
    });

    app.Router.on("route:tvshows_with_id", function(id) {
        app.tvShowsView.render(id);
    });

    app.Router.on("route:watchlists", function() {
        app.watchlistsView.render();
    });

    Backbone.history.start();
})();
