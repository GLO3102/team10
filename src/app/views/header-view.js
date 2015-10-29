var app = app || {};

(function ($) {

    app.HeaderView = Backbone.View.extend({

        el: '#header',

        template: _.template($("#header-template").html()),

        initialize: function () {
            _.bindAll(this, 'render');
            this.render();
        },

        events: {
            "click #navbar-movies": "goToMovies"
        },

        render: function () {
            this.$el.html(this.template());
        },

        goToMovies: function() {
            app.Router.navigate("movies", {trigger: true});
        }
    });

})(jQuery);