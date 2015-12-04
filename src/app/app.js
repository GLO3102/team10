$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.url = "https://umovie.herokuapp.com" + options.url;
    if ( !options.beforeSend) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', $.cookie("session"));        }
    }
});

var app = app || {};

(function() {

    google.load('search', '1');

    app.googleAPILoaded = false;

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

    app.getYoutubeRequestFromMovieTitle = function(movieTitle) {
        return gapi.client.youtube.search.list({
            q: movieTitle + "trailer",
            maxResults: 1,
            part: 'snippet',
            type: 'video'
        });
    };

    var imageSearch;
    var actorModel;

    app.getGoogleImageURLFromActorName = function(model) {
        actorModel = model;

        var actorName = model.attributes.artistName;

        imageSearch = new google.search.ImageSearch();

        imageSearch.setSearchCompleteCallback(this, searchComplete, null);

        imageSearch.execute(actorName);
    };

    app.isAuthenticated = function() {
        var token = $.cookie('session');

        if (token) {
            return true;
        } else {
            return false;
        }
    };

    if(app.isAuthenticated()) {
        createUserFromToken();
    }

    var searchComplete = function() {
        actorModel.attributes.imageURL = imageSearch.results[0].url;
    };

    app.headerView = new app.HeaderView();

    function createUserFromToken() {
        $.ajax({
            url : '/tokenInfo',
            type : 'GET'
        }).done(function(data) {
            app.currentUser = new app.User({name: data.name, email: data.email, id: data.id});
            app.headerView.render(app.currentUser);
        }).fail(function(jqXHR, status) {
            console.log("error while logging out", status);
        });
    }

    app.homeView = new app.HomeView({el: '#main-container'});
    app.loginView = new app.LoginView();
    app.subscribeView = new app.SubscribeView();

    app.moviesView = new app.MoviesView({el: '#main-container'});
    app.browseMoviesView = new app.BrowseMoviesView({el: '#main-container'});

    app.browseTvShowsView = new app.BrowseTvShowsView({el: '#main-container'});
    app.tvShowsView = new app.TvShowsView({el: '#main-container'});

    app.browseActorsView = new app.BrowseActorsView({el: '#main-container'});
    app.actorsView = new app.ActorsView({el: '#main-container'});

    app.watchlistsView = new app.WatchlistsView({el: '#main-container'});
})();

googleApiClientReady = function() {
    app.googleAPILoaded = true;
};