$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = "https://umovie.herokuapp.com/unsecure" + options.url;
});

var app = app || {};

(function() {

    app.htmlEncode =  function(value) {
        return $('<div/>').text(value).html();
    };

    app.setActiveMenuButtonWithId = function(buttonID) {
        var buttons = document.getElementById("navbar-body").getElementsByTagName("a");
        for (var i = 0; i < buttons.length; ++i) {
            if (buttons[i].id == buttonID) {
                buttons[i].parentNode.classList.add("active");
            } else {
                if (buttons[i].parentNode.classList.contains("active")) {
                    buttons[i].parentNode.classList.remove("active");
                }
            }
        }
    };

    app.headerView = new app.HeaderView();
    app.homeView = new app.HomeView({el: '#main-container'});

    app.moviesView = new app.MoviesView({el: '#main-container'});
    app.browseMoviesView = new app.BrowseMoviesView({el: '#main-container'});

    app.browseTvShowsView = new app.BrowseTvShowsView({el: '#main-container'});
    app.tvShowsView = new app.TvShowsView({el: '#main-container'});

    app.browseActorsView = new app.BrowseActorsView({el: '#main-container'});
    app.actorsView = new app.ActorsView({el: '#main-container'});

    app.watchlistsView = new app.WatchlistsView({el: '#main-container'});
})();