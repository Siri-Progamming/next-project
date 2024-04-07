import {Genre} from "./Movie";

export interface Serie{
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
