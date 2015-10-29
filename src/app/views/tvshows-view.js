var app = app || {};

(function ($) {

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });
})(jQuery);