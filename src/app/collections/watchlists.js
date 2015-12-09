var app = app || {};

(function() {

    app.Watchlists = Backbone.Collection.extend({
        model: app.Watchlist,
        url: "https://umovie.herokuapp.com/watchlists"
    });

})();