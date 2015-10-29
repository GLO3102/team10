var app = app || {};

(function ($) {

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var that = this;

            that.model = new app.TvShow({id: id});

            this.model.fetch().success(function() {
                that.$el.html(that.template(that.model.toJSON()));
            });
        }
    });

})(jQuery);