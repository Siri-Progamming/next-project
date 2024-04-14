import React, {useEffect, useState} from "react";
import {getMovieLike, updateMovieLike} from "../../services/API/call.api.service";
import {useAuth} from "../../contexts/AuthContext";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

interface LikeProps{
    idMovie:number;
    width?:string;
    style?:string;
    containerStyle?:string;
}
const Like: React.FC<LikeProps> = ({idMovie,width, style, containerStyle}) => {
const [isLiked, setIsLiked] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);

    const getLike = async () => {
        const like = await getMovieLike(user?.id!, idMovie);
        // console.log("état de like : "+like);
        if (like) {
            setIsLiked(like);
        }else{
            setIsLiked(false);
        }
    }
    const updateLike = async () => {
        const like = await updateMovieLike(user?.id!, idMovie);
        if (like != null) {
            setIsLiked(like);
        }else{
            setIsLiked(false);
        }
    }

    useEffect(() => {
        getLike().then();
        // console.log("isLiked : "+isLiked);
    }, [idMovie, isLiked]);

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
