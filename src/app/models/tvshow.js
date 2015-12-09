var app = app || {};

(function() {

    app.TvShow = Backbone.Model.extend({
        urlRoot:  "https://umovie.herokuapp.com/tvshows/season",
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