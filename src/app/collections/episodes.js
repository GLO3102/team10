var app = app || {};

(function() {

    var Episodes = Backbone.Collection.extend({
        url: "/episodes",
        model: app.Episode
    });

    app.episodes = new Episodes();
})();