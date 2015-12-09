var app = app || {};

(function() {

    app.Episode = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/episodes"
    });

})();