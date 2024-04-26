import {FullMovie, Movie} from "../../interfaces/Movie";
import {Episode, FullSerie, Season, Serie} from "../../interfaces/Serie";
import {MediaCardProps} from "../../interfaces/UI";
import {Actor, FullActor} from "../../interfaces/People";

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
        seasons: createSeasons(data.seasons),
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
    //console.log("Movie or Serie before MediaCardProps : ",data);
    return {
        id: data.id,
        type: "serie",
        title: data.name,
        release_date: data.first_air_date,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        poster_path: data.poster_path
    }
}
export function createMediaCardPropsFromMovie(data: any): MediaCardProps {
    //console.log("Movie or Serie before MediaCardProps : ",data);
    return {
        id: data.id,
        type: "movie",
        title: data.title,
        release_date: data.release_date,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        poster_path: data.poster_path
    }
}
export function createActor(data:any):Actor{
    return{
        adult: data.adult,
        also_known_as: data.also_known_as,
        biography: data.biography,
        birthday: data.birthday,
        deathday: data.deathday,
        gender: data.gender,
        homepage: data.homepage,
        id: data.id,
        known_for_department: data.known_for_department,
        name: data.name,
        place_of_birth: data.place_of_birth,
        popularity: data.popularity,
        profile_path: data.profile_path
    }
}
export function createFullActor(data:any):FullActor{
    const actor = createActor(data);
    return{
        ...actor,
        combined_credits: data.combined_credits.cast,
        images: data.images.profiles
    }
}

function createSeasons(data: any): Array<Season> {
    let seasons:Array<Season> = [];
    data.forEach((season:any) => {
        seasons.push({
            air_date: season.air_date,
            episode_count: season.episode_count,
            episodes: createEpisodes(season.episodes),
            id: season.id,
            name: season.name,
            overview: season.overview,
            poster_path: season.poster_path,
            season_number: season.season_number,
            vote_average: season.vote_average
        });
    });
    return seasons;
}
function createEpisodes(data: any): Array<Episode> {
    let episodes:Array<Episode> = [];
    data.forEach((episode:any) => {
        episodes.push({
            id: episode.id,
            name: episode.name,
            overview: episode.overview,
            vote_average: episode.vote_average,
            vote_count: episode.vote_count,
            air_date: episode.air_date,
            episode_number: episode.episode_number,
            runtime: episode.runtime,
            season_number: episode.season_number,
            show_id: episode.show_id,
            still_path: episode.still_path
        });
    });
    return episodes;
}
