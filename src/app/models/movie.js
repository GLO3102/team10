
var app = app || {};

(function() {

    app.Movie = Backbone.Model.extend({
        urlRoot: "/movies",

        parse: function(response, options)
        {
            if(options.parseModel === false) {
                return response;
            } else {
                return response.results[0];
            }
        }
    });

})();