import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {FullMovie} from "../../../src/interfaces/Movie";
import {getFullMedia} from "../../../src/services/API/call.api.service";
import {createFullMovie} from "../../../src/services/API/object.creator.service";
import {ConfigService} from "../../../src/services/IMDB.API/config.service";
import PeopleShowcase from "../../../src/components/Showcase/PeopleShowcase";
import PicturesShowcase from "../../../src/components/Showcase/PicturesShowcase";
import SimilarShowcase from "../../../src/components/Showcase/SimilarShowcase";
import Loader from "../../../src/components/utils/Loader";
import {showNoImage} from "../../../src/components/Skeleton/NoData/NoImage";
import Like from "../../../src/components/utils/buttons/Like";
import {useConstantes} from "../../../src/contexts/ConstantesContext";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {NA_VALUE, NO_TIME_VALUE, MIN_VOTES_FOR_TRUST_RATING} from "../../../src/constantes/app_constantes";

const IdMovie: React.FC = () => {
    const router = useRouter();
    const {idMovie} = router.query;
    const [movie, setMovie] = useState<FullMovie | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {DISPLAY_LANGUAGE} = useConstantes();

    const initMovie = async () => {
        const movie = await getFullMedia(DISPLAY_LANGUAGE,Number(idMovie as string),"movie");
        if (movie != null) {
            setMovie(createFullMovie(movie));
        }
    }

    useEffect(() => {
        if (idMovie) {
            setIsLoading(true);
            initMovie().then();
        }
    }, [idMovie]);

    useEffect(() => {
        if (movie?.id == idMovie) {
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [movie]);

    useEffect(() => {
        console.log("isLoading", isLoading);
    }, [isLoading]);

    return (
        <main id="main_movie_page">
            {isLoading ?
                <div className="flex justify-center items-center h-screen"><Loader/></div>
                :
                <div className="movie_page relative">
                    <div className="cinematic absolute top-[-4vh] left-0 w-full h-[4vh]"></div>
                    <div className="bg_image_container">
                        <div className="absolute right-[5vw] 2xl:right-[10vw] top-[10vh] z-[10]">
                            <Like id={movie?.id!}  mediaType="movie" width="" style="like-button"/>
                        </div>
                        {/*h-[calc(100vh_-_var(--nav-height,0))*/}
                        {movie?.backdrop_path ? showBackground(movie?.backdrop_path!) : showNoImage("w-[80%]", "h-[95vh]", "text-[300px]", "mx-auto absolute0", "bg-black bg-opacity-25", "text-white opacity-20")}
                    </div>
                    <div className="movie_details cinematic sm:mt-[0] h-[84vh] sm:h-[75vh] md:h-[80vh] xl:justify-center overflow-y-scroll overflow-x-hidden">
                        <div className="max-w-[100vw] xl:text-left xl:w-[60vw] 2xl:w-[30vw] ml-[3vw] mr-[3vw] mb-5">
                                {movie?.title && (
                                    <h2 className={`main_title leading-none ${movieTitleSize(movie.title)}`}>
                                        {movie.title}
                                    </h2>
                                )}
                        </div>
                        {(movie?.overview && movie?.overview.length > 0) && (<div className="max-w-[100vw] md:w-[60vw] lg:w-[35vw] xl:w-[30vw]  ml-[3vw] mr-[3vw]">
                            <p className="movie-review font-medium bg-black-window"
                               style={{textAlign: 'justify'}}>{movie?.overview}</p>
                        </div>)}
                        <div className="max-w-[100vw]  lg:w-[60vw] xl:w-[60vw] 2xl:w-[40vw] ml-[3vw] mr-[3vw]">
                            <p className="mt-5 flex flex-row flex-wrap items-center gap-4 justify-start">
                                <span className="media-badge">{movie?.release_date.slice(0, 4)}</span>
                                    {movie?.genres.map((genre) => (
                                        <span key={genre.id} className={`genre`}>{genre.name}</span>))}
                                <span className="media-badge"><AccessTimeOutlinedIcon />{timeConvert(movie?.runtime)}</span>
                            </p>
                            {showNote(noteTrusted(movie?.vote_average!, movie?.vote_count!))}
                        </div>
                    </div>
                    <div className="about_movie cinematic flex flex-col justify-between pt-[0] pl-[3vw]  md:pt-[0] lg:flex-row">
                        <div className="cast_review_movie grow max-w-[100vw] mr-[3vw]  lg:max-w-[40vw]">
                            <PeopleShowcase casts={movie?.cast ? movie?.cast : []} nbToShow={movie?.cast?.length || 0}
                                            title={"Têtes d'affiche"}/>
                        </div>
                        <div className="pictures_movie grow-0 max-w-[100vw] mr-[3vw] lg:max-w-[30vw]">
                            {movie && <PicturesShowcase pictures={movie.images} nbToShow={3} startFrom={5}/>}
                        </div>
                        <div
                            className="similar_movies grow-0 max-w-[100vw] mr-[3vw] lg:max-w-[20vw] xl:max-w-[14vw] lg:mr-10">
                            {movie && movie?.recommendations.length > 0 ?
                                <SimilarShowcase fullMedia={movie} nbToShow={4} title={"Recommendations"}/>
                                :
                                (movie && movie?.similar.length > 0) &&
                                <SimilarShowcase fullMedia={movie} nbToShow={4} title={"Similar"}/>}
                        </div>
                    </div>
                </div>
            }
        </main>
    );
}
export default IdMovie;

export function showBackground(path:string) {
    return (
        [...Array(4)].map((_, index) => (
            <div
                key={`background_image_${index}`}
                className={index === 0 ? "background_image_repeat absolute0"
                    : index === 1 ? "background_image dropShadow absolute0" : "background_image absolute0"}
                style={{
                    backgroundImage: `url(${ConfigService.themoviedb.urls.image_view}/original${path})`
                }}
            ></div>
        ))
    )
}
export function countSpaces(str: string) {
    if (str === null || str === undefined) return 0;
    let spaceCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            spaceCount++;
        }
    }
    return spaceCount;
}
export function movieTitleSize(title: string) {
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
export function timeConvert(minutes:number | undefined){
    if(minutes === undefined || minutes <=0) return NO_TIME_VALUE;
    // Si le temps est inférieur à 60 minutes, affiche seulement les minutes
    if (minutes < 60) {
        if(minutes < 10){
            return "0"+minutes+ "min";
        }
        return minutes + "min";
    } else {
        // Calculer le nombre d'heures
        const heures = Math.floor(minutes / 60);

        // Calculer le nombre de minutes restantes
        const minutesRestantes = minutes % 60;

        // Retourner le résultat sous forme de chaîne de caractères
        if(minutesRestantes < 10){
            return heures + "h0" + minutesRestantes;
        }else{
            return heures + "h" + minutesRestantes;
        }
    }
}
export function showNote(note: number | typeof NA_VALUE){
    return (
        <div className="relative mt-5">
            <div className=" absolute flex flex-row">
                {/*@ts-ignore*/}
                {formatNote(note) >= 7.5 &&
                    <span className="mt-[6px] mr-[8px] w-6 h-6"><i
                        className="fa-solid fa-fire fa-xl fa-beat-fade text-secondary-500"></i></span>}
                {/*@ts-ignore*/}
                {formatNote(note) < 5.0 &&
                    <span className="mt-[6px] mr-[8px] w-6 h-6"><i
                        className="fa-solid fa-face-sad-tear fa-xl text-primary-500"></i></span>}
                <div>
                <span className="relative font-extrabold text-3xl text-secondary-500 tracking-[-.1em] movie-note">
                    {formatNote(note)}
                </span>
                    <span className="absolute top-[-2.5px] ml-[5px] text-sm tracking-wide movie-note">
                    <span className="font-extralight text-neutral-400 text-xs">/</span>
                    10
                </span>
                </div>
            </div>
        </div>
    )
}
function formatNote(note: number | typeof NA_VALUE) {
    console.log("note", note);
    if(note != NA_VALUE){
        if (note >= 0 && note <= 10) {
            if(note == 0){
                return "0"
            }else if(note == 10){
                return "10"
            }else{
                return note.toFixed(1);
            }
        }else{
            return NO_TIME_VALUE;
        }
    }else{
        return NA_VALUE;
    }
}
export function noteTrusted(note: number, nbVotes:number) {
    if(nbVotes < MIN_VOTES_FOR_TRUST_RATING || !nbVotes){
        return NA_VALUE;
    }else{
        return note;
    }
}
