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

                    console.log(userWatchlists);

                    that.$el.html(that.template({user: that.model.toJSON(), watchlists: userWatchlists}));
                });
            });
        },

        openWatchlist: function(e) {
            var that = this;

            var watchlistId = e.currentTarget.id;
            that.watchlist = new app.Watchlist({id: watchlistId});

            that.watchlist.fetch().complete(function() {
                $("#watchlist-title").text(that.watchlist.attributes.name);

                if (that.watchlist.attributes.movies.length === 0) {
                    $("#watchlist-movies").text("There are no movies in this watchlist");
                } else {
                    $("#watchlist-movies").text("Movies");

                    /*var html = "<table class='table table-striped movies-table'><thead><tr><th>Name</th><th>Information</th></tr></thead><tbody><tr><td>Bingo</td><td>Allo</td></tr></tbody></table>";

                    console.log(html);

                    document.getElementById('watchlist-modal-body').innerHTML += html;*/
                }
            });
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
        }
    });

})(jQuery);
