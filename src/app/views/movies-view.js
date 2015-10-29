var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        model: new app.Movie({id:"265727087"}),

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            var that = this;

            this.model.fetch().success(function() {
                console.log(that.model.attributes);

                //that.$el.html(that.template(taskList));
            });
        }
    });

})(jQuery);
