var app = app || {};

(function() {

    app.Watchlist = Backbone.Model.extend({
        urlRoot: "https://umovie.herokuapp.com/watchlists",

        validate: function(attrs, options)
        {
            if(attrs.name === undefined || attrs.name === "")
            {
                return "A watchlist must have a name.";
            }
        },

        containsMovie: function(movieModel)
        {
            return _.some(this.attributes.movies, function(movie)
            {
                return movie.trackId === movieModel.attributes.trackId;
            });
        }
    });

})();