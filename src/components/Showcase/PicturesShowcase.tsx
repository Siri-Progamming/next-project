import React from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie} from "../../interfaces/movie";

interface PicturesShowProps {
    movie: FullMovie | null;
    nbToShow: number;
}

const PicturesShowcase: React.FC<PicturesShowProps> = ({movie, nbToShow}) => {
    const pictures = movie?.images;
    return(
        <div className="flex flex-row flex-wrap justify-center items-center">
            {pictures?.slice(1, nbToShow+1).map((picture, index) => (
                <img
                    key={picture.file_path}
                    src={ConfigService.themoviedb.urls.image_view + "/original" + picture.file_path}
                    alt={picture.file_path}
                    className={`${index === 0 ? 'h-100 grow' : 'h-36'} m-2 rounded-xl`}/>
                ))}
        </div>
    );
}

export default PicturesShowcase;
