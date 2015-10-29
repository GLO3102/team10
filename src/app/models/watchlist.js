var app = app || {};

(function() {

    app.Watchlist = Backbone.Model.extend({
        urlRoot: "/watchlists"
    });

})();