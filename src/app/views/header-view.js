/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {

    app.HeaderView = Backbone.View.extend({

        el: '#header',

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