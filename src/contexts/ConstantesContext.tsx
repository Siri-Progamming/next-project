import React, {createContext, useContext, useEffect, useState} from "react";
import {fetchMediaGenres} from "../services/IMDB.API/fetch.service";
import {Genre} from "../interfaces/Movie";
import {MEDIA_TYPES} from "../constantes/app_constantes";

interface ConstantesContextProps {
    MOVIE_GENRES: Array<Genre> | [];
    SERIE_GENRES: Array<Genre> | [];
    DISPLAY_LANGUAGE: string;
    setDISPLAY_LANGUAGES: React.Dispatch<React.SetStateAction<string>>;
}
const ConstantesContext = createContext<ConstantesContextProps | undefined>({ MOVIE_GENRES: [], SERIE_GENRES: [], DISPLAY_LANGUAGE: 'fr-FR', setDISPLAY_LANGUAGES: ()     => {}});
export const useConstantes = () => {
    const context = useContext(ConstantesContext);
    if (!context) {
        throw new Error("useConstantes must be used within a ConstantesProvider");
    }
    return context;
};
interface ConstantesProviderProps {
    children: React.ReactNode;
}

export const ConstantesProvider: React.FC<ConstantesProviderProps> = ({ children }) => {
    const [MOVIE_GENRES, setMOVIE_GENRES] = useState([]);
    const [SERIE_GENRES, setSERIE_GENRES] = useState([]);
    const [DISPLAY_LANGUAGE, setDISPLAY_LANGUAGES] = useState('fr-FR');

    const initMovieGenres = async () => {
        const storedGenres = localStorage.getItem('MOVIE_GENRES');
        if(storedGenres === null) {
            await fetchMediaGenres(DISPLAY_LANGUAGE,MEDIA_TYPES.movie).then((data) => {
                console.log("-----------------Fetching MOVIE_GENRES-----------------");
                setMOVIE_GENRES(data);
                localStorage.setItem('MOVIE_GENRES', JSON.stringify(data));
            });
        }else{
            // @ts-ignore
            setMOVIE_GENRES(JSON.parse(storedGenres));
        }
    }

    const initSerieGenres = async () => {
        const storedGenres = localStorage.getItem('SERIE_GENRES');
        if(storedGenres === null) {
            await fetchMediaGenres(DISPLAY_LANGUAGE,MEDIA_TYPES.tv).then((data) => {
                console.log("-----------------Fetching SERIE_GENRES-----------------");
                setSERIE_GENRES(data);
                localStorage.setItem('SERIE_GENRES', JSON.stringify(data));
            });
        }else{
            // @ts-ignore
            setSERIE_GENRES(JSON.parse(storedGenres));
        }
    }

    useEffect(() => {
        if(MOVIE_GENRES.length === 0){
            initMovieGenres().then();
        }
        if(SERIE_GENRES.length === 0){
            initSerieGenres().then();
        }
    }, [DISPLAY_LANGUAGE]);

    useEffect(() => {
        if(MOVIE_GENRES.length > 0){
            // console.log("ConstantesProvider - MOVIE_GENRES : ", MOVIE_GENRES);
        }
    }, [MOVIE_GENRES]);

    useEffect(() => {
        if(SERIE_GENRES.length > 0){
            console.log("ConstantesProvider - SERIE_GENRES : ", SERIE_GENRES);
        }
    }, [SERIE_GENRES]);

    const contextValue = {
        MOVIE_GENRES,
        SERIE_GENRES,
        DISPLAY_LANGUAGE,
        setDISPLAY_LANGUAGES
    };

    return (
        <ConstantesContext.Provider value={contextValue}>
            {children}
        </ConstantesContext.Provider>
    );
};
