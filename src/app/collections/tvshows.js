var app = app || {};

(function() {

    app.TvShows = Backbone.Collection.extend({
        model: app.TvShow,

        parse: function(response)
        {
            return response.results;
        }
    });

})();
