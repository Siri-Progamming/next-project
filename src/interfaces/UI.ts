export interface MediaCardProps{
    id: number;
    type: string;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
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
