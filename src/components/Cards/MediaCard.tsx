import React, {useEffect, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import {ConfigService} from "../../services/IMDB.API/config.service";
import {useRouter} from 'next/router';
import PercentSticker from "../utils/PercentSticker";
import MediaCardSkeleton from "../Skeleton/MediaCardSkeleton";
import {showNoImage} from "../Skeleton/NoData/NoImage";
import {Serie} from "../../interfaces/Serie";

interface MediaCardProps {
    type: number;
    id: number;
    poster_path: string;
    vote_average: number;
    title: string;
    release_date: string;
}

const MediaCard: React.FC<MediaCardProps> = ({type,id,poster_path,vote_average,title,release_date}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const handleClick = () => {
        if(type === 0){
            router.push('/ui/movies/' + id).then();
        }else{
            router.push('/ui/series/' + id).then();
        }

    };

    useEffect(() => {
        if (id && title) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);

        } else {
            setIsLoading(true);
        }
    }, [id, title]);

    return (
        <>
            {
                isLoading ?
                    <MediaCardSkeleton/>
                    :
                    (
                        <li key={id} className="media-card">
                            {poster_path ? showImage(poster_path) : showNoImage("min-w-[220px] max-w-[220px]", "min-h-[330px] max-h-[330px]", "text-[150px]", "media-card-bg")}
                            <div id="percent" className="absolute top-[68.3%] left-[6%] z-[2]">
                                <PercentSticker note={vote_average} />
                            </div>
                            <div className="media-card-details leading-none">
                                <h2 className="text-sm font-semibold">{title}</h2>
                                <p className="font-extralight text-xs text-white text-opacity-50">{release_date}</p>
                            </div>
                        </li>
                    )
            }
        </>
    )

    function showImage(post_path: string){
        return (
            <div className="media-card-bg"
                 style={{backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + poster_path})`}}
                 onClick={handleClick}
            >
            </div>
        )
    }
}
export default MediaCard;
