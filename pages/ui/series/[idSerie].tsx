import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {FullSerie} from "../../../src/interfaces/Serie";
import {getFullMedia} from "../../../src/services/API/call.api.service";
import {createFullSerie} from "../../../src/services/API/object.creator.service";
import PeopleShowcase from "../../../src/components/Showcase/PeopleShowcase";
import PicturesShowcase from "../../../src/components/Showcase/PicturesShowcase";
import SimilarShowcase from "../../../src/components/Showcase/SimilarShowcase";
import Loader from "../../../src/components/utils/Loader";
import {showNoImage} from "../../../src/components/Skeleton/NoData/NoImage";
import Like from "../../../src/components/utils/buttons/Like";
import {useConstantes} from "../../../src/contexts/ConstantesContext";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import {showNote, timeConvert, movieTitleSize, showBackground} from "../movies/[idMovie]";

const IdSerie: React.FC = () => {
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
                        {serie?.backdrop_path ? showBackground(serie?.backdrop_path) : showNoImage("w-[80%]", "h-[95vh]", "text-[300px]", "mx-auto absolute0", "bg-black bg-opacity-25", "text-white opacity-20")}
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
                                <span className="media-badge"><AccessTimeOutlinedIcon />{timeConvert(serie?.last_episode_to_air.runtime)}</span>
                            </p>
                            {showNote(serie?.vote_average!)}
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
}
export default IdSerie;
