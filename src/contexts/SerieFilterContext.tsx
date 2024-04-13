import React, {createContext, SyntheticEvent, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useConstantes} from "./ConstantesContext";
import {SerieFilterFormInfos} from "../interfaces/Forms";

interface SerieFilterContextProps {
    queryData: SerieFilterFormInfos
    setQueryData: React.Dispatch<React.SetStateAction<SerieFilterFormInfos>>;

    handleChangeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeNoteMin: (event: SyntheticEvent<Element, Event>, value: number | null) => void;
    handleChangeNoteMax: (event: Event, value: number | number[], activeThumb: number) => void;
    handleChangeNbVotesMin: (event: Event, value: number | number[], activeThumb: number) => void;
    handleSelectGenre: (e: React.MouseEvent<HTMLButtonElement>, genreId:number) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleReset: () => void;
}
const SerieFilterContext = createContext<SerieFilterContextProps | undefined>(undefined);
export const useSerieFilter = () => {
    const context = useContext(SerieFilterContext);
    if (!context) {
        throw new Error("useSeriefilter must be used within a MovieFilterProvider");
    }
    return context;
};
interface SerieFilterProviderProps{
    children: React.ReactNode;
}
// Fournisseur de contexte de recherche par nom
export const SerieFilterProvider: React.FC<SerieFilterProviderProps> = ({ children }) => {
    const router = useRouter();
    const {DISPLAY_LANGUAGE, SERIE_GENRES} = useConstantes();
    const [queryData, setQueryData] = useState<SerieFilterFormInfos>({
        query: '',
        language: DISPLAY_LANGUAGE,
        sortBy: 'popularity.desc',
        noteMin: 8,
        noteMax: 10,
        nbVotesMin: 100,
        genres: [],
        nbPages: 1,
        nbResults: 0,
        activePage: 1
    });

    useEffect(() => {
        const previousLocation = localStorage.getItem('previousLocation');
        if (previousLocation && previousLocation === '/ui/series/search'){
            const lastSerieFilterSearch = localStorage.getItem('lastSerieFilterSearch');
            if (lastSerieFilterSearch && lastSerieFilterSearch !== '') {
                let lastSearch:SerieFilterFormInfos = JSON.parse(lastSerieFilterSearch);
                if(lastSearch.query !== ''){
                    setQueryData(JSON.parse(lastSerieFilterSearch));
                }
            }
        }
    }, []);

    useEffect(() => {
        // console.log("SerieFilterContext - Genres : ", genres);
    }, [queryData.genres]);

    useEffect(() => {
        if(queryData.query !== ''){
            localStorage.setItem('lastSerieFilterSearch', JSON.stringify(queryData));
        }
    }, [queryData]);

    useEffect(() => {
        if(queryData.query !== ''){
            setQueryData({...queryData, query: generateSerieFilterQueryParams(queryData, SERIE_GENRES)});
        }
    }, [queryData.activePage]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newSearchQueryData = {...queryData, nbPages: 1, nbResults: 0, activePage: 1};
        const queryParams = generateSerieFilterQueryParams(newSearchQueryData, SERIE_GENRES);
        setQueryData({...newSearchQueryData, query: queryParams});
        //TODO Ajouter au localstorage en cas de refresh
        // console.log("MovieFilterContext - Query Params : ", queryParams);
        router.push('/ui/series/search').then(() => {
            // setQuery('');
        });
    }
    const handleReset = () => {
        setQueryData({...queryData,
            query: '',
            language: DISPLAY_LANGUAGE,
            sortBy: 'popularity.desc',
            noteMin: 8,
            noteMax: 10,
            nbVotesMin: 100,
            genres: [],
            nbPages: 1,
            nbResults: 0
        });
    }
    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log("SerieFilterContext - Language Selected : ", e.target.value);
        setQueryData({...queryData, language: e.target.value});
    }
    const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setQueryData({...queryData, sortBy: e.target.value});
    }
    const handleChangeNoteMin =(e: SyntheticEvent<Element, Event>, value: number | null) => {
        e.preventDefault();
        setQueryData({...queryData, noteMin: Number(value)});
    }
    const handleChangeNoteMax = (e: Event, value: number | number[], activeThumb: number) => {
        e.preventDefault();
        setQueryData({...queryData, noteMax: Number(value)});
    }
    const handleChangeNbVotesMin = (e: Event, value: number | number[], activeThumb: number) => {
        e.preventDefault();
        setQueryData({...queryData, nbVotesMin: Number(value)});
    }
    const handleSelectGenre = (e: React.MouseEvent<HTMLButtonElement>, genreId:number) => {
        e.preventDefault();
        const isActive = e.currentTarget.classList.contains('selected');
        if (!isActive) {
            e.currentTarget.classList.add('selected');
            setQueryData({...queryData, genres: [...queryData.genres, genreId]});
            // console.log("SerieFilterContext - Genre Selected : ", genreId);
        } else {
            e.currentTarget.classList.remove('selected');
            setQueryData({...queryData, genres: queryData.genres.filter((id) => id !== genreId)});
        }
    }

    // Valeurs fournies par le contexte
    const contextValue = {
        queryData,
        setQueryData,
        handleChangeLanguage,
        handleChangeSortBy,
        handleChangeNoteMin,
        handleChangeNoteMax,
        handleChangeNbVotesMin,
        handleSelectGenre,
        handleSubmit,
        handleReset
    };

    // Fournir les valeurs du contexte aux composants enfants
    return (
        <SerieFilterContext.Provider value={contextValue}>
            {children}
        </SerieFilterContext.Provider>
    );
};

export function generateSerieFilterQueryParams(queryData:SerieFilterFormInfos, SERIE_GENRES:any[]){
    let queryParams = '?include_adult=false';
    if (queryData.language !== 'en-US') {
        queryParams += `&language=${queryData.language}`;
    }else{
        queryParams += `&language=en-US`;
    }
    if(queryData.activePage >= 1 && queryData.activePage <= queryData.nbPages){
        queryParams += `&page=${queryData.activePage}`;
    }else{
        queryParams += `&page=1`;
    }
    if (queryData.sortBy !== 'popularity.desc') {
        queryParams += `&sort_by=${queryData.sortBy}`;
    }else {
        queryParams += `&sort_by=popularity.desc`;
    }
    if(queryData.noteMax < 10 && queryData.noteMax >= queryData.noteMin && queryData.noteMax >= 0){
        queryParams += `&vote_average.lte=${queryData.noteMax}`;
    }else{
        queryParams += `&vote_average.lte=10`;
    }
    if(queryData.noteMin > 0 && queryData.noteMin <= queryData.noteMax && queryData.noteMin <= 10) {
        queryParams += `&vote_average.gte=${queryData.noteMin}`;
    }   else{
        queryParams += `&vote_average.gte=0`;
    }
    if(queryData.nbVotesMin > 0) {
        queryParams += `&vote_count.gte=${queryData.nbVotesMin}`;
    }else{
        queryParams += `&vote_count.gte=0`;
    }
    if(queryData.genres.length > 0) {
        queryParams += `&with_genres=${queryData.genres.join(',')}`;
    }else{
        queryParams += `&with_genres=${SERIE_GENRES.map((genre) => genre.id).join('|')}`;
    }
    return queryParams;
}
