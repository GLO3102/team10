
var app = app || {};

(function() {

    var Users = Backbone.Collection.extend({
        url: "/users",
        model: app.User
    });

    app.users = new Users();
})();