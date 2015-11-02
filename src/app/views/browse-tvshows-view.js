var app = app || {};

(function ($) {

    app.BrowseTvShowsView = Backbone.View.extend({

        template: _.template($('#browse-tvshows-template').html()),

        events: {
            "click #TvShow1 img": "goToTvShow1",
            "click #TvShow2 img": "goToTvShow2",
            "click #TvShow3 img": "goToTvShow3",
            "click #TvShow4 img": "goToTvShow4",
            "click #TvShow5 img": "goToTvShow5",
            "click #TvShow6 img": "goToTvShow6"
        },

        goToTvShow1: function() {
            app.Router.navigate("tvshows/279175900", {trigger: true});
        },

        goToTvShow2: function() {
            app.Router.navigate("tvshows/1030596292", {trigger: true});
        },

        goToTvShow3: function() {
            app.Router.navigate("tvshows/1023870284", {trigger: true});
        },

        goToTvShow4: function() {
            app.Router.navigate("tvshows/1041468345", {trigger: true});
        },

        goToTvShow5: function() {
            app.Router.navigate("tvshows/1027608805", {trigger: true});
        },

        goToTvShow6: function() {
            app.Router.navigate("tvshows/1027617029", {trigger: true});
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);