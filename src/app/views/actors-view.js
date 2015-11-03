var app = app || {};

(function ($) {

    app.ActorsView = Backbone.View.extend({

        template: _.template($("#actors-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var self = this;
            self.$el.html(self.template({actor: {}, movies: {}}));

            self.model = new app.Actor({id: id});

            self.model.fetch().success(function() {
                self.$el.html(self.template({actor: self.model.toJSON(), movies: {}}));

                self.movieCollection = new app.Movies();
                self.movieCollection.url = "/actors/" + self.model.id + "/movies";

                self.movieCollection.fetch({parseModel: false}).complete(function() {
                    self.movieCollection = formatMoviesDate(self.movieCollection);

                    self.$el.html(self.template({actor: self.model.toJSON(), movies: self.movieCollection.toJSON()}));

                    function formatMoviesDate(movieCollection) {
                        for(var i = 0; i < movieCollection.length; i++) {
                            var date = new moment(movieCollection.models[i].attributes.releaseDate);

                            movieCollection.models[i].attributes.releaseDate = date.format("MMM Do YYYY");
                        }
                        return movieCollection
                    }
                });
            });
        }
    });

})(jQuery);