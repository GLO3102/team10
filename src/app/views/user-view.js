var app = app || {};

(function ($) {

    app.UserView = Backbone.View.extend({

        template: _.template($('#user-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var that = this;

            that.model = new app.User({id: id});

            this.model.fetch().success(function() {
                that.$el.html(that.template({user: that.model.toJSON()}));
            });
        }
    });

})(jQuery);
