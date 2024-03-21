import React, {createContext, useContext, useState} from "react";
import {useRouter} from "next/router";
interface MovieFilterContextProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;

    genres: number[];
    setGenres: React.Dispatch<React.SetStateAction<number[]>>;

    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;

    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;

    noteMin: number;
    setNoteMin: React.Dispatch<React.SetStateAction<number>>;

    noteMax: number;
    setNoteMax: React.Dispatch<React.SetStateAction<number>>;

    nbVotesMin: number;
    setNbVotesMin: React.Dispatch<React.SetStateAction<number>>;

    nbPages: number;
    setNbPages: React.Dispatch<React.SetStateAction<number>>;

    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;

    handleChangeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeNoteMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeNoteMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeNbVotesMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectGenre: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    const [query, setQuery] = useState<string>('');
    const [genres, setGenres] = useState<number[]>([]);
    const [language, setLanguage] = useState<string>('en-US');
    const [sortBy, setSortBy] = useState<string>('popularity.desc');
    const [noteMin, setNoteMin] = useState<number>(0);
    const [noteMax, setNoteMax] = useState<number>(10);
    const [nbVotesMin, setNbVotesMin] = useState<number>(0);
    const [nbPages, setNbPages] = useState<number>(1);
    const [activePage, setActivePage] = useState<number>(1);


    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const queryParams = generateMovieFilterQueryParams(language, sortBy, noteMin, noteMax, nbVotesMin, genres, activePage);
        setQuery(queryParams);
        // console.log("MovieFilterContext - Query Params : ", queryParams);
        router.push('/ui/movies/search').then(() => {
            // setQuery('');
        });
        // if(query !== '' && query.trim().length > 0){
        //     router.push('/ui/movies/nameSearch?query='+query).then(() => {
        //         setQuery('');
        //     });
        }
    const handleReset = () => {
    setGenres([]);
    setLanguage('en-US');
    setSortBy('popularity.desc');
    setNoteMin(0);
    setNoteMax(10);
    setNbVotesMin(0);
    //TODO uncheck les boxes, reset les inputs
};

    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("MovieFilterContext - Language Selected : ", e.target.value);
        setLanguage(e.target.value);
    }
    const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    }
    const handleChangeNoteMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteMin(Number(e.target.value));
    }
    const handleChangeNoteMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteMax(Number(e.target.value));
    }
    const handleChangeNbVotesMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNbVotesMin(Number(e.target.value));
    }

    const handleSelectGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        const genreId = Number(e.target.value);
        if (e.target.checked) {
            setGenres([...genres, genreId]);
        } else {
            setGenres(genres.filter((id) => id !== genreId));
        }
    }

    // Valeurs fournies par le contexte
    const contextValue = {
        query,
        setQuery,
        genres,
        setGenres,
        language,
        setLanguage,
        sortBy,
        setSortBy,
        noteMin,
        setNoteMin,
        noteMax,
        setNoteMax,
        nbVotesMin,
        setNbVotesMin,
        nbPages,
        setNbPages,
        activePage,
        setActivePage,
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

function generateMovieFilterQueryParams(language: string, sortBy: string, noteMin: number, noteMax: number, nbVotesMin: number, genres: number[], activePage: number) {
    // let queryParams = `?language=${language}&sort_by=${sortBy}&vote_average.gte=${noteMin}&vote_average.lte=${noteMax}&vote_count.gte=${nbVotesMin}&page=${activePage}`;
    let queryParams = '?include_adult=false';
    //TODO pas oublier ?include_adult=false
    if (language !== 'en-US') {
        queryParams += `&language=${language}`;
    }else{
        queryParams += `&language=en-US`;
    }
    if(activePage > 1){
        queryParams += `&page=${activePage}`;
    }else{
        queryParams += `&page=1`;
    }
    if (sortBy !== 'popularity.desc') {
        queryParams += `&sort_by=${sortBy}`;
    }else {
        queryParams += `&sort_by=popularity.desc`;
    }
    if(noteMax < 10 && noteMax >= noteMin && noteMax >= 0){
        queryParams += `&vote_average.lte=${noteMax}`;
    }else{
        queryParams += `&vote_average.lte=10`;
    }
    if(noteMin > 0 && noteMin <= noteMax && noteMin <= 10) {
        queryParams += `&vote_average.gte=${noteMin}`;
    }   else{
        queryParams += `&vote_average.gte=0`;
    }
    if(nbVotesMin > 0) {
        queryParams += `&vote_count.gte=${nbVotesMin}`;
    }else{
        queryParams += `&vote_count.gte=0`;
    }
    if(genres.length > 0) {
        queryParams += `&with_genres=${genres.join(',')}`;
    }
    return queryParams;
}