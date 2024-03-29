import React, {useEffect} from "react";
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

interface NoImageProps{
    imgWidth?: string;
    imgHeight?: string;
    icoSize?: string;
    containerStyle?: string;
}
const NoImage: React.FC<NoImageProps> = ({imgWidth, imgHeight, icoSize, containerStyle}) => {
    return (
        <div className={`bg-white bg-opacity-25 ${imgWidth} ${imgHeight} ${containerStyle} flex justify-center items-center`}>
            <InsertPhotoTwoToneIcon className={`${icoSize} text-white opacity-35`} />
        </div>
    )
}
export default NoImage;

export  function showNoImage(imgWidth:string, imgHeight:string, icoSize:string, containerStyle?:string){
    return(
        <NoImage imgWidth={imgWidth} imgHeight={imgHeight} icoSize={icoSize} containerStyle={containerStyle} />
    )
}
