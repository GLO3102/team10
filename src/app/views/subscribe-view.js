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
                return false;
            });
        },

        render: function () {
            this.$el.html(this.template());
        },

        subscribeUser: function() {
            var htmlForm = $('#subscribe-form');

            if(htmlForm.length > 0) {
                var form = htmlForm.parsley();

                if(form.isValid()) {
                    $("#btn-subscribe-confirm").prop('disabled', true);
                    var userName = $("#input-name").val();
                    var userEmail = $("#input-email").val();
                    var userPassword = $("#input-password").val();

                    var userModel = new app.User({name: userName, email: userEmail, password: userPassword});

                    userModel.save({contentType: "application/x-www-form-urlencoded"}, {
                        success: function (model) {
                            setTimeout(function () {
                                $("#btn-subscribe-confirm").prop('disabled', true);
                                model.login(function () {
                                    app.currentUser = userModel;
                                    app.Router.navigate("", {trigger: true});
                                    app.headerView.render(model);
                                });
                            }, 500);
                        },

                        error: function (model, response) {
                            $("#btn-subscribe-confirm").prop('disabled', true);
                            console.log("could not subscribe", response);
                        }
                    });
                }
            }
        },

        goToLogin: function() {
            app.Router.navigate("login", {trigger: true});
        }
    });

})(jQuery);
