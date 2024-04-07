import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MediaCard from "../Cards/MediaCard";
import {createMovie} from "../../services/API/object.creator.service";
import {getMovies} from "../../services/API/call.api.service";
import {useConstantes} from "../../contexts/ConstantesContext";

interface HorizontalListShowcaseProps {
    api: string;
    title: string;
}

const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({api, title}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isListEmpty, setIsListEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isUserRecommandation = api.includes("recommanded");
    const {DISPLAY_LANGUAGE} = useConstantes();

    const initMovies = async () => {
        const moviesDiscover = await getMovies(DISPLAY_LANGUAGE, api);
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
        }else{
            setIsListEmpty(true);
        }
    }
    useEffect(() => {
        initMovies().then();
    }, []);

    useEffect(() => {
        if (movies.length > 0 || movies.length === 0 && isListEmpty) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [movies, isListEmpty]);

    useEffect(() => {
        if(isUserRecommandation){
            console.log("HorizontalListShowcase - isListEmpty : ", isListEmpty);
        }
    }, [isListEmpty]);

    useEffect(() => {
        if(isUserRecommandation){
            console.log("HorizontalListShowcase - isLoading : ", isLoading);
        }
    }, [isLoading]);
    return (
        <div className="flex flex-col">
            <div className="divider after:bg-accent-500 after:bg-opacity-50 after:h-[4px] divider-start "><h1 className="category_title min-w-full sm:min-w-fit">{title}</h1></div>
            {(isUserRecommandation && !isLoading && isListEmpty) &&
                <p>Nous n'avons pas assez d'informations pour vous proposer des recommandations personnalisées.</p>}
            {(isUserRecommandation && isLoading && !isListEmpty) &&
                <p>Chargement de vos recommandations personnalisées...</p>}
            <div className="relative">
                <ul id="movies-horizontal-showcase"
                    className="flex space-x-4 pb-5 pl-4 pr-4 horizontal-fading">
                    {movies.map(movie => (
                        <MediaCard key={movie.id} movie={movie}/>
                    ))}
                </ul>
            </div>

        </div>
    );
}
export default HorizontalListShowcase;
