import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MediaCard from "../Cards/MediaCard";
import { createMovie } from "../../services/API/object.creator.service";
import {getMoviesSearch,getMoviesLiked} from "../../services/API/call.api.service";
import Loader from "../utils/Loader";
import {useAuth} from "../../contexts/AuthContext";
import {useConstantes} from "../../contexts/ConstantesContext";

interface VerticalListShowcase {
    api: string;
    title: string;
    searchQuery?: string;
}
const VerticalListShowcase: React.FC<VerticalListShowcase> = ({api, title, searchQuery}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [resultsNb, setResultsNb] = useState<number>(0);
    const [pagesNb, setPagesNb] = useState<number>(0);
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {user} = useAuth();
    const {DISPLAY_LANGUAGE} = useConstantes();
    const urlApi = api+searchQuery

    const initMovies = async () => {
        const results = await getMoviesSearch(urlApi);
        const items = results.results;
        if (items && items.length > 0) {
            setIsSearchEmpty(false);
            setPagesNb(results.total_pages);
            setResultsNb(results.total_results);
            let tempMovies: Array<Movie> = [];
            for(const item of items) {
                tempMovies.push(createMovie(item))
            }
            setMovies(tempMovies);
        }else{
            setIsSearchEmpty(true);
        }
    }

    const initFavoriteMovies = async () => {
        // console.log("calling getMoviesLiked with user id : ",user?.id!);
        const results = await getMoviesLiked(DISPLAY_LANGUAGE,user?.id!);
        // console.log("initFavoriteMovies - results : ",results);
        if(results && results.length > 0){
            let tempMovies: Array<Movie> = [];
            for(const result of results) {
                tempMovies.push(createMovie(result))
            }
            setMovies(tempMovies);
        }
    }

    useEffect(() => {
        if(!api.includes("likes")){
            initMovies().then();
        }else {
            // console.log("VerticalListShowcase - useEffect - initFavoriteMovies");
            initFavoriteMovies().then();
        }

    }, []);

    //Pour re-render le composant à chaque changement de la query
    useEffect(() => {
        if(!api.includes("likes")) {
            initMovies().then();
        }
    }, [searchQuery]);

    useEffect(() => {
        if(movies.length > 0){
            setIsLoading(false);
            setIsSearchEmpty(false);
        }else if(movies.length === 0 && isSearchEmpty){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [movies]);

    return (
        <>
        {
            isLoading ?
                <div className="flex justify-center items-center h-screen"><Loader/></div>
                    : isSearchEmpty ?
                        <div className="flex justify-center items-center h-screen mt-[10vh]">La recherche n'a retourné aucun résultat :-(</div>
                        :
                        <div className="category_movies mt-[10vh]">
                    <h1 className="category_title">{title}</h1>
                    <ul id="vertical-list-showcase" className="">
                        {movies.map(movie => (
                            <MediaCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                </div>
        }
        </>
    );
}
export default VerticalListShowcase;
