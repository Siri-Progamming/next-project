import {LanguagesEnumInterface, LanguagesEnum} from '../interfaces/Enums';
import {SortByEnumInterface, SortByEnum} from '../interfaces/Enums';
export const LANGUAGES: Array<LanguagesEnumInterface> = [
    {id: 0, name: LanguagesEnum.frFR, display_name: "Français"},
    {id: 1, name: LanguagesEnum.enUS, display_name: "English"}
];
export const SORT_BY: Array<SortByEnumInterface> = [
    {name: SortByEnum.popularityDesc, display_name: "Popularité + / -"},
    {name: SortByEnum.popularityAsc, display_name: "Popularité - / +"},
    {name: SortByEnum.voteAverageDesc, display_name: "Note + / -"},
    {name: SortByEnum.voteAverageAsc, display_name: "Note - / +"},
    {name: SortByEnum.primaryReleaseDateDesc, display_name: "Date de sortie + / -"},
    {name: SortByEnum.primaryReleaseDateAsc, display_name: "Date de sortie - / +"},
    {name: SortByEnum.originalTitleAsc, display_name: "Titre (A-Z)"},
    {name: SortByEnum.originalTitleDesc, display_name: "Titre (Z-A)"}
];

