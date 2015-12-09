var app = app || {};

(function ($) {

    app.WatchlistMovieView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template($('#watchlist-movie-template').html()),

        events: {
            "click .btn-remove-movie": "remove"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template({movie: {}}));
            var self = this;

            self.model.fetch().complete(function() {
                self.$el.html(self.template({movie: self.model.toJSON()}));
            });

            return this;
        },

        remove: function()
        {
            var self = this;
            self.model.destroy({url: "/watchlists/" + this.watchlistId + "/movies/" + this.model.id}).complete(function()
            {
                self.trigger('movieRemoved');
            });
        }
    });

})(jQuery);