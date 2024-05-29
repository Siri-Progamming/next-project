import React, {useEffect, useState} from "react";
import {ApiConfigService} from "../../services/API/config.service";
import MediaCard from "../Cards/MediaCard";
import {createMediaCardPropsFromMovie, createMediaCardPropsFromSerie} from "../../services/API/object.creator.service";
import {getMedias} from "../../services/API/call.api.service";
import {useConstantes} from "../../contexts/ConstantesContext";
import {MEDIA_TYPES} from "../../constantes/app_constantes";
import Switch from "../Forms/Filters/Switch";
import {useAuth} from "../../contexts/AuthContext";
import {MediaCardProps, MediaHorizontalDisplayState} from "../../interfaces/UI";

interface HorizontalListShowcaseProps {
    type: string;
    title: string;
}

const HorizontalListShowcase: React.FC<HorizontalListShowcaseProps> = ({type, title}) => {
    const {user} = useAuth();
    const {DISPLAY_LANGUAGE} = useConstantes();
    const [elementToDisplay, setElementToDisplay] = useState<number>(0); // 0 for movies, 1 for series
    const isUserRecommandation = (type === "recommended");

    const [mediaMoviesCards, setMediaMoviesCards] = useState<Array<MediaCardProps>>([]);
    const [mediaSeriesCards, setMediaSeriesCards] = useState<Array<MediaCardProps>>([]);
    const [moviesState, setMoviesState] = useState<MediaHorizontalDisplayState>({isEmpty: false,isLoading: true});
    const [seriesState, setSeriesState] = useState<MediaHorizontalDisplayState>({isEmpty: false,isLoading: true});
    const initMovies = async (mediaType:string) => {
        // console.log("initMovies - "+type+" chargement des films...");
        const api = selectApi(mediaType);
        const medias = await getMedias(DISPLAY_LANGUAGE, api!);
        if (medias && medias.length > 0) {
            setMoviesState({...moviesState, isEmpty: false, isLoading: false});
            let tempMedias: Array<MediaCardProps> = [];
            for (const m of medias) {
                tempMedias.push(createMediaCardPropsFromMovie(m));
            }
            setMediaMoviesCards(tempMedias);
        } else {
            setMoviesState({...moviesState, isEmpty: true, isLoading: false});
        }
    }
    const initSeries = async (mediaType:string) => {
        // console.log("initSeries - "+type+" chargement des séries...");
        const api = selectApi(mediaType);
        const medias = await getMedias(DISPLAY_LANGUAGE, api!);
        if (medias && medias.length > 0) {
            console.log("initSeries - "+type+" j'ai des médias ! ");
            console.log("initSeries - "+type+" - medias : ", medias);
            setSeriesState({...seriesState, isEmpty: false, isLoading: false});
            let tempMedias: Array<MediaCardProps> = [];
            for (const m of medias) {
                tempMedias.push(createMediaCardPropsFromSerie(m));
            }
            setMediaSeriesCards(tempMedias);
        } else {
            console.log("initSeries - "+type+" j'ai pas de médias ! ");
            setSeriesState({...seriesState, isEmpty: true, isLoading: false});
        }
    }
    const selectApi = (mediaType:string) => {
        if (mediaType === MEDIA_TYPES.movie) {
            switch (type) {
                case "trending":
                    return ApiConfigService.fennext.urls.movie_trending;
                case "toprated":
                    return ApiConfigService.fennext.urls.movie_toprated;
                case "recommended":
                    return ApiConfigService.fennext.urls.movie_user_recommanded.replace("{user_id}", user?.id!);
            }
        } else if (mediaType === MEDIA_TYPES.tv) {
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
        if (elementToDisplay === 0) {
            if (mediaMoviesCards.length > 0) {
                console.log("Already Set Movies, refreshing... - " + type);
                setMediaMoviesCards(mediaMoviesCards);
            } else {
                console.log("Movies Empty, calling API... - " + type);
                initMovies(MEDIA_TYPES.movie).then();
            }
            if (mediaSeriesCards.length > 0) {
                console.log("Already Set Series, refreshing... - " + type);
                setMediaSeriesCards(mediaSeriesCards);
            } else {
                console.log("Series Empty, calling API... - " + type);
                initSeries(MEDIA_TYPES.tv).then();
            }
        }
    }, [elementToDisplay]);

    useEffect(() => {
    if (isUserRecommandation) {
        console.log("HorizontalListShowcase - "+type+" - moviesState : "+ JSON.stringify(moviesState));
        console.log("HorizontalListShowcase - "+type+" - seriesState : "+ JSON.stringify(seriesState));
    }
}, [moviesState, seriesState]);

    const handleSwitchElement = (element: string) => {
        setElementToDisplay(element === "Films" ? 0 : 1);
    }
    const handleLoadAll = () => {
        switch (type){
            case "trending": window.location.href = "/movies";
                break;
            case "toprated":
                window.location.href = "/movies";
                break;
            case "recommended":
                window.location.href = "/movies";
                break;
        }
    }
    return (
        <div className="flex flex-col">
            <div className="divider after:bg-accent-500 after:bg-opacity-50 after:h-[4px] divider-start ">
                <h1 className="category_title min-w-full sm:min-w-fit">{title}</h1>
            </div>
            <div className="flex flex-row justify-between">
                <Switch elements={["Films", "Séries"]} onSelect={handleSwitchElement}/>
                <i className="fa-solid fa-circle-chevron-right text-[24px] text-white/70 hover:text-white/100 hover:cursor-pointer" onClick={handleLoadAll}></i>
            </div>
                {isUserRecommandation && (
                    <div>
                    {elementToDisplay === 0 ? (
                        <div>
                            {moviesState.isEmpty &&
                                <p>{"Nous n'avons pas assez d'informations pour vous proposer des recommandations de films personnalisées."}</p>}
                            {moviesState.isLoading &&
                                <p>Chargement de vos recommandations de films personnalisées...</p>}
                        </div>
                    ) : (
                        <div>
                            {seriesState.isEmpty &&
                                <p>{"Nous n'avons pas assez d'informations pour vous proposer des recommandations de séries personnalisées."}</p>}
                            {seriesState.isLoading &&
                                <p>Chargement de vos recommandations de séries personnalisées...</p>}
                        </div>
                    )}
                </div>
            )}
            <div className="relative">
                <ul id="movies-horizontal-showcase"
                    className="flex space-x-4 pb-5 pt-4 pl-4 pr-4 horizontal-fading">
                    {((elementToDisplay === 0 && mediaMoviesCards.length > 0)) && showMedias(mediaMoviesCards)}
                    {(elementToDisplay === 1 && mediaSeriesCards.length > 0) && showSeries(mediaSeriesCards)}
                </ul>
            </div>
        </div>
    );
}

function showMedias(movies: Array<MediaCardProps>) {
    return (
        movies.map((movie,index) => (
            <MediaCard key={movie.id+'-'+index} media={movie}/>
        ))
    )
}
function showSeries(series: Array<MediaCardProps>) {
    return (
        series.map((serie,index) => (
            <MediaCard key={serie.id+'-'+index} media={serie}/>
        ))
    )
}
export default HorizontalListShowcase;
