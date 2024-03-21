import {Cast, Crew} from "./Cast";

export interface Movie {
    id: number;
    imdb_id?: string | '';
    original_title: string | '';
    title: string | '';
    overview: string | '';
    popularity: number | 0;
    release_date: string | '';
    status?: string | '';
    tagline?: string | '';
    vote_average: number | 0;
    vote_count: number | 0;
    poster_path: string | '';
    backdrop_path: string | '';
    genres: Array<Genre> | [];
    adult: boolean | false;
}
export interface FullMovie extends Movie {
    cast: Array<Cast>;
    crew: Array<Crew>;
    images: Array<Image>;
    keywords: Array<Keyword>;
    reviews: Array<Review>;
    recommendations: Array<Movie>;
    similar : Array<Movie>;
    videos: Array<Video>;
}
export interface Genre {
    id: number;
    name: string | '';
}
interface Image {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface Keyword {
    id: number;
    name: string;
}
interface Review {
    author: string;
    content: string;
    created_at: string;
    id: string;
}
interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
