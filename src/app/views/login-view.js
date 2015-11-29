var app = app || {};

(function ($) {

    app.LoginView = Backbone.View.extend({

        el: '#main-container',

        template: _.template($("#login-template").html()),

        events: {
            "click #btn-login-confirm": "login",
            "click #subscribe-link": "goToSubscription"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        },

        login: function() {
            var userEmail = $("#input-email").val();
            var userPassword = $("#input-password").val();

            var userModel = new app.User({name: userEmail, email: userEmail, password: userPassword});

            userModel.login(function(data) {
                userModel.name = data.name;
                userModel.id = data.id;
                app.currentUser = userModel;
                app.Router.navigate("", {trigger: true});
            })
        },

        goToSubscription: function() {
            app.Router.navigate("subscribe", {trigger: true});
        }
    });

})(jQuery);
