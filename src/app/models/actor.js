var app = app || {};

(function() {

    app.Actor = Backbone.Model.extend({
        urlRoot: "/actors",

        parse: function(response)
        {
            return response.results[0];
        }
    });

})();