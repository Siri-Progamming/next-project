import React, {useEffect} from "react";
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

interface NoImageProps{
    imgWidth?: string;
    imgHeight?: string;
    icoSize?: string;
}
const NoImage: React.FC<NoImageProps> = ({imgWidth, imgHeight, icoSize}) => {
    return (
        <div className={`bg-white bg-opacity-25 ${imgWidth} ${imgHeight} rounded-xl flex justify-center items-center bg-cover bg-center`}>
            <InsertPhotoTwoToneIcon className={`${icoSize} text-white opacity-35`} />
        </div>
    )
}
export default NoImage;
