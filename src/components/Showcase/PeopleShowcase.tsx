import React from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie} from "../../interfaces/Movie";
import {Cast} from "../../interfaces/Cast";
import {showNoImage} from "../Skeleton/NoData/NoImage";
interface MoviesProps {
    casts:Array<Cast> | [];
    nbToShow: number;
    title: string;
}
const PeopleShowcase: React.FC<MoviesProps> = ({casts, nbToShow, title}) => {
    return (
        <div className="">
            <h1 className="category_title">{title}</h1>
            {casts ?
                casts.length > 0 ?
                    showCast(casts)
                    :
                    <p>{"Nous n'avons pas d'informations concernant cette rubrique."}</p>
                :
                <p>Chargement...</p>
            }
        </div>
    );

    function showCast(casts: Cast[]) {
        return (
            <div className="relative">
                <ul className="flex overflow-x-auto min-h-fit space-x-4 pb-4">
                    {casts?.slice(0, nbToShow).map(cast => (
                        <li key={cast.id}
                            className="flex-column relative min-w-[110px] max-w-[110px]">
                            {cast.profile_path ? showImage(cast) : showNoImage("min-w-[110px] max-w-[110px]", "h-[160px]", "text-[75px]", "rounded-xl")}
                            <div className="pt-2 leading-none">
                                <p className="text-sm font-semibold">{cast.name}</p>
                                <p className="font-light text-xs text-white text-opacity-50"><span
                                    className="font-extralight">as</span> {cast.character}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

    function showImage(cast: Cast) {
        return (
            <div
                className="h-[160px] rounded-xl cursor-pointer"
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
