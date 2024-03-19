import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {FullMovie} from "../../../src/interfaces/movie";
import {getFullMovie} from "../../../src/services/API/call.api.service";
import {createFullMovie} from "../../../src/services/API/object.creator.service";
import {ConfigService} from "../../../src/services/IMDB.API/config.service";
import PeopleShowcase from "../../../src/components/Showcase/PeopleShowcase";
import PicturesShowcase from "../../../src/components/Showcase/PicturesShowcase";
import SimilarShowcase from "../../../src/components/Showcase/SimilarShowcase";

interface IdMovieProps {
}

const IdMovie: React.FC<IdMovieProps> = ({}) => {
    const router = useRouter();
    const {idMovie} = router.query;
    const [movie, setMovie] = useState<FullMovie | null>(null);
    const initMovie = async () => {
        const movie = await getFullMovie(Number(idMovie as string));
        if (movie != null) {
            setMovie(createFullMovie(movie));
        }
    }
    useEffect(() => {
        if (idMovie) {
            initMovie();
        }
    }, [idMovie]);
    useEffect(() => {
        if (movie != null) {
            // console.log("similar : ", movie.similar);
            // console.log("similar : ", movie.similar[0].title);
        }
    }, [movie]);

    return (
        <main id="main_movie_page">
            <div className="movie_page relative">
                <div className="bg_image_container">
                    {/*h-[calc(100vh_-_var(--nav-height,0))*/}
                    <div className="background_image_repeat bg-cover xl:bg-contain h-[115vh]" style={{
                        backgroundImage: `url(${ConfigService.themoviedb.urls.image_view}/original${movie?.backdrop_path})`
                    }}></div>
                    <div className="background_image bg-cover xl:bg-contain h-[100vh]" style={{
                        backgroundImage: `url(${ConfigService.themoviedb.urls.image_view}/original${movie?.backdrop_path})`
                    }}>
                    </div>
                </div>
                <div className="movie_details lg:w-full h-[100vh] overflow-clip xl:justify-center">
                    {/*<div className="glassmorphism">*/}
                        {movie?.title && (
                            <h2 className={`main_title leading-none ${movieTitleSize(movie.title)} xl:w-[30vw]`}>
                                {movie.title}
                            </h2>
                        )}
                        <p className="movie-review font-bold xl:w-[30vw] mr-5"
                           style={{textAlign: 'justify'}}>{movie?.overview}</p>
                        <p className="mt-5 flex flex-row flex-wrap items-center space-x-4 justify-start">
                            <span>{movie?.release_date.slice(0, 4)}</span> {movie?.genres.map((genre) => (
                            <span className="genre">{genre.name}</span>))}
                        </p>
                        <p className="relative mt-5">
                            {movie?.vote_average.toFixed(1) >= 7.5 &&
                                <span className="absolute left-[0] top-[6px] w-6 h-6 "><i
                                    className="fa-solid fa-fire fa-xl fa-beat-fade text-secondary-500"></i></span>}
                            {movie?.vote_average.toFixed(1) < 5.0 &&
                                <span className="absolute left-[0] top-[6px] w-6 h-6 "><i
                                    className="fa-solid fa-face-frown fa-xl text-primary-400"></i></span>}
                            <span
                                className="font-extrabold text-3xl text-secondary-500 -tracking-widest absolute left-[35px] movie-note">{movie?.vote_average.toFixed(1)}
                        </span>
                            <span className="absolute text-sm left-[85px] top-[2.5px] tracking-wide movie-note"><span
                                className="font-extralight text-neutral-400">/</span>10</span>
                        </p>
                    </div>
                {/*</div>*/}
                <div
                    className="about_movie absolute top-[75vh] md:top-[80vh] xl:top-[80vh] bottom-[0] left-[3vw] right-0 flex flex-col md:flex-row">
                    <div className="cast_review_movie grow max-w-[100vw] md:max-w-[40vw] md:mr-10">
                        <PeopleShowcase movie={movie ? movie : null} nbToShow={7} title={"Cast"}/>
                    </div>
                    <div className="pictures_movie grow-0 max-w-[100vw] md:max-w-[30vw] md:mr-14 lg:mr-24">
                        {movie?.images.length > 0 && <PicturesShowcase movie={movie} nbToShow={3}/>}
                    </div>
                    <div className="similar_movies grow-0 max-w-[100vw] lg:max-w-[20vw] xl:max-w-[14vw] md:mr-10">
                        {movie?.recommendations.length > 0 ?
                            <SimilarShowcase movie={movie} nbToShow={4} title={"Recommendations"}/>
                            :
                            movie?.similar.length > 0 &&
                            <SimilarShowcase movie={movie} nbToShow={4} title={"Similar"}/>}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default IdMovie;

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
    if (spaces === 0 && title.length > 8) {
        // return 'lg:text-[4.3vw] text-[8vw]';
        return 'text-[90px]';
    } else if (spaces > 3 || title.length > 15) {
        // return 'lg:text-[4vw] text-[9vw]';
        if (title.length > 20) {
            return 'text-[80px]';
        } else {
            return 'text-[90px]';
        }
    } else if (spaces > 1 || title.length > 10) {
        // return 'lg:text-[5.5vw] text-[12vw]';
        return 'text-[108px]';
    } else {
        // return 'lg:text-[7vw] text-[15vw]';
        return 'text-[130px]';
    }
}
