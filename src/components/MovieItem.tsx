import React from "react";
import {Movie} from '../interfaces/movie';
import {ConfigService} from "../services/IMDB.API/config.service";
import { useRouter } from 'next/router';

interface MovieItemProps {
    movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({movie}) => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/ui/movies/'+movie.id);
    };
    return (
        <li key={movie.id} className="flex-column relative mb-10 mt-5 cursor-pointer" onClick={handleClick}>
            <div
                className="border-[2px] border-b-[0px] border-t-[0px] border-double border-white min-h-[250px] min-w-[175px] rounded-t-3xl"
                style={{
                    backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
            <div
                className="rounded-b-3xl min-h-[125px] relative border-[2px] border-t-[0px] border-b-[0px] border-double border-white"
            >
                <div style={{
                    backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w300" + movie.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(5px) brightness(0.5)',
                }} className="min-w-[175px] min-h-[129px] absolute top-[-4px] rounded-b-3xl">
                </div>
                <div id="percent">
                    <p className="radial-progress text-xs bg-[#050130] absolute bottom-[82%] left-[6%]"

                       style={{
                           // @ts-ignore
                           "--value": `${Math.round(movie.vote_average * 10 / 10) * 10}`,
                           "--size": "40px", "--thickness": "4px",
                           "color": Math.round(movie.vote_average * 10) >= 70 ? "#21d07a" : Math.round(movie.vote_average * 10) >= 50 ? "#E4A21B" : "#C9215B"
                       }}
                    >
                        <span className="text-white font-bold">{Math.round(movie.vote_average * 10)}</span>
                    </p>
                </div>
                <div className="pt-8 text-white ml-2 absolute">
                    <h2 className="font-bold">{movie.title}</h2>
                    <p className="text-gray-300 italic text-sm">{movie.release_date}</p>
                </div>
            </div>
        </li>
    )
        ;
}
export default MovieItem;
