var app = app || {};

(function ($) {

    app.MoviesView = Backbone.View.extend({

        template: _.template($('#movies-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var that = this;

            that.model = new app.Movie({id: id});

            this.model.fetch().success(function() {
                var date = new moment(that.model.attributes.releaseDate);

                that.model.attributes.releaseDate = date.format("MMM Do YYYY");

                that.$el.html(that.template(that.model.toJSON()));
            });
        }
    });

})(jQuery);
