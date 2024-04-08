import React, {useEffect, useState} from "react";
import {getMovieLike, updateMovieLike} from "../../services/API/call.api.service";
import {useAuth} from "../../contexts/AuthContext";

interface LikeProps{
    idMovie:number;
    width?:string;
}
const Like: React.FC<LikeProps> = ({idMovie,width}) => {
const [isLiked, setIsLiked] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);

    const getLike = async () => {
        const like = await getMovieLike(user?.id!, idMovie);
        console.log("état de like : "+like);
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
        console.log("isLiked : "+isLiked);
    }, [idMovie, isLiked]);

    const handleClick = () => {
        updateLike().then();
    }

    return (
        <div className={`bg-white rounded-3xl`}>
            {user && (isLiked ?
                <i className={`fa-solid fa-heart fa-beat fa-xl text-tertiary-700 ${width ? width : 'text-[50px]'}`} onClick={handleClick} ></i>
                :
                <i className={`fa-regular fa-heart fa-xl text-tertiary-700 ${isHovered ? ' fa-beat' : ''} ${width ? width : 'text-[50px]'}`}
                   onMouseOver={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   onClick={handleClick}></i>)
            }
        </div>
    )
}
export default Like;
