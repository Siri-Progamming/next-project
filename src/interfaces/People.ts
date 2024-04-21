import {Genre, Image} from "./Movie";
export interface Actor {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday?: string | null;
    gender: number; // 0 Not Specified - 1 Female - 2 Male - 3 Non-binary
    homepage?: string | null;
    id: number;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

export interface FullActor extends Actor {
    combined_credits: Array<CombinedCredits>;
    images: Array<Image>;
}

export interface CombinedCredits {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<Genre> | [];
    id: number;
    origin_country?: Array<string> | [];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date?: string | null;
    first_air_date?: string | null;
    title?: string;
    name?: string;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order?: number;
    episode_count?: number;
    media_type: string;
}
