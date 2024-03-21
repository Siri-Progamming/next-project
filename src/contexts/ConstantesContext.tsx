import React, {createContext, useContext, useEffect, useState} from "react";
import { fetchMoviesGenres } from "../services/IMDB.API/fetch.service";
import {Genre} from "../interfaces/Movie";

interface ConstantesContextProps {
    MOVIE_GENRES: Array<Genre> | [];
    DISPLAY_LANGUAGE: string;
    setDISPLAY_LANGUAGES: React.Dispatch<React.SetStateAction<string>>;
}
const ConstantesContext = createContext<ConstantesContextProps | undefined>({ MOVIE_GENRES: [], DISPLAY_LANGUAGE: 'fr-FR', setDISPLAY_LANGUAGES: ()     => {}});
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
    const [DISPLAY_LANGUAGE, setDISPLAY_LANGUAGES] = useState('fr-FR');

    useEffect(() => {
        if(MOVIE_GENRES.length === 0){
            const storedGenres = localStorage.getItem('MOVIE_GENRES');
            if(storedGenres === null) {
                fetchMoviesGenres(DISPLAY_LANGUAGE).then((data) => {
                    console.log("-----------------Fetching MOVIE_GENRES-----------------");
                    setMOVIE_GENRES(data);
                    localStorage.setItem('MOVIE_GENRES', JSON.stringify(data));
                });
            }else{
                // @ts-ignore
                setMOVIE_GENRES(JSON.parse(storedGenres));
            }
        }
    }, [DISPLAY_LANGUAGE]);

    useEffect(() => {
        if(MOVIE_GENRES.length > 0){
            // console.log("ConstantesProvider - MOVIE_GENRES : ", MOVIE_GENRES);
        }
    }, [MOVIE_GENRES]);

    const contextValue = {
        MOVIE_GENRES,
        DISPLAY_LANGUAGE,
        setDISPLAY_LANGUAGES
    };

    return (
        <ConstantesContext.Provider value={contextValue}>
            {children}
        </ConstantesContext.Provider>
    );
};
