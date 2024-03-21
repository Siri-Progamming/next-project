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

export const NOTES = [
    {
        id: 'MIN',
        value: 0,
        label: '0',
    },
    {
        id: 'MIDDLE',
        value: 5,
        label: '5',
    },
    {
        id: 'MAX',
        value: 10,
        label: '10',
    }
];

export const VOTES = [
    {
        id: '0',
        value: 0,
        label: '0',
    },
    {
        id: '1',
        value: 100,
        label: '100',
    },
    {
        id: '2',
        value: 200,
        label: '200',
    },
    {
        id: '3',
        value: 300,
        label: '300',
    },
    {
        id: '4',
        value: 400,
        label: '400',
    },
    {
        id: '5',
        value: 500,
        label: '500',
    }
];
