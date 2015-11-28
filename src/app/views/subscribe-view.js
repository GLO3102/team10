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

            userModel.save({url: "/signup", contentType: "application/x-www-form-urlencoded"}, {
                success: function(model, response) {
                    console.log(response);
                    console.log("yes")
                },

                error: function(model, response) {
                    console.log("no");
                }
            });
        }
    });

})(jQuery);