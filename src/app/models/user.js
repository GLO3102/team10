
var app = app || {};

(function() {

    app.User = Backbone.Model.extend({
        methodToURL: {
            'create': '/signup',
            'read': '/users/'
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()];
            if (method === 'read') {
                options.url += this.id;
            }

            return Backbone.sync.apply(this, arguments);
        },

        login: function(callback) {
            var userEmail = this.attributes['email'];
            var userPassword = this.attributes['password'];

            $.ajax({
                url: "/login",
                type: 'POST',
                contentType: "application/x-www-form-urlencoded",
                data: {email: userEmail, password: userPassword}
            }).done(function(data) {
                $.cookie("session", data.token);
                callback(data);
                app.Router.navigate("", {trigger: true});
            }).fail(function(jqXHR, error) {
                callback(jqXHR, error);
            })
        },

        logout: function(callback) {
            var that = this;
            $.ajax({
                url : '/logout',
                type : 'GET'
            }).done(function(response) {
                $.removeCookie('session');
                that.clear();
                that.initialize();
                callback();
            }).fail(function(jqXHR, status) {
                console.log("error while logging out", status);
            });
        }
    });

})();