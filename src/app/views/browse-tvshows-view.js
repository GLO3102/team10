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
            app.Router.navigate("tvshows/seasons/279175900", {trigger: true});
        },

        goToTvShow2: function() {
            app.Router.navigate("tvshows/seasons/279175882", {trigger: true});
        },

        goToTvShow3: function() {
            app.Router.navigate("tvshows/seasons/279156113", {trigger: true});
        },

        goToTvShow4: function() {
            app.Router.navigate("tvshows/seasons/992391218", {trigger: true});
        },

        goToTvShow5: function() {
            app.Router.navigate("tvshows/seasons/970700866", {trigger: true});
        },

        goToTvShow6: function() {
            app.Router.navigate("tvshows/seasons/1005148837", {trigger: true});
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);