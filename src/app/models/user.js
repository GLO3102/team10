
var app = app || {};

(function() {

    app.User = Backbone.Model.extend({
        methodToURL: {
            'create': '/signup'
        },

        sync: function(method, model, options) {
            options = options || {};
            options.url = model.methodToURL[method.toLowerCase()];

            return Backbone.sync.apply(this, arguments);
        }
    });

})();