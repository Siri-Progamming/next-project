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

const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({type, title}) => {
    const {user} = useAuth();
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [series, setSeries] = useState<Array<Serie>>([]);
    const [elementToDisplay, setElementToDisplay] = useState<number>(0); // 0 for movies, 1 for series
    const [isMovieListEmpty, setIsMovieListEmpty] = useState<boolean>(false);
    const [isSerieListEmpty, setIsSerieListEmpty] = useState<boolean>(false);
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(true);
    const [isSerieLoading, setIsSerieLoading] = useState<boolean>(true);
    const isUserRecommandation = (type === "recommended");
    const {DISPLAY_LANGUAGE} = useConstantes();
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

    const initMovies = async () => {
        const api = selectApi(0);
        const moviesDiscover = await getMovies(DISPLAY_LANGUAGE, api!);
        if (moviesDiscover && moviesDiscover.length > 0) {
            setIsMovieListEmpty(false);
            let tempMovies: Array<Movie> = [];
            for (const m of moviesDiscover) {
                tempMovies.push(createMovie(m));
            }
            setIsFirstLoad(false);
            setMovies(tempMovies);
        } else {
            setIsMovieListEmpty(true);
        }
    }
    const initSeries = async () => {
        const api = selectApi(1);
        const series = await getMovies(DISPLAY_LANGUAGE, api!);
        if (series && series.length > 0) {
            setIsSerieListEmpty(false);
            let tempSeries: Array<Serie> = [];
            for (const s of series) {
                tempSeries.push(createSerie(s));
            }
            setSeries(tempSeries);
        } else {
            setIsSerieListEmpty(true);
        }
    }
    const selectApi = (element?: number) => {
        if (element === 0) {
            switch (type) {
                case "trending":
                    return ApiConfigService.fennext.urls.movie_trending;
                case "toprated":
                    return ApiConfigService.fennext.urls.movie_toprated;
                case "recommended":
                    return ApiConfigService.fennext.urls.movie_user_recommanded.replace("{user_id}", user?.id!);
            }
        } else if (element === 1) {
            switch (type) {
                case "trending":
                    return ApiConfigService.fennext.urls.serie_trending;
                case "toprated":
                    return ApiConfigService.fennext.urls.serie_toprated;
                case "recommended":
                    return ApiConfigService.fennext.urls.serie_user_recommanded.replace("{id_user}", user?.id!);
            }
        }
    }

    useEffect(() => {
        if(movies.length === 0){
            initMovies().then();
        }
        if(series.length === 0){
            initSeries().then();
        }
    }, []);

    useEffect(() => {
        if(!isFirstLoad) {
            if (elementToDisplay === 0) {
                if (movies.length > 0) {
                    console.log("Already Set Movies, refreshing... - " + type);
                    setMovies(movies);
                } else {
                    console.log("Movies Empty, calling API... - " + type);
                    initMovies().then();
                }
                if (series.length > 0) {
                    console.log("Already Set Series, refreshing... - " + type);
                    console.log("Series : ", series);
                    setSeries(series);
                } else {
                    console.log("Series Empty, calling API... - " + type);
                    initSeries().then();
                }
            }
        }
}, [elementToDisplay]);

useEffect(() => {
    if (movies.length > 0 || movies.length === 0 && isMovieListEmpty) {
        setIsMovieLoading(false);
    } else {
        setIsMovieLoading(true);
    }
}, [movies, isMovieListEmpty]);

useEffect(() => {
    if (series.length > 0 || series.length === 0 && isSerieListEmpty) {
        setIsSerieLoading(false);
    } else {
        setIsSerieLoading(true);
    }
}, [series, isSerieListEmpty]);

useEffect(() => {
    if (isUserRecommandation) {
        console.log("HorizontalListShowcase - isMovieListEmpty : "+ isMovieListEmpty+ " - isSerieListEmpty : "+ isSerieListEmpty);
    }
}, [isMovieListEmpty, isSerieListEmpty]);

useEffect(() => {
    if (isUserRecommandation) {
        console.log("HorizontalListShowcase - isMovieLoading : "+isMovieLoading+ " - isSerieLoading : "+isSerieLoading);
    }
}, [isMovieLoading, isSerieLoading]);

const handleSwitchElement = (element: string) => {
    setElementToDisplay(element === "Films" ? 0 : 1);
}
return (
    <div className="flex flex-col">
        <div className="divider after:bg-accent-500 after:bg-opacity-50 after:h-[4px] divider-start "><h1
            className="category_title min-w-full sm:min-w-fit">{title}</h1></div>
        <Switch elements={["Films", "Séries"]} onSelect={handleSwitchElement}/>
        {(isUserRecommandation && elementToDisplay === 0) && isMovieListEmpty ?
            <p>Nous n'avons pas assez d'informations pour vous proposer des recommandations de films personnalisées.</p>
            :
            isMovieLoading && <p>Chargement de vos recommandations de films personnalisées...</p>}
        {(isUserRecommandation && elementToDisplay === 1) && isSerieListEmpty ?
            <p>Nous n'avons pas assez d'informations pour vous proposer des recommandations de séries personnalisées.</p>
            :
            (isUserRecommandation && elementToDisplay === 1) && isSerieLoading && <p>Chargement de vos recommandations de séries personnalisées...</p>}
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

function showMovies(movies: Array<Movie>) {
    return (
        movies.map(movie => (
            <MediaCard key={movie.id} type={0} id={movie.id} title={movie.title} release_date={movie.release_date}
                       vote_average={movie.vote_average} poster_path={movie.poster_path}/>
        ))
    )
}

function showSeries(series: Array<Serie>) {
    return (
        series.map(serie => (
            <MediaCard key={serie.id} type={1} id={serie.id} title={serie.title} release_date={serie.release_date}
                       vote_average={serie.vote_average} poster_path={serie.poster_path}/>
        ))
    )
}

export default HorizontalListShowcase;
