import React, {createContext, SyntheticEvent, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useConstantes} from "./ConstantesContext";
import {SerieFilterFormInfos} from "../interfaces/Forms";

interface MovieFilterContextProps {
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
const MovieFilterContext = createContext<MovieFilterContextProps | undefined>(undefined);
export const useMovieFilter = () => {
    const context = useContext(MovieFilterContext);
    if (!context) {
        throw new Error("useMoviefilter must be used within a MovieFilterProvider");
    }
    return context;
};
interface MovieFilterProviderProps{
    children: React.ReactNode;
}
// Fournisseur de contexte de recherche par nom
export const MovieFilterProvider: React.FC<MovieFilterProviderProps> = ({ children }) => {
    const router = useRouter();
    const {DISPLAY_LANGUAGE, MOVIE_GENRES} = useConstantes();
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
        if (previousLocation && previousLocation === '/ui/movies/search'){
            const lastMovieFilterSearch = localStorage.getItem('lastMovieFilterSearch');
            if (lastMovieFilterSearch && lastMovieFilterSearch !== '') {
                let lastSearch:SerieFilterFormInfos = JSON.parse(lastMovieFilterSearch);
                if(lastSearch.query !== ''){
                    setQueryData(JSON.parse(lastMovieFilterSearch));
                }
            }
        }
    }, []);

    useEffect(() => {
        // console.log("MovieFilterContext - Genres : ", genres);
    }, [queryData.genres]);

    useEffect(() => {
        if(queryData.query !== ''){
            localStorage.setItem('lastMovieFilterSearch',  JSON.stringify(queryData));
        }
    }, [queryData]);

    useEffect(() => {
        if(queryData.query !== ''){
            setQueryData({...queryData, query: generateMovieFilterQueryParams(queryData, MOVIE_GENRES)});
        }
    }, [queryData.activePage]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newSearchQueryData = {...queryData, nbPages: 1, nbResults: 0, activePage: 1};
        const queryParams = generateMovieFilterQueryParams(newSearchQueryData, MOVIE_GENRES);
        setQueryData({...newSearchQueryData, query: queryParams});
        router.push('/ui/movies/search').then(() => {
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
};
    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log("MovieFilterContext - Language Selected : ", e.target.value);
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
            // console.log("MovieFilterContext - Genre Selected : ", genreId);
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
        <MovieFilterContext.Provider value={contextValue}>
            {children}
        </MovieFilterContext.Provider>
    );
};

function generateMovieFilterQueryParams(queryData:SerieFilterFormInfos, MOVIE_GENRES: any[]){
    // let queryParams = `?language=${language}&sort_by=${sortBy}&vote_average.gte=${noteMin}&vote_average.lte=${noteMax}&vote_count.gte=${nbVotesMin}&page=${activePage}`;
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
        queryParams += `&with_genres=${MOVIE_GENRES.map((genre) => genre.id).join('|')}`;
    }
    return queryParams;
}
