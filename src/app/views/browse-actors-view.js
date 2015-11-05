var app = app || {};

(function ($) {

    app.BrowseActorsView = Backbone.View.extend({

        template: _.template($('#browse-actors-template').html()),

        events: {
            "click #actor1 img": "goToActor1",
            "click #actor2 img": "goToActor2",
            "click #actor3 img": "goToActor3",
            "click #actor4 img": "goToActor4",
            "click #actor5 img": "goToActor5",
            "click #actor6 img": "goToActor6"
        },

        goToActor1: function() {
            app.Router.navigate("actors/157552", {trigger: true});
        },

        goToActor2: function() {
            app.Router.navigate("actors/3575442", {trigger: true});
        },

        goToActor3: function() {
            app.Router.navigate("actors/272994458", {trigger: true});
        },

        goToActor4: function() {
            app.Router.navigate("actors/263060824", {trigger: true});
        },

        goToActor5: function() {
            app.Router.navigate("actors/209666447", {trigger: true});
        },

        goToActor6: function() {
            app.Router.navigate("actors/206329468", {trigger: true});
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

})(jQuery);
