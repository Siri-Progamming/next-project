import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MovieItem from "../MovieItem";
import { createMovie } from "../../services/API/object.creator.service";
import {getMovie, getMoviesSearch} from "../../services/API/call.api.service";
interface VerticalListShowcase {
    api: string;
    title: string;
    searchQuery: string;
}
const VerticalListShowcase: React.FC<VerticalListShowcase> = ({api, title, searchQuery}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [resultsNb, setResultsNb] = useState<number>(0);
    const [pagesNb, setPagesNb] = useState<number>(0);
    const urlApi = api+"?query="+searchQuery;

    const initMovies = async () => {
        const results = await getMoviesSearch(urlApi);
        // console.log("VerticalListShowcase - Results : ", results);
        const items = results.results;
        if (items.length > 0) {
            setPagesNb(results.total_pages);
            setResultsNb(results.total_results);
            // console.log("VerticalListShowcase - Pages : ", results.total_pages, " - Results : ", results.total_results);
            let tempMovies: Array<Movie> = [];
            for(const item of items) {
                // const movie = await getMovie(item.id);
                // if (movie) {
                //     tempMovies.push(createMovie(movie));
                // }
                tempMovies.push(createMovie(item))
            }
            setMovies(tempMovies);
            // console.log("VerticalListShowcase - Movies : ", tempMovies);
        }
    }

    useEffect(() => {
        // console.log("VerticalListShowcase - To nameSearch : ", searchQuery);
        initMovies();
    }, []);

    useEffect(() => {
        // console.log("VerticalListShowcase - To nameSearch : ", searchQuery);
        initMovies();
    }, [searchQuery]);

    return (
        <div className="category_movies">
            <h1 className="category_title">{title}</h1>
            <ul id="vertical-list-showcase" className="">
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie}/>
                ))}
            </ul>
        </div>
    );
}
export default VerticalListShowcase;
