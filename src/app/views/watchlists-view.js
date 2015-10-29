var app = app || {};

(function ($) {

    app.WatchlistsView = Backbone.View.extend({

        template: _.template($('#watchlists-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);