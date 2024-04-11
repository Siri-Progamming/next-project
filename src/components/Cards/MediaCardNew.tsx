import React, {useEffect, useState} from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {useRouter} from 'next/router';
import PercentSticker from "../utils/PercentSticker";
import MediaCardSkeleton from "../Skeleton/MediaCardSkeleton";
import {showNoImage} from "../Skeleton/NoData/NoImage";
import {MediaCardProps} from "../../interfaces/UI";

interface MediaCardProperties {
    media:MediaCardProps;
}

const MediaCard: React.FC<MediaCardProperties> = ({media}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const handleClick = () => {
        if(media.type === "movie"){
            router.push('/ui/movies/' + media.id).then();
        }else{
            router.push('/ui/series/' + media.id).then();
        }

    };

    useEffect(() => {
        if (media.id && media.title) {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);

        } else {
            setIsLoading(true);
        }
    }, [media.id, media.title]);

    return (
        <>
            {
                isLoading ?
                    <MediaCardSkeleton/>
                    :
                    (
                        <li key={media.id} className="media-card">
                            {media.poster_path ? showImage(media.poster_path) : showNoImage("min-w-[220px] max-w-[220px]", "min-h-[330px] max-h-[330px]", "text-[150px]", "media-card-bg")}
                            <div id="percent" className="absolute top-[68.3%] left-[6%] z-[2]">
                                <PercentSticker note={media.vote_average} />
                            </div>
                            <div className="media-card-details leading-none">
                                <h2 className="text-sm font-semibold">{media.title}</h2>
                                <p className="font-extralight text-xs text-white text-opacity-50">{media.release_date}</p>
                            </div>
                        </li>
                    )
            }
        </>
    )

    function showImage(poster_path: string){
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