import {FullMovie, Image, Movie, Review, Video} from "../../interfaces/Movie";
import {Episode, FullSerie, Season, Serie, Watch} from "../../interfaces/Serie";
import {Cast, Crew} from "../../interfaces/Cast";
import {MediaCardProps} from "../../interfaces/UI";

export function createMovie(data: any): Movie {
    return {
        mediaType: "movie",
        id: data.id,
        imdb_id: data.imdb_id,
        original_title: data.original_title,
        original_language: data.original_language,
        title: data.title,
        overview: data.overview,
        popularity: data.popularity,
        release_date: data.release_date,
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
        mediaType: "serie",
        adult: data.adult,
        backdrop_path: data.backdrop_path,
        id: data.id,
        title: data.name,
        original_language: data.original_language,
        original_title: data.original_name,
        overview: data.overview,
        poster_path: data.poster_path,
        media_type: data.media_type,
        genres: data.genres,
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
        status: data.status,
        tagline: data.tagline
    }
}
export function createFullSerie(data:any): FullSerie{
    const serie = createSerie(data);
    return{
        ...serie,
        in_production: data.in_production,
        last_air_date: data.last_air_date,
        last_episode_to_air: data.last_episode_to_air,
        next_episode_to_air: data.next_episode_to_air,
        number_of_episodes: data.number_of_episodes,
        number_of_seasons: data.number_of_seasons,
        seasons: data.seasons,
        status: data.status,
        cast: data.credits.cast,
        crew: data.credits.crew,
        images: data.images.backdrops,
        recommendations: data.recommendations.results,
        reviews: data.reviews.results,
        similar: data.similar.results,
        videos: data.videos.results,
        watch: data['watch/providers'].results
    }
}
export function createMediaCardPropsFromSerie(data: any): MediaCardProps {
    console.log("Movie or Serie before MediaCardProps : ",data);
    return {
        id: data.id,
        type: "serie",
        title: data.name,
        release_date: data.first_air_date,
        vote_average: data.vote_average,
        poster_path: data.poster_path
    }
}
