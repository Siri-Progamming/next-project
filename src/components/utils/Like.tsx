import React, {useEffect, useState} from "react";
import {getMovieLike, updateMovieLike} from "../../services/API/call.api.service";
import {useAuth} from "../../contexts/AuthContext";
import {useApp} from "../../contexts/AppContext";

interface LikeProps{
    idMovie:number;
}
const Like: React.FC<LikeProps> = ({idMovie}) => {
const [isLiked, setIsLiked] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);
const {refresher} = useApp();

    const getLike = async () => {
        const like = await getMovieLike(user?.id!, idMovie);
        if (like != null) {
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
    }, []);

    const handleClick = () => {
        updateLike().then();
    }

    return (
        <div>
            {user && (isLiked ?
                <i className="fa-solid fa-heart fa-l text-tertiary-700" onClick={handleClick} ></i>
                :
                <i className={`fa-regular fa-heart fa-l text-tertiary-700 ${isHovered ? ' fa-bounce' : ''}`}
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   onClick={handleClick}></i>)
            }
        </div>
    )
}
export default Like;
