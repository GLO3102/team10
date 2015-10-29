$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = "https://umovie.herokuapp.com/unsecure" + options.url;
});

var app = app || {};

(function() {

    app.htmlEncode =  function(value) {
        return $('<div/>').text(value).html();
    };

    app.headerView = new app.HeaderView();
    app.homeView = new app.HomeView({el: '#main-container'});
    app.moviesView = new app.MoviesView({el: '#main-container'});
    app.tvShowsView = new app.TvShowsView({el: '#main-container'});
    app.actorsView = new app.ActorsView({el: '#main-container'});
})();