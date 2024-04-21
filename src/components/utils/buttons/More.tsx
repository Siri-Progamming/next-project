import React, {useEffect, useRef} from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Like from "./Like";
import Seen from "./Seen";
import Towatch from "./Towatch";

interface MoreProps {
   id: number;
    mediaType: string;
}

const More: React.FC<MoreProps> = ({id, mediaType}) => {
    const [isClicked, setIsClicked] = React.useState(false);
    const listButtons = useRef<HTMLDivElement>(null);
    const moreButton = useRef<HTMLDivElement>(null);
    const handleOnClick = () => {
        setIsClicked(!isClicked);
    }
    const handleClickOutside = (event: MouseEvent) => {
        const boutonsCaches = listButtons.current;
        const more = moreButton.current;
        if (
            boutonsCaches &&
            more &&
            !more.contains(event.target as Node) &&
            !boutonsCaches.contains(event.target as Node)
        ) {
            setIsClicked(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative w-[30px] h-[30px]`}>
            <div ref={moreButton}><MoreHorizIcon className={`text-[30px] button_media-card more-button_media-card`}
                           onClick={handleOnClick}/></div>
            {isClicked &&
                <div ref={listButtons}>
                    <Like id={id}
                          mediaType={mediaType}
                          width="text-[35px]"
                          style="button_media-card like-button_media-card absolute top-[-35px] right-[-2px]"
                          containerStyle=""/>
                    <Seen id={id}
                          mediaType={mediaType}
                          width="text-[35px]"
                          style="button_media-card seen-button_media-card absolute top-[-30px] right-[-27px]"
                          containerStyle=""/>
                    <Towatch id={id}
                             mediaType={mediaType}
                             width="text-[35px]"
                             style="button_media-card towatch-button_media-card absolute top-[-3px] right-[-35px]"
                             containerStyle=""/>
                </div>
            }
        </div>
    )
}
export default More;
