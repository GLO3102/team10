var app = app || {};

(function() {

    app.TvShow = Backbone.Model.extend({
        urlRoot: "/tvshows/season",
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