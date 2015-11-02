var app = app || {};

(function() {

    app.Episodes = Backbone.Collection.extend({
        model: app.Episode,
        
        parse: function(response)
        {
            return response.results;
        }
    });
})();