var app = app || {};

(function ($) {

    app.SearchView = Backbone.View.extend({

        template: _.template($('#search-template').html()),

        events: {
            "click #search-button": "search"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function (searchResults) {

            if(!searchResults) searchResults = {};

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

            this.$el.html(this.template(data));
        },

        search: function() {
            var checkedCategory = this.$('input:radio[name=search-category]:checked').val();
            var searchText = this.$('#search-text').val();

            switch(checkedCategory){
                case "all": this.searchGlobal(searchText); break;
                case "movie": this.searchMovies(searchText); break;
                case "tvshow": this.searchTvShows(searchText); break;
                case "actor": this.searchActors(searchText); break;
                case "user": this.searchUsers(searchText); break;
            }
        },

        searchGlobal: function(searchText) {
            var self = this;

            $.ajax({
                url: "/search?q=" + encodeURIComponent(searchText) + "&limit=20",
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
            });
        }
    });

})(jQuery);