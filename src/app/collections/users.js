
var app = app || {};

(function() {

    app.Users = Backbone.Collection.extend({
        url: "/users",
        model: app.User
    });

    app.users = new app.Users();

})();