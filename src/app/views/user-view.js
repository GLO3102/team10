var app = app || {};

(function ($) {

    app.UserView = Backbone.View.extend({

        isUserFollowed: false,

        template: _.template($('#user-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        events: {
            "click .watchlist-button": "openWatchlist",
            "click .user-button": "openUserPage",
            "click #follow-user": "followUser"
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

                    if (that.model.attributes.id === app.currentUser.attributes.id) {
                        $("#follow-user").addClass("hide");
                    } else {
                        var userEmail = that.model.attributes.email;
                        var currentUserFollowing = app.currentUser.attributes.following;

                        that.isUserFollowed = false;

                        currentUserFollowing.forEach(function(followedUser) {
                            if (followedUser.email === userEmail) {
                                that.isUserFollowed = true;
                                that.model._id = followedUser._id;
                            }
                        });

                        if (that.isUserFollowed) {
                            $("#follow-user").addClass("followed");
                            $("#follow-user").text("Unfollow");
                        } else {
                            $("#follow-user").addClass("not-followed");
                        }
                    }
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
                url: "/users",
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
        },

        followUser: function(e) {
            var that = this;

            if (that.isUserFollowed) {
                $.ajax({
                    url: "/follow/" + that.model._id,
                    type: 'DELETE'
                }).done(function(data) {
                    $("#follow-user").removeClass("followed");
                    $("#follow-user").addClass("not-followed");
                    $("#follow-user").text("Follow");
                    $("#follow-user").css('background-color', "#1abc9c");
                    that.isUserFollowed = false;

                    app.currentUser.attributes.following = data.following;

                }).fail(function(jqXHR, status) {
                    console.log(status);
                });

            } else {
                var userId = that.model.attributes.id;
                var userEmail = that.model.attributes.email;

                $.ajax({
                    url: "/follow",
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({id: userId})

                }).done(function(data) {
                    $("#follow-user").removeClass("not-followed");
                    $("#follow-user").addClass("followed");
                    $("#follow-user").text("Unfollow");
                    $("#follow-user").css('background-color', "orangered");
                    that.isUserFollowed = true;

                    app.currentUser.attributes.following = data.following;

                    data.following.forEach(function(user) {
                        if (user.email === userEmail) {
                            that.model._id = user._id;
                        }
                    })

                }).fail(function(jqXHR, status) {
                    console.log(status);
                });
            }
        }
    });

})(jQuery);
