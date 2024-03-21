import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MovieItem from "../MovieItem";
import { createMovie } from "../../services/API/object.creator.service";
import {getMovies, getMovie} from "../../services/API/call.api.service";
interface HorizontalListShowcaseProps {
    api: string;
    title: string;
}
const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({api, title}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);

    const initMovies = async () => {
        const moviesDiscover = await getMovies(api);
        if (moviesDiscover.length > 0) {
            let tempMovies: Array<Movie> = [];
            for(const m of moviesDiscover) {
                // const movie = await getMovie(m.id);
                // if (movie) {
                //     tempMovies.push(createMovie(movie));
                // }
                tempMovies.push(createMovie(m));
            }
            setMovies(tempMovies);
        }
    }

    useEffect(() => {
        initMovies();
    }, []);

    return (
        <div className="category_movies">
            <h1 className="category_title">{title}</h1>
            <ul id="movies-list" className="flex space-x-4">
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie}/>
                ))}
            </ul>
        </div>
    );
}
export default HorizontalListShowcase;
