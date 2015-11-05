var app = app || {};

(function() {

    app.Watchlist = Backbone.Model.extend({
        urlRoot: "/watchlists",

        validate: function(attrs, options)
        {
            if(attrs.name === undefined || attrs.name === "")
            {
                return "A watchlist must have a name.";
            }
        }
    });

})();