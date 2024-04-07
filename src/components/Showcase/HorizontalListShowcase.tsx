import React, {useEffect, useState} from "react";
import {ApiConfigService} from "../../services/API/config.service";
import {Movie} from '../../interfaces/Movie';
import {Serie} from '../../interfaces/Serie';
import MediaCard from "../Cards/MediaCard";
import {createMovie, createSerie} from "../../services/API/object.creator.service";
import {getMovies} from "../../services/API/call.api.service";
import {useConstantes} from "../../contexts/ConstantesContext";
import Switch from "../Forms/Filters/Switch";
import {useAuth} from "../../contexts/AuthContext";

interface HorizontalListShowcaseProps {
    type: string;
    title: string;
}

const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({type,title}) => {
    const {user} = useAuth();
    const [api, setApi] = useState<string>("");
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [series, setSeries] = useState<Array<Serie>>([]);
    const [elementToDisplay, setElementToDisplay] = useState<number>(0); // 0 for movies, 1 for series
    const [isListEmpty, setIsListEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isUserRecommandation = (type === "recommended");
    const {DISPLAY_LANGUAGE} = useConstantes();

    const initMovies = async (api:string) => {
        const moviesDiscover = await getMovies(DISPLAY_LANGUAGE, api);
        if (moviesDiscover && moviesDiscover.length > 0) {
            setIsListEmpty(false);
            let tempMovies: Array<Movie> = [];
            for (const m of moviesDiscover) {
                tempMovies.push(createMovie(m));
            }
            setMovies(tempMovies);
        }else{
            setIsListEmpty(true);
        }
    }
    const initSeries = async (api:string) => {
        const series = await getMovies(DISPLAY_LANGUAGE, api);
        if (series && series.length > 0) {
            setIsListEmpty(false);
            let tempSeries: Array<Serie> = [];
            for (const s of series) {
                tempSeries.push(createSerie(s));
            }
            setSeries(tempSeries);
        }else{
            setIsListEmpty(true);
        }
    }

    const selectApi = () => {
        if(elementToDisplay === 0) {
            switch (type) {
                case "trending":
                    setApi(ApiConfigService.fennext.urls.movie_trending);
                    break;
                case "toprated":
                    setApi(ApiConfigService.fennext.urls.movie_toprated);
                    break;
                case "recommended":
                    setApi(ApiConfigService.fennext.urls.movie_user_recommanded.replace("{user_id}", user?.id!));
                    break;
            }
        }
        else if(elementToDisplay === 1) {
            switch (type) {
                case "trending":
                    setApi(ApiConfigService.fennext.urls.serie_trending);
                    break;
                case "toprated":
                    setApi(ApiConfigService.fennext.urls.serie_toprated);
                    break;
                case "recommended":
                    setApi(ApiConfigService.fennext.urls.serie_user_recommanded.replace("{id_user}", user?.id!));
                    break;
            }
        }
    }

    useEffect(() => {
        selectApi();
    }, []);

useEffect(() => {
    if(api !== ""){
        console.log("API ENDPOINT : ",api);
        if(elementToDisplay === 0){
            if(movies.length > 0){
                console.log("Already Set Movies, refreshing...");
                setMovies(movies);
            }else{
                console.log("Movies Empty, calling API...");
                initMovies(api).then();
            }
        }else if(elementToDisplay === 1){
            if(series.length > 0) {
                console.log("Already Set Series, refreshing...");
                setSeries(series);
            }else{
                console.log("Series Empty, calling API...");
                initSeries(api).then();
            }
        }
    }
}, [api]);

    useEffect(() => {
        selectApi();
    }, [elementToDisplay]);

    useEffect(() => {
        if (movies.length > 0 || movies.length === 0 && isListEmpty) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [movies, isListEmpty]);

    useEffect(() => {
        if (series.length > 0 || series.length === 0 && isListEmpty) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [series, isListEmpty]);

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

    const handleSwitchElement = (element: string) => {
        setElementToDisplay(element === "Films" ? 0 : 1);
    }
    return (
        <div className="flex flex-col">
            <div className="divider after:bg-accent-500 after:bg-opacity-50 after:h-[4px] divider-start "><h1 className="category_title min-w-full sm:min-w-fit">{title}</h1></div>
            {(isUserRecommandation && !isLoading && isListEmpty) &&
                <p>Nous n'avons pas assez d'informations pour vous proposer des recommandations personnalisées.</p>}
            {(isUserRecommandation && isLoading && !isListEmpty) &&
                <p>Chargement de vos recommandations personnalisées...</p>}
            <Switch elements={["Films","Séries"]} onSelect={handleSwitchElement}/>
            <div className="relative">
                <ul id="movies-horizontal-showcase"
                    className="flex space-x-4 pb-5 pl-4 pr-4 horizontal-fading">
                    {((elementToDisplay === 0 && movies.length > 0)) && showMovies(movies)}
                    {(elementToDisplay === 1 && series.length > 0) && showSeries(series)}
                </ul>
            </div>
        </div>
    );
}

function showMovies(movies:Array<Movie>){
    return (
        movies.map(movie => (
                <MediaCard key={movie.id} type={0} id={movie.id} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} poster_path={movie.poster_path}/>
            ))
    )
}
function showSeries(series:Array<Serie>){
    return (
        series.map(serie => (
            <MediaCard key={serie.id} type={1} id={serie.id} title={serie.title} release_date={serie.release_date} vote_average={serie.vote_average} poster_path={serie.poster_path}/>
        ))
    )
}
export default HorizontalListShowcase;
