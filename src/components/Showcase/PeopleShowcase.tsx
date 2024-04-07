import React from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie} from "../../interfaces/Movie";
import {Cast} from "../../interfaces/Cast";
import {showNoImage} from "../Skeleton/NoData/NoImage";
interface MoviesProps {
    movie: FullMovie | null;
    nbToShow: number;
    title: string;
}
const PeopleShowcase: React.FC<MoviesProps> = ({movie, nbToShow, title}) => {
    const casts = movie?.cast;
    return (
        <div className="">
            <h1 className="category_title">{title}</h1>
            <ul className=" flex flex-wrap gap-3">
                {casts?.slice(0, nbToShow).map(cast => (
                    <li key={cast.id}
                        className="flex-column relative min-w-[95px] max-w-[95px] transform transition-transform hover:scale-125 hover:z-[10] hover:backdrop-blur-lg">
                        {cast.profile_path ? showImage(cast) : showNoImage("min-w-[95px] max-w-[95px]", "h-[130px]", "text-[75px]", "rounded-xl")}
                        <div className="pt-2 leading-none">
                            <p className="text-sm font-semibold">{cast.name}</p>
                            <p className="font-light text-xs text-white text-opacity-50"><span className="font-extralight">as</span> {cast.character}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    function showImage(cast: Cast) {
        return (
            <div
                className="h-[130px] rounded-xl"
                style={{
                    backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + cast.profile_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
        )
    }
}
export default PeopleShowcase;
