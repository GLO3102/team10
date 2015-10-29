
var app = app || {};

(function() {

    app.Movie = Backbone.Model.extend({
        urlRoot: "/movies"
    });

    app.movie = new app.Movie();
})();