import React from "react";
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

interface NoImageProps{
    imgWidth?: string;
    imgHeight?: string;
    icoSize?: string;
    containerStyle?: string;
    bgStyle?: string;
    icoStyle?: string;
}
const NoImage: React.FC<NoImageProps> = ({imgWidth, imgHeight, icoSize, containerStyle, bgStyle, icoStyle}) => {
    return (
        <div className={`${bgStyle ? bgStyle : 'bg-white bg-opacity-25'} ${imgWidth} ${imgHeight} ${containerStyle} flex justify-center items-center`}>
            <InsertPhotoTwoToneIcon className={`${icoSize} ${icoStyle ? icoStyle : 'text-white opacity-35'}`} />
        </div>
    )
}
export default NoImage;

export  function showNoImage(imgWidth:string, imgHeight:string, icoSize:string, containerStyle?:string, bgStyle?:string, icoStyle?:string){
    return(
        <NoImage imgWidth={imgWidth} imgHeight={imgHeight} icoSize={icoSize} containerStyle={containerStyle} bgStyle={bgStyle} icoStyle={icoStyle}/>
    )
}
