var app = app || {};

(function() {

    app.Actors = Backbone.Collection.extend({
        model: app.Actor,

        parse: function(response)
        {
            return response.results;
        }
    });

})();
