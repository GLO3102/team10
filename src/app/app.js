$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = "https://umovie.herokuapp.com/unsecure" + options.url;
});

var app = app || {};

(function() {

    app.htmlEncode =  function(value) {
        return $('<div/>').text(value).html();
    }

})();