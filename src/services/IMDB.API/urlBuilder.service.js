import {ConfigService} from "./config.service";
import {MEDIA_TYPES} from "../../constantes/app_constantes";

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

export function buildURL_media_full(idMedia, append_to_response, language, type) {
    let url;
    switch(type){
        case MEDIA_TYPES.movie : url = ConfigService.themoviedb.urls.movie.replace("{movie_id}", idMedia.toString()); break;
        case MEDIA_TYPES.tv : url = ConfigService.themoviedb.urls.serie.replace("{serie_id}", idMedia.toString()); break;
    }
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

export function buildURL_people_full(idPeople, append_to_response, language) {
    let url = ConfigService.themoviedb.urls.people.details.replace("{person_id}", idPeople.toString());
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
            url = url + '?language=' + req.query.language;
            severalParams = true;
        }else{
            url = url + '&language=' + req.query.language;
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
    // console.log("url:", url);
    return url;
}

export function buildURL_series_filter(req, url){
    // (first_air_date.asc/desc, name.asc/desc, original_name.asc/desc, popularity.asc/desc, vote_average.asc/desc, vote_count.asc/desc)(Default popularity.desc)
    // language, page, sort_by,
    //TODO AJouter le runtime ?
    // console.log("serie url before being builit:", url);
    // console.log("serie url query:", req.query);
    url = url + '?include_adult=false';

    if (req.query.language) {
        url = url + '&language=' + req.query.language;
    }
    if (req.query.page) {
        url = url + '&page=' + req.query.page;
    }
    if(req.query.sort_by){
        url = url + '&sort_by=' + req.query.sort_by;
    }
    if(req.query['vote_average.gte'] >= 0){
        url = url + '&vote_average.gte=' + req.query['vote_average.gte'];
    }
    if(req.query['vote_average.lte']  >= 0){
        url = url + '&vote_average.lte=' + req.query['vote_average.lte'];
    }
    if(req.query['vote_count.gte']  >= 0){
        url = url + '&vote_count.gte=' + req.query['vote_count.gte'];
    }
    if(req.query['vote_count.lte']  >= 0){
        url = url + '&vote_count.lte=' + req.query['vote_count.lte'];
    }
    if(req.query.with_genres){
        url = url + '&with_genres=' + req.query.with_genres;
    }
    return url;
}
