import React from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie} from "../../interfaces/movie";
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
            <ul className=" flex flex-wrap justify-center gap-3">
                {casts?.slice(0, nbToShow).map(cast => (

                    <li key={cast.id} className="flex-column relative w-[95px] min-w-[95px] transform transition-transform hover:scale-125 hover:z-[10] hover:backdrop-blur-lg">
                        <div
                            className="h-[130px] rounded-xl"
                            style={{
                                backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + cast.profile_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                        </div>
                        <div className="pt-2 text-white">
                            <p className="text-white font-bold">{cast.name}</p>
                            <p className="text-white"><span className="italic">as</span> {cast.character}</p>
                        </div>
                    </li>


                ))}
            </ul>
        </div>
    );
}
export default PeopleShowcase;
