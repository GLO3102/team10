
var app = app || {};

(function() {

    app.Movie = Backbone.Model.extend({
        urlRoot: "/movies",

        parse: function(response)
        {
            return response.results[0];
        }
    });

})();