import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import {ConfigService} from "../../services/IMDB.API/config.service";
import {useRouter} from 'next/router';
import PercentSticker from "../utils/PercentSticker";
import MediaCardSkeleton from "../Skeleton/MediaCardSkeleton";
import {showNoImage} from "../Skeleton/NoData/NoImage";

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
                    <MediaCardSkeleton/>
                    :
                    (
                        <li key={movie.id} className="media-card"
                            onClick={handleClick}>
                            {movie.poster_path ? showImage(movie) : showNoImage("min-w-[220px] max-w-[220px]", "min-h-[330px] max-h-[330px]", "text-[150px]", "media-card-bg")}
                            <div id="percent" className="absolute top-[68.3%] left-[6%] z-[2]">
                                <PercentSticker note={movie.vote_average} />
                            </div>
                            <div className="media-card-details leading-none">
                                <h2 className="text-sm font-semibold">{movie.title}</h2>
                                <p className="font-extralight text-xs text-white text-opacity-50">{movie.release_date}</p>
                            </div>
                        </li>
                    )
            }
        </>
    )

    function showImage(movie:Movie){
        return (
            <div className="media-card-bg"
                 style={{backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + movie.poster_path})`}}>
            </div>
        )
    }
}
export default MediaCard;
