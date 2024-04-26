export interface MediaCardProps{
    id: number;
    type: string;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    character?: string;
    nbEpisodes?: number;
    roleOrder?: number;
}
export interface MediaSearchState{
    isSearchEmpty: boolean;
    isLoading: boolean;
    nbResults: number;
    nbPages: number;
}

export interface MediaHorizontalDisplayState{
    isEmpty: boolean;
    isLoading: boolean;
}
