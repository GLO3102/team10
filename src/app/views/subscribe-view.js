var app = app || {};

(function ($) {

    app.SubscribeView = Backbone.View.extend({

        el: '#main-container',

        template: _.template($("#subscribe-template").html()),

        events: {
            "click #btn-subscribe-confirm": "subscribeUser"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        },

        subscribeUser: function()
        {
            var userName = $("#input-name").val();
            var userEmail = $("#input-email").val();
            var userPassword = $("#input-password").val();

            var userModel = new app.User({name: userName, email: userEmail, password: userPassword});

            userModel.save({contentType: "application/x-www-form-urlencoded"}, {
                success: function(model, response) {
                    setTimeout(function() {
                        $.ajax({
                            url: "/login",
                            type: 'POST',
                            contentType: "application/x-www-form-urlencoded",
                            data: {email: userEmail, password: userPassword}
                        }).done(function(data) {
                            console.log("il est connecté");
                            $.cookie("session", data['token']);
                            app.Router.navigate("", {trigger: true});

                        }).fail(function(jqXHR, status) {
                            console.log("il n'est pas connecté");
                        })
                    }, 1000);
                    
                    //userModel.login();
                    //app.Router.navigate("", {trigger: true});
                },

                error: function(model, response) {
                    console.log("no");
                }
            });
        }
    });

})(jQuery);
