import {FullMovie, Movie} from "../../interfaces/Movie";
import {Cast, Crew} from "../../interfaces/Cast";
import {Serie} from "../../interfaces/Serie";

export function createMovie(data: any): Movie {
    return {
        id: data.id,
        imdb_id: data.imdb_id,
        original_title: data.original_title,
        title: data.title,
        overview: data.overview,
        popularity: data.popularity,
        release_date: data.release_date,
        status: data.status,
        tagline: data.tagline,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        adult: data.adult
    }
}

export function createSerie(data: any): Serie {
    return {
        adult: data.adult,
        backdrop_path: data.backdrop_path,
        id: data.id,
        title: data.name,
        original_language: data.original_language,
        original_title: data.original_name,
        overview: data.overview,
        poster_path: data.poster_path,
        media_type: data.media_type,
        genres: data.genres_ids,
        popularity: data.popularity,
        release_date: data.first_air_date,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        origin_country: data.origin_country
    }
}
export function createFullMovie(data: any): FullMovie {
    const movie = createMovie(data);
    return {
        ...movie,
        cast: data.credits.cast,
        crew: data.credits.crew,
        images: data.images.backdrops,
        keywords: data.keywords.keywords,
        reviews: data.reviews.results,
        recommendations: data.recommendations.results,
        similar: data.similar.results,
        videos: data.videos.results,
        runtime: data.runtime,
    }
}

