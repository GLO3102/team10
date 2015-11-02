var app = app || {};

(function() {

    app.Episodes = Backbone.Collection.extend({
        url: "/episodes",
        model: app.Episode,
        parse: function(response)
        {
            return response.results;
        }
    });

    app.episodes = new app.Episodes();
})();