var app = app || {};

(function ($) {

    app.HomeView = Backbone.View.extend({

        template: _.template($('#home-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);
