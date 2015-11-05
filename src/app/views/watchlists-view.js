var app = app || {};

(function ($) {

    app.WatchlistsView = Backbone.View.extend({

        template: _.template($('#watchlists-template').html()),

        events: {
            "click #watchlist-create-button": "createWatchlist"
        },

        initialize: function () {
            _.bindAll(this, 'render');
            this.watchlists = new app.Watchlists();
        },

        render: function () {
            this.$el.html(this.template());
            var $watchlistList = this.$('#watchlist-list');
            var self = this;

            self.watchlists.fetch().complete(function() {

                var currentRow = $('<div>').addClass('row');

                _.each(self.watchlists.models, function(watchlist, index) {

                    var watchlistView = new app.WatchlistView({model: watchlist});
                    watchlistView.on('watchlistRemoved', self.render, self);
                    currentRow.append(watchlistView.render().el);

                    if((index + 1) % 3 == 0)
                    {
                        $watchlistList.append(currentRow);
                        currentRow = $('<div>').addClass('row');
                    }
                });

                $watchlistList.append(currentRow);
            });
        },

        createWatchlist: function() {
            var self = this;

            var newWatchlist = new app.Watchlist({name: $('#watchlist-create-name').val(), owner: "team10"});
            newWatchlist.save();

            if(newWatchlist.validationError)
            {
                alert(newWatchlist.validationError);
            }
            else
            {
                var $modal = $('#watchlist-create-modal');
                $modal.one('hidden.bs.modal', function()
                {
                    self.render();
                });
                $modal.modal('hide');
            }
        }
    });

})(jQuery);