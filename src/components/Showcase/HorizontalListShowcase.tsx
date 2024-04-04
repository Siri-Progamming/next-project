import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MediaCard from "../Cards/MediaCard";
import {createMovie} from "../../services/API/object.creator.service";
import {getMovies} from "../../services/API/call.api.service";

interface HorizontalListShowcaseProps {
    api: string;
    title: string;
}

const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({api, title}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isListEmpty, setIsListEmpty] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isUserRecommandation = api.includes("recommanded");

    const initMovies = async () => {
        const moviesDiscover = await getMovies(api);
        if (moviesDiscover && moviesDiscover.length > 0) {
            setIsListEmpty(false);
            let tempMovies: Array<Movie> = [];
            for (const m of moviesDiscover) {
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
        initMovies().then();
    }, []);

    useEffect(() => {
        if (movies || (movies && isListEmpty)) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [movies]);

    return (

        <div className="category_movies">
            <h1 className="category_title">{title}</h1>
            {(isUserRecommandation && !isLoading && isListEmpty) &&
                <p>Nous n'avons pas assez d'informations pour vous proposer des recommandations personnalisées.</p>}
            <ul id="movies-horizontal-showcase" className="flex space-x-4 pb-5">
                {movies.map(movie => (
                    <MediaCard key={movie.id} movie={movie}/>
                ))}
            </ul>
        </div>
    );
}
export default HorizontalListShowcase;
