export interface LanguagesEnumInterface {
    id: number;
    name: string;
    display_name: string;
}
export enum LanguagesEnum {
    frFR = "fr-FR",
    enUS = "en-US"
}
export interface SortByEnumInterface {
    name: string;
    display_name: string;
}
//TMDB : original_title.asc/desc, popularity.asc/desc, revenue.asc/desc, primary_release_date.asc/desc, title.asc/desc, vote_average.asc/desc, vote_count.asc/desc)(Default popularity.desc
export enum SortByEnum {
    originalTitleAsc = "original_title.asc",
    originalTitleDesc = "original_title.desc",
    popularityAsc = "popularity.asc",
    popularityDesc = "popularity.desc",
    revenueAsc = "revenue.asc",
    revenueDesc = "revenue.desc",
    primaryReleaseDateAsc = "primary_release_date.asc",
    primaryReleaseDateDesc = "primary_release_date.desc",
    titleAsc = "title.asc",
    titleDesc = "title.desc",
    voteAverageAsc = "vote_average.asc",
    voteAverageDesc = "vote_average.desc",
    voteCountAsc = "vote_count.asc",
    voteCountDesc = "vote_count.desc"
}
export enum SeriesSortByEnum {
    firstAirDateAsc = "first_air_date.asc",
    firstAirDateDesc = "first_air_date.desc",
    nameAsc = "name.asc",
    nameDesc = "name.desc",
    originalNameAsc = "original_name.asc",
    originalNameDesc = "original_name.desc",
    popularityAsc = "popularity.asc",
    popularityDesc = "popularity.desc",
    voteAverageAsc = "vote_average.asc",
    voteAverageDesc = "vote_average.desc",
    voteCountAsc = "vote_count.asc",
    voteCountDesc = "vote_count.desc"
}
