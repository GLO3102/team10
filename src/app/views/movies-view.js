var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        template: _.template($('#header-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);
