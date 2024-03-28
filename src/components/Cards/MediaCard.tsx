import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import {ConfigService} from "../../services/IMDB.API/config.service";
import {useRouter} from 'next/router';
import MovieItemSkeleton from "../Skeleton/MovieItemSkeleton";
import PercentSticker from "../utils/PercentSticker";

interface MediaCardProps {
    movie: Movie;
}

const MediaCard: React.FC<MediaCardProps> = ({movie}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const handleClick = () => {
        router.push('/ui/movies/' + movie.id);
    };

    useEffect(() => {
        if (movie) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);

        } else {
            setIsLoading(true);
        }
    }, [movie]);

    return (
        <>
            {
                isLoading ?
                    <MovieItemSkeleton/>
                    :
                    (
                        <li key={movie.id} className="media-card"
                            onClick={handleClick}>

                            <div className="media-card-bg"
                                style={{backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + movie.poster_path})`}}>
                            </div>
                            <div id="percent" className="absolute top-[68.3%] left-[6%] z-[2]">
                                <PercentSticker note={movie.vote_average} />
                            </div>
                            <div className="media-card-details">
                                <h2 className="font-bold">{movie.title}</h2>
                                <p className="text-gray-600 italic text-sm">{movie.release_date}</p>
                            </div>
                        </li>
                    )
            }
        </>
    )
}
export default MediaCard;
