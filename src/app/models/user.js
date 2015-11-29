
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

        login: function() {
            var userEmail = this.attributes['name'];
            var userPassword = this.attributes['password'];

            $.ajax({
                url: "/login",
                type: 'POST',
                contentType: "application/x-www-form-urlencoded",
                data: {email: userEmail, password: userPassword}
            }).done(function(data) {
                console.log("il est connecté");
                $.cookie("session", data['token']);

            }).fail(function(jqXHR, status) {
                console.log("il n'est pas connecté");
            })
        },

        logout: function() {
            var that = this;
            $.ajax({
                url : this.url + '/logout',
                type : 'GET'
            }).done(function(response){
                $.removeCookie('session', { path: '/' });
                that.clear();
                that.initialize();

                app.Router.navigate("", {trigger: true});
            });
        }
    });

})();