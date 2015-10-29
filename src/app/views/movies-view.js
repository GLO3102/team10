var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        model: app.movie,

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);
