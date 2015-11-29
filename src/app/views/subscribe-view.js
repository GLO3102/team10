var app = app || {};

(function ($) {

    app.SubscribeView = Backbone.View.extend({

        el: '#main-container',

        template: _.template($("#subscribe-template").html()),

        events: {
            "click #btn-subscribe-confirm": "subscribeUser",
            "click #link-login": "goToLogin"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        },

        subscribeUser: function() {
            var userName = $("#input-name").val();
            var userEmail = $("#input-email").val();
            var userPassword = $("#input-password").val();

            var userModel = new app.User({name: userName, email: userEmail, password: userPassword});

            userModel.save({contentType: "application/x-www-form-urlencoded"}, {
                success: function(model) {
                    console.log(model);
                    setTimeout(function() {
                        model.login(function() {
                            app.Router.navigate("", {trigger: true});
                        });
                    }, 400);
                },

                error: function(model, response) {
                    console.log("could not subscribe", response);
                }
            });
        },

        goToLogin: function() {
            app.Router.navigate("login", {trigger: true});
        }
    });

})(jQuery);
