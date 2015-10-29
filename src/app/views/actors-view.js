var app = app || {};

(function ($) {

    app.ActorsView = Backbone.View.extend({

        template: _.template($("#actors-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);