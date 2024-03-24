import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MovieItem from "../MovieItem";
import { createMovie } from "../../services/API/object.creator.service";
import {getMoviesSearch} from "../../services/API/call.api.service";
import Loader from "../utils/Loader";
interface VerticalListShowcase {
    api: string;
    title: string;
    searchQuery: string;
}
const VerticalListShowcase: React.FC<VerticalListShowcase> = ({api, title, searchQuery}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [resultsNb, setResultsNb] = useState<number>(0);
    const [pagesNb, setPagesNb] = useState<number>(0);
    const urlApi = api+"?query="+searchQuery+"&language=fr-FR";
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const initMovies = async () => {
        const results = await getMoviesSearch(urlApi);
        const items = results.results;
        if (items.length > 0) {
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

    useEffect(() => {
        initMovies();
    }, []);

    //Pour re-render le composant à chaque changement de la query
    useEffect(() => {
        initMovies();
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
                        <div className="flex justify-center items-center h-screen">La recherche n'a retourné aucun résultat :-(</div>
                        :
                        <div className="category_movies">
                    <h1 className="category_title">{title}</h1>
                    <ul id="vertical-list-showcase" className="">
                        {movies.map(movie => (
                            <MovieItem key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                </div>
        }
        </>
    );
}
export default VerticalListShowcase;
