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
            $("#subscribe-form").submit(function(e){
                e.preventDefault();
            });
        },

        render: function () {
            this.$el.html(this.template());
        },

        subscribeUser: function() {
            $('#subscribe-form').parsley().on('form:validated', function() {
                var userName = $("#input-name").val();
                var userEmail = $("#input-email").val();
                var userPassword = $("#input-password").val();

                var userModel = new app.User({name: userName, email: userEmail, password: userPassword});

                userModel.save({contentType: "application/x-www-form-urlencoded"}, {
                    success: function(model) {
                        setTimeout(function() {
                            model.login(function() {
                                app.currentUser = userModel;
                                app.Router.navigate("", {trigger: true});
                                app.headerView.render(model);
                            });
                        }, 500);
                    },

                    error: function(model, response) {
                        console.log("could not subscribe", response);
                    }
                });
            });
        },

        goToLogin: function() {
            app.Router.navigate("login", {trigger: true});
        }
    });

})(jQuery);
