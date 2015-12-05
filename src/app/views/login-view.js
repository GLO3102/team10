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
            $("#login-form").submit(function(e){
                return false;
            });
        },

        render: function () {
            this.$el.html(this.template());
        },

        login: function() {
            var htmlForm = $('#login-form');

            if(htmlForm.length > 0) {
                var form = htmlForm.parsley();

                if(form.isValid()) {
                    var userEmail = $("#input-email").val();
                    var userPassword = $("#input-password").val();

                    var userModel = new app.User({name: userEmail, email: userEmail, password: userPassword});

                    userModel.login(function(data, error) {
                        if(!error) {
                            userModel.name = data.name;
                            userModel.id = data.id;
                            app.currentUser = userModel;
                            app.headerView.render(userModel);
                            app.Router.navigate("", {trigger: true});
                        } else {
                            if(data.status === 401) {
                                $('#error-message').text("Bad credentials").fadeOut(4000, function() {
                                    $('#error-message').text('').show();
                                });
                            }
                        }
                    })
                }
            }
        },

        goToSubscription: function() {
            app.Router.navigate("subscribe", {trigger: true});
        }
    });

})(jQuery);
