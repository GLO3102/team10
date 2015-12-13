var app = app || {};

(function ($) {

    app.SearchView = Backbone.View.extend({

        template: _.template($('#search-template').html()),

        events: {
            "click #search-button": "search",
            "click .follow-user": "followUser",
            "click .genre-filter": "genreFilter",
            "click .add-movie-to-watchlists-search": "openWatchlistsPopup",
            "click #btn-add-to-watchlists-search": "addToWatchlists",
            "click input:radio[name=search-category]": "changeCategory"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (searchResults) {

            if(!searchResults) searchResults = {};

            var self = this;
            var data = searchResults;

            data.hasMovies = !!data.movies && data.movies.length > 0;
            data.hasActors = !!data.actors && data.actors.length > 0;
            data.hasTvShows = !!data.tvshows && data.tvshows.length > 0;
            data.hasUsers = !!data.users && data.users.length > 0;

            data.activeTab = data.hasMovies ? "movies"
                            : data.hasActors ? "actors"
                            : data.hasTvShows ? "tvshows"
                            : data.hasUsers ? "users"
                            : "none";

            data.category = !!data.category ? data.category : 'all';
            data.searchText = !!data.searchText ? data.searchText : '';
            self.lastSearchText = data.searchText;
            self.lastCategory = data.category;

            var autocompleteUrl = data.category === 'all' ? '/search' :
                                  data.category === 'movies' ? '/search/movies' :
                                  data.category === 'tvshows' ? '/search/tvshows/seasons' :
                                  data.category === 'actors' ? '/search/actors' :
                                  data.category === 'users' ? '/search/users' :
                                  '/search';

            if(data.hasMovies){
                self.watchlists = new app.Watchlists();
                self.watchlists.fetch().complete(function(){
                    var userWatchlists = [];

                    self.watchlists.toJSON().forEach(function(watchlist) {
                        if (watchlist.owner) {
                            if (watchlist.owner.id === app.currentUser.attributes.id) {
                                userWatchlists.push(watchlist);
                            }
                        }
                    });

                    data.watchlists = userWatchlists;
                    self.$el.html(self.template(data));
                    self.autocomplete(self.getAutoCompleteURL(data.category));
                });
            }
            else {
                self.$el.html(self.template(data));
                self.autocomplete(self.getAutoCompleteURL(data.category));
            }
        },

        getAutoCompleteURL: function(category) {
            return category === 'all' ? '/search' :
                   category === 'movies' ? '/search/movies' :
                   category === 'tvshows' ? '/search/tvshows/seasons' :
                   category === 'actors' ? '/search/actors' :
                   category === 'users' ? '/search/users' :
                   '/search';
        },

        changeCategory: function(event){
            this.autocomplete(this.getAutoCompleteURL($(event.target).val()), true);
        },

        autocomplete: function(url, update)
        {
            var options = {
                serviceUrl: url,
                paramName: "q",
                params: {limit: 50},
                triggerSelectOnValidInput: false,
                transformResult: function (response) {
                    response = JSON.parse(response);
                    var data = !!response.results ? response.results : response;
                    return {
                        suggestions: data.map(function (element) {
                            return !!element.trackName ? element.trackName :
                                !!element.collectionName ? element.collectionName :
                                    !!element.artistName ? element.artistName :
                                        !!element.name ? element.name : "Unknown";
                        })
                    };
                }
            };

            console.log(update + " : " + url);
            if(update) { $('#search-text').autocomplete().setOptions(options);}
            else {$('#search-text').autocomplete(options);}
        },

        search: function() {
            var checkedCategory = this.$('input:radio[name=search-category]:checked').val();
            var searchText = this.$('#search-text').val();

            switch(checkedCategory){
                case "all": this.searchGlobal(searchText); break;
                case "movies": this.searchMovies(searchText); break;
                case "tvshows": this.searchTvShows(searchText); break;
                case "actors": this.searchActors(searchText); break;
                case "users": this.searchUsers(searchText); break;
            }
        },

        searchGlobal: function(searchText) {
            var self = this;

            $.ajax({
                url: "/search?q=" + encodeURIComponent(searchText) + "&limit=60",
                type: 'GET'
            }).done(function(data)
            {
                var movies = new app.Movies(data.results.filter(function(element){
                    return element.wrapperType === "track" && element.kind;
                }));

                var tvshows = new app.TvShows(data.results.filter(function(element){
                   return element.wrapperType === "collection" && element.collectionType === "TV Season";
                }));

                var actors = new app.Actors(data.results.filter(function(element){
                   return element.wrapperType === "artist";
                }));

                var users = new app.Users(data.results.filter(function(element){
                   return element.email && element.name;
                }));

                self.render({movies: movies.toJSON(), tvshows: tvshows.toJSON(), actors: actors.toJSON(), users: users.toJSON(), category: "all", searchText: searchText});

            }).fail(function(jqXHR, status) {
                console.log("oupselaille po de search pou toé loool");
            });
        },

        searchMovies: function(searchText) {
            var self = this;
            var movies = new app.Movies();
            movies.url = "/search/movies?q=" + encodeURIComponent(searchText) + "&limit=20";
            movies.fetch({parseModel: false}).success(function() {
                self.render({movies: movies.toJSON(), category: "movies", searchText: searchText});
            });
        },

        searchTvShows: function(searchText) {
            var self = this;
            var tvshows = new app.TvShows();
            tvshows.url = "/search/tvshows/seasons?q=" + encodeURIComponent(searchText) + "&limit=20";
            tvshows.fetch({parseModel: false}).success(function() {
                self.render({tvshows: tvshows.toJSON(), category: "tvshows", searchText: searchText});
            });
        },

        searchActors: function(searchText) {
            var self = this;
            var actors = new app.Actors();
            actors.url = "/search/actors/?q=" + encodeURIComponent(searchText) + "&limit=20";
            actors.fetch({parseModel: false}).success(function() {
                self.render({actors: actors.toJSON(), category: "actors", searchText: searchText});
            });
        },

        searchUsers: function(searchText) {
            var self = this;
            var users = new app.Users();
            users.url = "/search/users/?q=" + encodeURIComponent(searchText);
            users.fetch({parseModel: false}).success(function() {
                self.render({users: users.toJSON(), category: "users", searchText: searchText});
                users.forEach(function(user) {
                    var isUserFollowed = false;
                    var userButton = $("#" + user.id);

                    app.currentUser.attributes.following.forEach(function(followedUser) {
                        if (user.id === followedUser.id) {
                            isUserFollowed = true;
                        }
                    });

                    if (isUserFollowed) {
                        userButton.addClass("followed");
                        userButton.text("Unfollow");
                        userButton.css('background-color', "orangered");
                    } else {
                        userButton.addClass("not-followed");
                        userButton.text("Follow");
                        userButton.css('background-color', "#1abc9c");
                    }
                })
            });
        },

        genreFilter: function(event) {
            var self = this;
            var element = $(event.target);
            var genre = element.html();

            $.when($.ajax({url: "/genres/movies", type: 'GET'}),
                   $.ajax({url: "/genres/tvshows", type: 'GET'}))
            .then(function(movieResponse, tvshowResponse){
                var predicate = function(element) {return element.name === genre};
                var movieGenre = _.find(movieResponse[0], predicate);
                var tvshowGenre = _.find(tvshowResponse[0], predicate);

                var movies;
                var tvshows;
                var promises = [];
                if(movieGenre.id && (self.lastCategory === 'movies' || self.lastCategory === 'all')) {
                    movies = new app.Movies();
                    movies.url = "/search/movies?q=" + encodeURIComponent(self.lastSearchText) + "&limit=20&genre=" + movieGenre.id;
                    promises.push(movies.fetch({parseModel: false}));
                }

                if(tvshowGenre.id && (self.lastCategory === 'tvshows' || self.lastCategory === 'all')) {
                    tvshows = new app.TvShows();
                    tvshows.url = "/search/tvshows/seasons?q=" + encodeURIComponent(self.lastSearchText) + "&limit=20&genre=" + tvshowGenre.id;
                    promises.push(tvshows.fetch({parseModel: false}));
                }

                $.when.apply($, promises).then(function()
                {
                    self.render({movies: (!!movies ? movies.toJSON() : undefined),
                        tvshows: (!!tvshows ? tvshows.toJSON() : undefined),
                        searchText: self.lastSearchText,
                        category: self.lastCategory});
                }, function(jqXHR, status){
                    console.log("oupselaille po de search pou toé loool");
                });
            }, function(jqXHR, status) {
                console.log("lé genres sont pas trouvables où ece quils se cachent? ;)");
            });
        },

        followUser: function(e) {
            var clickedUserId = e.currentTarget.id;

            var clickedButton = $("#" + clickedUserId);

            var isUserFollowed = false;
            app.currentUser.attributes.following.forEach(function(followedUser) {
                if (clickedUserId === followedUser.id) {
                    isUserFollowed = true;
                }
            });

            if (isUserFollowed) {
                $.ajax({
                    url: "/follow/" + clickedUserId,
                    type: 'DELETE'
                }).done(function(data) {
                    clickedButton.removeClass("followed");
                    clickedButton.addClass("not-followed");
                    clickedButton.text("Follow");
                    clickedButton.css('background-color', "#1abc9c");

                    app.currentUser.attributes.following = data.following;

                }).fail(function(jqXHR, status) {
                    console.log(status);
                });
            } else {
                $.ajax({
                    url: "/follow",
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({id: clickedUserId})

                }).done(function(data) {
                    clickedButton.removeClass("not-followed");
                    clickedButton.addClass("followed");
                    clickedButton.text("Unfollow");
                    clickedButton.css('background-color', "orangered");

                    app.currentUser.attributes.following = data.following;

                }).fail(function(jqXHR, status) {
                    console.log(status);
                });
            }
        },

        openWatchlistsPopup: function(event) {
            this.currentMovie = new app.Movie({id: $(event.target).attr("data-movieid")});
        },

        addToWatchlists: function() {
            var self = this;

            var $modal = self.$('#add-movie-to-watchlist-modal-search');
            var checkboxes = $modal.find('input[type="checkbox"]');

            var isValid = true;
            self.currentMovie.fetch().success(function()
            {
                checkboxes.each(function(index, checkbox) {
                    if($(checkbox).is(':checked')) {
                        var watchlistId = $(checkbox).attr("data-watchlist-id");
                        var watchlist = _.find(self.watchlists.models, function(watchlist) {
                            return watchlist.id === watchlistId;
                        });
                        console.log(watchlist);

                        if(watchlist.containsMovie(self.currentMovie)) {
                            alert("The watchlist " + watchlist.attributes.name + " already contains this movie.");
                            isValid = false;
                            return false;
                        }
                        else {
                            console.log(self.currentMovie);
                            self.currentMovie.isNew = function(){return true;};
                            self.currentMovie.save({}, {url: "/watchlists/" + watchlistId + "/movies"}).complete(function() {
                                watchlist.fetch();
                            });
                        }
                    }
                });

                if(isValid) $modal.modal('hide');
            });
        }
    });

})(jQuery);