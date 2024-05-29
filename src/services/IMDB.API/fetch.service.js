import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "./config.service";
import {buildURL_movies_onlyLanguage} from "./urlBuilder.service";
import {MEDIA_TYPES} from "../../constantes/app_constantes";

async function getData(res, url) {
    const response = await fetch(url, tmdbGetOption);
    if(response.ok){
        const datas = await response.json();
        return res.status(200).json({ status: 200, datas });
    }else{
        return res.status(404).json({ status: 404, error: "Not Found" });
    }
}
export async function switchGetData(req, res, url) {
    switch (req.method) {
        case "GET":
            await getData(res, url, tmdbGetOption);
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}

export async function fetchMediaGenres(language, type) {
    let url;
    switch(type){
        case MEDIA_TYPES.movie: url = buildURL_movies_onlyLanguage(language, ConfigService.themoviedb.urls.movie_genres); break;
        case MEDIA_TYPES.tv: url = buildURL_movies_onlyLanguage(language, ConfigService.themoviedb.urls.serie_genres); break;
    }
    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    return apiResponse.genres;
}

export async function fetchMovie(language, idMovie) {
    const url = buildURL_movies_onlyLanguage(language, ConfigService.themoviedb.urls.movie.replace("{movie_id}", idMovie.toString()));
    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    return apiResponse;
}

export async function fetchSerie(language, idSerie) {
    const url = buildURL_movies_onlyLanguage(language, ConfigService.themoviedb.urls.serie.replace("{serie_id}", idSerie.toString()));
    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    return apiResponse;
}
