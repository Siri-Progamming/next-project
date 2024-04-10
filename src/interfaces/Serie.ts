import {Genre, Image, Review, Video} from "./Movie";
import {Cast, Crew} from "./Cast";

export interface Serie{
    mediaType:string;
    adult: boolean | false;
    backdrop_path: string | '';
    id: number;
    title: string | ''; //name
    original_language: string | '';
    original_title: string | ''; //original_name
    overview: string | '';
    poster_path: string | '';
    media_type: string | '';
    genres: Array<Genre> | [];
    popularity: number | 0;
    release_date: string | '';  //first_air_date
    vote_average: number | 0;
    vote_count: number | 0;
    origin_country: Array<string> | [];
}
export interface FullSerie extends Serie{
    in_production: boolean; //En cours ou fini
    last_air_date:string;
    last_episode_to_air:Episode;
    next_episode_to_air:Episode |null;
    number_of_episodes: number;
    number_of_seasons: number;
    seasons:Array<Season> | [];
    status:string;
    cast:Array<Cast> | [];
    crew:Array<Crew> | [];
    images:Array<Image> | [];
    recommendations:Array<Serie> | [];
    reviews:Array<Review> | [];
    similar:Array<Serie> | [];
    videos:Array<Video> | [];
    watch:Array<Watch> | []; // watch/providers
}

export interface Season{
    air_date:string | null;
    episode_count:number;
    id:number;
    name:string | "";
    overview:string | "";
    poster_path:string;
    season_number:number;
    vote_average:number;
}
export interface Episode{
    id:number;
    name:string;
    overview:string;
    vote_average:number;
    vote_count:number;
    air_date:string;
    episode_number:number;
    episode_type:string;
    runtime:number;
    season_number:number;
    show_id:number;
    still_path:string;
}

export interface Watch{
    country_code:string;
    providers:Array<Provider> | [] //flatrate
}
export interface Provider{
    logo_path:string;
    id:number; //provider_id
    name:string; //provider_name
    display_priority:number;
}
