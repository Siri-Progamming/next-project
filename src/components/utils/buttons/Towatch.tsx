import React, {useEffect, useState} from "react";
import {getMovieToWatch, getSerieToWatch, updateMovieToWatch, updateSerieToWatch} from "../../../services/API/call.api.service";
import {useAuth} from "../../../contexts/AuthContext";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import {MEDIA_TYPES} from "../../../constantes/app_constantes";

interface TowatchProps{
    id:number;
    mediaType:string;
    width?:string;
    style?:string;
    containerStyle?:string;
}
const Towatch: React.FC<TowatchProps> = ({id,mediaType,width, style, containerStyle}) => {
const [isTowatched, setIsTowatched] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);

    const getTowatch = async () => {
        let towatch;
        switch(mediaType){
            case MEDIA_TYPES.movie:
                towatch = await getMovieToWatch(user?.id!, id); break;
            case MEDIA_TYPES.tv:
                towatch = await getSerieToWatch(user?.id!, id); break;
        }
        if (towatch) {
            setIsTowatched(towatch);
        }else{
            setIsTowatched(false);
        }
    }
    const updateTowatch = async () => {
        let towatch;
        switch (mediaType) {
            case MEDIA_TYPES.movie:
                towatch = await updateMovieToWatch(user?.id!, id); break;
            case MEDIA_TYPES.tv:
               towatch = await updateSerieToWatch(user?.id!, id); break;
        }
        if (towatch != null) {
            setIsTowatched(towatch);
        }else{
            setIsTowatched(false);
        }
    }

    useEffect(() => {
        getTowatch().then();
        // console.log("isTowatched : "+isTowatched);
    }, [id, isTowatched]);

    const handleClick = () => {
        if(user){
            updateTowatch().then();
        }
    }

    return (
        <div className={` ${containerStyle ? containerStyle : ''}`}>
            {user && (isTowatched ?
                <WatchLaterRoundedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''}`} onClick={handleClick}/>
                :
                <WatchLaterOutlinedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''} addlist_not`}
                                            onMouseOver={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={handleClick} />
            )}
        </div>
    )
}
export default Towatch;
