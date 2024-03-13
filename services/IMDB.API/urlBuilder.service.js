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
export function buildURL_movies_onlyLanguage(idMovie, language, url) {
    if (language) {
        url = url + '?language=' + language;
    }
    return url;
}
