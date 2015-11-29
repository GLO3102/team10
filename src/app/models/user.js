
var app = app || {};

(function() {

    app.User = Backbone.Model.extend({
        methodToURL: {
            'create': '/signup'
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()];

            return Backbone.sync.apply(this, arguments);
        },

        login: function(callback) {
            var userEmail = this.attributes['name'];
            var userPassword = this.attributes['password'];

            $.ajax({
                url: "/login",
                type: 'POST',
                contentType: "application/x-www-form-urlencoded",
                data: {email: userEmail, password: userPassword}
            }).done(function(data) {
                console.log("il est connecté");
                $.cookie("session", data.token);
                callback(data);

            }).fail(function(jqXHR, status) {
                console.log("il n'est pas connecté");
            })
        },

        logout: function() {
            var that = this;
            $.ajax({
                url : '/logout',
                type : 'GET'
            }).done(function(response) {
                console.log("logout successful");
                $.removeCookie('session');
                that.clear();
                that.initialize();
            }).fail(function(jqXHR, status) {
                console.log("error while logging out", status);
            });
        }
    });

})();