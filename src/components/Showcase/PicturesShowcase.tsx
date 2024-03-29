import React, {useEffect} from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie} from "../../interfaces/Movie";
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

interface PicturesShowProps {
    movie: FullMovie | null;
    nbToShow: number;
    startFrom: number;
}

const PicturesShowcase: React.FC<PicturesShowProps> = ({movie, nbToShow, startFrom}) => {

    function showPictures() {
        let pictures = movie?.images;
        if (pictures != null && pictures.length > 0) {
            if (pictures.length <= startFrom) {
                pictures = movie?.images.slice(0, nbToShow);
            } else {
                pictures = movie?.images.slice(startFrom, nbToShow + startFrom);
            }
            return (
                <>
                    {pictures?.map((picture, index) => (
                        <img
                            key={picture.file_path}
                            src={ConfigService.themoviedb.urls.image_view + "/original" + picture.file_path}
                            alt={picture.file_path}
                            className={`${index === 0 ? 'h-100 grow' : 'h-36'} m-2 rounded-xl`} />
                    ))}
                </>
            );
        } else {
            return <InsertPhotoTwoToneIcon fontSize="large" />;
        }
    }

    return(
        <div className="flex flex-row flex-wrap justify-center items-center">
            {showPictures()}
        </div>
    );
}

export default PicturesShowcase;
