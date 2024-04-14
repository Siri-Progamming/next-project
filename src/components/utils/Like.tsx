import React, {useEffect, useState} from "react";
import {getMovieLike, getSerieLike, updateMovieLike, updateSerieLike} from "../../services/API/call.api.service";
import {useAuth} from "../../contexts/AuthContext";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

interface LikeProps{
    id:number;
    mediaType:string;
    width?:string;
    style?:string;
    containerStyle?:string;
}
const Like: React.FC<LikeProps> = ({id,mediaType,width, style, containerStyle}) => {
const [isLiked, setIsLiked] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);

    const getLike = async () => {
        let like;
        switch(mediaType){
            case "movie":
                like = await getMovieLike(user?.id!, id); break;
            case "serie":
                like = await getSerieLike(user?.id!, id); break;
        }
        if (like) {
            setIsLiked(like);
        }else{
            setIsLiked(false);
        }
    }
    const updateLike = async () => {
        let like;
        switch (mediaType) {
            case "movie":
                like = await updateMovieLike(user?.id!, id); break;
            case "serie":
                like = await updateSerieLike(user?.id!, id); break;
        }
        if (like != null) {
            setIsLiked(like);
        }else{
            setIsLiked(false);
        }
    }

    useEffect(() => {
        getLike().then();
        // console.log("isLiked : "+isLiked);
    }, [id, isLiked]);

    const handleClick = () => {
        if(user){
            updateLike().then();
        }
    }

    return (
        <div className={` ${containerStyle ? containerStyle : ''}`}>
            {user && (isLiked ?
                <FavoriteOutlinedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''}`} onClick={handleClick}/>
                :
                <FavoriteBorderOutlinedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''}`}
                                            onMouseOver={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={handleClick} />
            )}
        </div>
    )
}
export default Like;
