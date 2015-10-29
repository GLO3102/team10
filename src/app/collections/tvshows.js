var app = app || {};

(function() {

    var TvShows = Backbone.Collection.extend({
        url: "/tvshows",
        model: app.TvShow
    });

    app.tvshows = new TvShows();
})();