var app = app || {};

(function ($) {

    app.UserWatchlistView = Backbone.View.extend({

        el: '#watchlist-modal',

        template: _.template($('#user-watchlist-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (watchlistId) {
            var that = this;

            var watchlist = new app.Watchlist({id: watchlistId});

            watchlist.fetch().complete(function() {
                that.$el.html(that.template({watchlist: watchlist.toJSON()}));
            });
        }
    });

})(jQuery);