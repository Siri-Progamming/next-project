import {ConfigService} from "./config.service";

export function buildURL_movies_id_images(idMovie, include_image_language, language) {
    let url = ConfigService.themoviedb.urls.movie_images.replace("{movie_id}", idMovie.toString());
    let severalParams = false;
    if (include_image_language || include_image_language != null) {
        url = url + '?include_image_language=' + include_image_language;
        severalParams = true;
    }
    if (language) {
        if (!severalParams) {
            url = url + '?language=' + language;
        } else {
            url = url + '&language=' + language;
        }
    }
    return url;
}

export function buildURL_movies_full(idMovie, append_to_response, language) {
    let url = ConfigService.themoviedb.urls.movie.replace("{movie_id}", idMovie.toString());
    let severalParams = false;
    if (append_to_response || append_to_response != null) {
        url = url + '?append_to_response=' + append_to_response;
        severalParams = true;
    }
    if (language) {
        if (!severalParams) {
            url = url + '?language=' + language;
        } else {
            url = url + '&language=' + language;
        }
    }
    return url;
}

export function buildURL_movies_onlyLanguage(language, url) {
    if (language) {
        url = url + '?language=' + language;
    }
    return url;
}

export function buildURL_movies_discover(req, url){
    // language, page, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, with_genres
    // console.log("buildURL_movies_discover req.query:", req.query);
    // console.log("req.query.language:", req.query.language);
    let severalParams = false;
    if(req.query.query === '?include_adult=false'){
        url = url + '?include_adult=false';
        severalParams = true;
    }
    if (req.query.language) {
        if (!severalParams) {
            url = url + '?language=' + req.query.language[0];
            severalParams = true;
        }else{
            url = url + '&language=' + req.query.language[0];
        }
    }
    if (req.query.page) {
        if (!severalParams) {
            url = url + '?page=' + req.query.page;
            severalParams = true;
        } else {
            url = url + '&page=' + req.query.page;
        }
    }
    if(req.query.sort_by){
        if (!severalParams) {
            url = url + '?sort_by=' + req.query.sort_by;
            severalParams = true;
        } else {
            url = url + '&sort_by=' + req.query.sort_by;
        }
    }
    if(req.query['vote_average.gte'] >= 0){
        if (!severalParams) {
            url = url + '?vote_average.gte=' + req.query['vote_average.gte'];
            severalParams = true;
        } else {
            url = url + '&vote_average.gte=' + req.query['vote_average.gte'];
        }
    }
    if(req.query['vote_average.lte']  >= 0){
        if (!severalParams) {
            url = url + '?vote_average.lte=' + req.query['vote_average.lte'];
            severalParams = true;
        } else {
            url = url + '&vote_average.lte=' + req.query['vote_average.lte'];
        }
    }
    if(req.query['vote_count.gte']  >= 0){
        if (!severalParams) {
            url = url + '?vote_count.gte=' + req.query['vote_count.gte'];
            severalParams = true;
        } else {
            url = url + '&vote_count.gte=' + req.query['vote_count.gte'];
        }
    }
    if(req.query['vote_count.lte']  >= 0){
        if (!severalParams) {
            url = url + '?vote_count.lte=' + req.query['vote_count.lte'];
            severalParams = true;
        } else {
            url = url + '&vote_count.lte=' + req.query['vote_count.lte'];
        }
    }
    if(req.query.with_genres){
        if (!severalParams) {
            url = url + '?with_genres=' + req.query.with_genres;
            severalParams = true;
        } else {
            url = url + '&with_genres=' + req.query.with_genres;
        }
    }
    console.log("url:", url);
    return url;
}
