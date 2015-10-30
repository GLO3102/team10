var app = app || {};

(function ($) {

    app.BrowseMoviesView = Backbone.View.extend({

        template: _.template($('#browse-movies-template').html()),

        events: {
            "click #movie1 img": "goToMovie1",
            "click #movie2 img": "goToMovie2",
            "click #movie3 img": "goToMovie3",
            "click #movie4 img": "goToMovie4",
            "click #movie5 img": "goToMovie5",
            "click #movie6 img": "goToMovie6"
        },

        goToMovie1: function() {
            app.Router.navigate("movies/960891136", {trigger: true});
        },

        goToMovie2: function() {
            app.Router.navigate("movies/951103573", {trigger: true});
        },

        goToMovie3: function() {
            app.Router.navigate("movies/767757443", {trigger: true});
        },

        goToMovie4: function() {
            app.Router.navigate("movies/764632601", {trigger: true});
        },

        goToMovie5: function() {
            app.Router.navigate("movies/463252252", {trigger: true});
        },

        goToMovie6: function() {
          app.Router.navigate("movies/270284322", {trigger: true});
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);
