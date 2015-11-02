var app = app || {};

(function ($) {

    app.TvShowsView = Backbone.View.extend({

        template: _.template($('#tvshows-template').html()),

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (id) {
            var self = this;
            self.$el.html(self.template({tvshow: {}, episodes: {}}));

            self.model = new app.TvShow({id: id});

            self.model.fetch().success(function() {
                var date = new moment(self.model.attributes.releaseDate);

                self.model.attributes.artworkUrl100 = self.model.attributes.artworkUrl100.replace("100x100", "600x600");
                self.model.attributes.releaseDate = date.format("YYYY");

                self.$el.html(self.template({tvshow: self.model.toJSON(), episodes: {}}));

                self.episodeCollection = new app.Episodes();
                self.episodeCollection.url = "/tvshows/season/" + self.model.id + "/episodes";

                self.episodeCollection.fetch({parseModel: false}).complete(function() {
                    self.$el.html(self.template({tvshow: self.model.toJSON(), episodes: self.episodeCollection.toJSON()}));
                });
            });
        }
    });


})(jQuery);