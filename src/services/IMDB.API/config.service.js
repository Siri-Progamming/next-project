//ConfigService est un objet
export const ConfigService = {
    themoviedb:{
        urls:{
            discover: "https://api.themoviedb.org/3/discover/movie",
            movie: "https://api.themoviedb.org/3/movie/{movie_id}",
            movie_videos: "https://api.themoviedb.org/3/movie/{movie_id}/videos",
            movie_top_rated: "https://api.themoviedb.org/3/movie/top_rated",
            movie_upcoming: "https://api.themoviedb.org/3/movie/upcoming",
            movie_popular: "https://api.themoviedb.org/3/movie/popular",
            movie_trending: "https://api.themoviedb.org/3/trending/movie/{time_window}",
            movie_similar: "https://api.themoviedb.org/3/movie/{movie_id}/similar",
            movie_genres:"https://api.themoviedb.org/3/genre/movie/list",
            movie_recommanded: "https://api.themoviedb.org/3/movie/{movie_id}/recommendations",
            movie_images: "https://api.themoviedb.org/3/movie/{movie_id}/images",
            search_movie: "https://api.themoviedb.org/3/search/movie",
            image_view: "https://image.tmdb.org/t/p",
            serie_genres:"https://api.themoviedb.org/3/genre/tv/list",
            serie_search_filter: "https://api.themoviedb.org/3/discover/tv",
            serie_trending: "https://api.themoviedb.org/3/trending/tv/{time_window}",

        },
        //C'est mieux dans un .env les keys
        keys:{
            API_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTIxMThjYzk1NDU4Mzk3MWI1NTE4OWIxMDg1ZGMyZiIsInN1YiI6IjY1ZTliNzRlN2M2ZGUzMDE3YzA5MTBkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EiwM4cNSE8170gyv8YhoNdpE26ebhwh3jgOT9Rwwnog",
            API_KEY: "ce2118cc954583971b55189b1085dc2f"
        }
    }
};

export const tmdbGetOption = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
    }
};
