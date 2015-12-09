var app = app || {};

(function ($) {

    app.UserView = Backbone.View.extend({

        template: _.template($('#user-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        events: {
            "click .watchlist-button": "openWatchlist",
            "click .user-button": "openUserPage"
        },

        render: function (id) {
            var that = this;

            that.model = new app.User({id: id});
            that.watchlists = new app.Watchlists();

            this.model.fetch().success(function() {
                var hashedEmail = CryptoJS.MD5(that.model.attributes.email);
                that.model.attributes.gravatar = "http://www.gravatar.com/avatar/" + hashedEmail + "?d=identicon";

                that.$el.html(that.template({user: that.model.toJSON(), watchlists: {}}));

                that.watchlists.fetch().complete(function() {
                    var userWatchlists = [];

                    that.watchlists.toJSON().forEach(function(watchlist) {
                        if (watchlist.owner) {
                            if (watchlist.owner.id === that.model.id) {
                                userWatchlists.push(watchlist);
                            }
                        }
                    });

                    that.$el.html(that.template({user: that.model.toJSON(), watchlists: userWatchlists}));
                });
            });
        },

        openWatchlist: function(e) {
            var watchlistView = new app.UserWatchlistView();

            var watchlistId = e.currentTarget.id;

            watchlistView.render(watchlistId);
        },

        openUserPage: function(e) {
            var userEmail = e.currentTarget.id;

            $.ajax({
                url: "https://umovie.herokuapp.com/users",
                type: 'GET',
                contentType: "application/json"
            }).done(function(data) {
                data.forEach(function(user) {
                    if (user.email === userEmail) {
                        app.Router.navigate("user/" + user.id, {trigger: true});
                    }
                })

            }).fail(function(jqXHR, status) {
                console.log(status);
            });
        }
    });

})(jQuery);
