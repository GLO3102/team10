var app = app || {};

(function() {

    app.Actor = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/actors",

        parse: function(response, options)
        {
            if(options.parseModel === false || !response.results) {
                return response;
            } else {
                return response.results[0];
            }
        }
    });

})();