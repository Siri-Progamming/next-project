import React, {useEffect, useState} from "react";
import {getMovieSeen, getSerieSeen, updateMovieSeen, updateSerieSeen} from "../../../services/API/call.api.service";
import {useAuth} from "../../../contexts/AuthContext";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface LikeProps{
    id:number;
    mediaType:string;
    width?:string;
    style?:string;
    containerStyle?:string;
}
const Seen: React.FC<LikeProps> = ({id,mediaType,width, style, containerStyle}) => {
const [isSeen, setIsSeen] = useState<boolean>(false);
const [isHovered, setIsHovered] = useState(false);
const {user} = useAuth();
const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSeen = async () => {
        let seen;
        switch(mediaType){
            case "movie":
                seen = await getMovieSeen(user?.id!, id); break;
            case "serie":
               seen = await getSerieSeen(user?.id!, id); break;
        }
        if (seen) {
            setIsSeen(seen);
        }else{
            setIsSeen(false);
        }
    }
    const updateLike = async () => {
        let seen;
        switch (mediaType) {
            case "movie":
                seen = await updateMovieSeen(user?.id!, id); break;
            case "serie":
                seen = await updateSerieSeen(user?.id!, id); break;
        }
        if (seen != null) {
            setIsSeen(seen);
        }else{
            setIsSeen(false);
        }
    }

    useEffect(() => {
        getSeen().then();
        // console.log("isLiked : "+isLiked);
    }, [id, isSeen]);

    const handleClick = () => {
        if(user){
            updateLike().then();
        }
    }

    return (
        <div className={` ${containerStyle ? containerStyle : ''}`}>
            {user && (isSeen ?
                <CheckCircleRoundedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''}`} onClick={handleClick}/>
                :
                <CheckCircleOutlineRoundedIcon className={`${width ? width : 'text-[60px]'} ${style ? style : ''} addlist_not`}
                                            onMouseOver={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={handleClick} />
            )}
        </div>
    )
}
export default Seen;
