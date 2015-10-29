var app = app || {};

(function() {

    app.Movies = Backbone.Collection.extend({
        model: app.Movie,

        parse: function(response)
        {
            return response.results;
        }
    });

})();