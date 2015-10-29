var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        model: new app.Movie({id:"1017088138"}),

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            var that = this;

            this.model.fetch().success(function() {
                that.$el.html(that.template(that.model.toJSON()));
            });
        }
    });

})(jQuery);
