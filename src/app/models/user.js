
var app = app || {};

(function() {

    app.User = Backbone.Model.extend({
        urlRoot: "/users"
    });

})();