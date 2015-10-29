var app = app || {};

(function ($) {

    app.ActorsView = Backbone.View.extend({

        template: _.template($("#actors-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var self = this;

            self.model = new app.Actor({id: id});
            self.model.fetch().success(function() {
                self.movieCollection = new app.Movies();
                self.movieCollection.url = "/actors/" + self.model.id + "/movies";

                self.movieCollection.fetch({parseModel: false}).complete(function()
                {
                    self.$el.html(self.template({actor: self.model.toJSON(), movies: self.movieCollection.toJSON()}));
                });
            });
        }
    });

})(jQuery);