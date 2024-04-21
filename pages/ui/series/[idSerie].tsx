import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {FullSerie} from "../../../src/interfaces/Serie";
import {getFullMedia} from "../../../src/services/API/call.api.service";
import {createFullSerie} from "../../../src/services/API/object.creator.service";
import {ConfigService} from "../../../src/services/IMDB.API/config.service";
import PeopleShowcase from "../../../src/components/Showcase/PeopleShowcase";
import PicturesShowcase from "../../../src/components/Showcase/PicturesShowcase";
import SimilarShowcase from "../../../src/components/Showcase/SimilarShowcase";
import Loader from "../../../src/components/utils/Loader";
import {showNoImage} from "../../../src/components/Skeleton/NoData/NoImage";
import Like from "../../../src/components/utils/buttons/Like";
import {useConstantes} from "../../../src/contexts/ConstantesContext";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

interface IdSerieProps {
}
const IdSerie: React.FC<IdSerieProps> = ({}) => {
    const router = useRouter();
    const {idSerie} = router.query;
    const [serie, setSerie] = useState<FullSerie | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {DISPLAY_LANGUAGE} = useConstantes();

    const initSerie = async () => {
        const serie = await getFullMedia(DISPLAY_LANGUAGE,Number(idSerie as string),"serie");
        if (serie != null) {
            setSerie(createFullSerie(serie));
        }
    }
    useEffect(() => {
        if (idSerie) {
            initSerie().then();
        }
    }, [idSerie]);
    useEffect(() => {
        if (serie?.id == idSerie) {
            console.log("Serie a chargé");
            console.log(serie);
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [serie]);

    return (
        <main id="main_movie_page">
            {isLoading ?
                <div className="flex justify-center items-center h-screen"><Loader/></div>
                :
                <div className="movie_page relative">
                    <div className="cinematic absolute top-[-4vh] left-0 w-full h-[4vh]"></div>
                    <div className="bg_image_container">
                        <div className="absolute right-[5vw] 2xl:right-[10vw] top-[10vh] z-[10]">
                            <Like id={serie?.id!} mediaType="serie" width="" style="like-button"/>
                        </div>
                        {/*h-[calc(100vh_-_var(--nav-height,0))*/}
                        {serie?.backdrop_path ? showBackground(serie) : showNoImage("w-[80%]", "h-[95vh]", "text-[300px]", "mx-auto absolute0", "bg-black bg-opacity-25", "text-white opacity-20")}
                    </div>
                    <div
                        className="movie_details cinematic sm:mt-[0] h-[84vh] sm:h-[75vh] md:h-[80vh] xl:justify-center overflow-y-scroll overflow-x-hidden">
                        <div className="max-w-[100vw] xl:text-left xl:w-[60vw] 2xl:w-[30vw] ml-[3vw] mr-[3vw] mb-5">
                            {serie?.title && (
                                <h2 className={`main_title leading-none ${movieTitleSize(serie.title)}`}>
                                    {serie.title}
                                </h2>
                            )}
                        </div>
                        <div className="max-w-[100vw] md:w-[60vw] lg:w-[35vw] xl:w-[30vw]  ml-[3vw] mr-[3vw]">
                            <p className="movie-review font-medium bg-black-window"
                               style={{textAlign: 'justify'}}>{serie?.overview}</p>
                        </div>
                        <div className="max-w-[100vw]  lg:w-[60vw] xl:w-[60vw] 2xl:w-[40vw] ml-[3vw] mr-[3vw]">
                            <p className="mt-5 flex flex-row flex-wrap items-center gap-4 justify-start">
                                <span className="media-badge">{serie?.release_date.slice(0, 4)}</span>
                                {serie?.genres.map((genre, index) => (
                                    <span key={genre.id} className={`genre`}>{genre.name}</span>))}
                                {/*TODO Pas sûre de faire ça comme ça*/}
                                <span className="media-badge"><AccessTimeOutlinedIcon />{serie?.last_episode_to_air?.runtime ? timeConvert(serie?.last_episode_to_air.runtime) : "NaN"}</span>
                            </p>
                            {showNote(serie!)}
                        </div>
                    </div>
                    <div className="about_movie cinematic flex flex-col justify-between pt-[0] pl-[3vw]  md:pt-[0] lg:flex-row">
                        <div className="cast_review_movie grow max-w-[100vw] mr-[3vw]  lg:max-w-[40vw]">
                            <PeopleShowcase casts={serie?.cast ? serie?.cast : []} nbToShow={serie?.cast?.length || 0}
                                            title={"Têtes d'affiche"}/>
                        </div>
                        <div className="pictures_movie grow-0 max-w-[100vw] mr-[3vw] lg:max-w-[30vw]">
                            {serie && <PicturesShowcase pictures={serie.images} nbToShow={3} startFrom={5}/>}
                        </div>
                        <div
                            className="similar_movies grow-0 max-w-[100vw] mr-[3vw] lg:max-w-[20vw] xl:max-w-[14vw] lg:mr-10">
                            {serie && serie?.recommendations.length > 0 ?
                                <SimilarShowcase fullMedia={serie} nbToShow={4} title={"Recommendations"}/>
                                :
                                (serie && serie?.similar.length > 0) &&
                                <SimilarShowcase fullMedia={serie} nbToShow={4} title={"Similar"}/>}
                        </div>
                    </div>
                </div>
            }
        </main>
    );
    function showNote(serie:FullSerie){
        return (
            <p className="relative mt-5">
                {/*@ts-ignore*/}
                {serie?.vote_average.toFixed(1) >= 7.5 &&
                    <span className="absolute left-[0] top-[6px] w-6 h-6 "><i
                        className="fa-solid fa-fire fa-xl fa-beat-fade text-secondary-500"></i></span>}
                {/*@ts-ignore*/}
                {serie?.vote_average.toFixed(1) < 5.0 &&
                    <span className="absolute left-[0] top-[6px] w-6 h-6 "><i
                        className="fa-solid fa-face-frown fa-xl text-primary-400"></i></span>}
                <span
                    className="font-extrabold text-3xl text-secondary-500 -tracking-widest absolute left-[35px] movie-note">{serie?.vote_average.toFixed(1)}
                        </span>
                <span className="absolute text-sm left-[85px] top-[2.5px] tracking-wide movie-note"><span
                    className="font-extralight text-neutral-400">/</span>10</span>
            </p>
        )
    }
    function showBackground(serie: FullSerie) {
        return (
            [...Array(4)].map((_, index) => (
                <div
                    key={`background_image_${index}`}
                    className={index === 0 ? "background_image_repeat absolute0"
                        : index === 1 ? "background_image dropShadow absolute0" : "background_image absolute0"}
                    style={{
                        backgroundImage: `url(${ConfigService.themoviedb.urls.image_view}/original${serie?.backdrop_path})`
                    }}
                ></div>
            ))
        )
    }
}
export default IdSerie;

function countSpaces(str: string) {
    if (str === null || str === undefined) return 0;
    let spaceCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            spaceCount++;
        }
    }
    return spaceCount;
}

function movieTitleSize(title: string) {
    const spaces = countSpaces(title);
    if (spaces === 0 && title.length > 10) {
        return 'text-[70px] sm:text-[75px] md:text-[80px] lg:text-[90px]';
    } else if (spaces > 3 || title.length > 15) {
        if (title.length > 20 && title.length < 30) {
            return 'text-[50px] sm:text-[55px] md:text-[70px] lg:text-[80px]';
        } else if(title.length >= 30) {
            return 'text-[40px] sm:text-[45px] md:text-[60px] lg:text-[70px]';
        }else {
            return 'text-[70px] sm:text-[75px] md:text-[80px] lg:text-[90px]';
        }
    } else if (spaces > 1 || title.length > 10) {
        return 'text-[80px] sm:text-[95px] md:text-[98px] lg:text-[108px]';
    } else {
        return 'text-[90px] sm:text-[115px] md:text-[120px] lg:text-[130px]';
    }
}

function timeConvert(minutes:number | undefined){
    if(minutes === undefined || minutes <=0) return "NaN";
    // Si le temps est inférieur à 60 minutes, affiche seulement les minutes
    if (minutes < 60) {
        if(minutes < 10){
            return "0"+minutes+ "min";
        }
        return minutes + "min";
    } else {
        // Calculer le nombre d'heures
        var heures = Math.floor(minutes / 60);

        // Calculer le nombre de minutes restantes
        var minutesRestantes = minutes % 60;

        // Retourner le résultat sous forme de chaîne de caractères
        if(minutesRestantes < 10){
            return heures + "h0" + minutesRestantes;
        }else{
            return heures + "h" + minutesRestantes;
        }
    }
}
