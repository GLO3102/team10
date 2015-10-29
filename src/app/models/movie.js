
var app = app || {};

(function() {

    app.Movie = Backbone.Model.extend({
        urlRoot: "/movies",

        parse: function(response, options)
        {
            if(!options.parseModel) return response;
            return response.results[0];
        }
    });

})();