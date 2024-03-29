import React from "react";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {FullMovie, Movie} from "../../interfaces/Movie";
import {useRouter} from "next/router";
import {showNoImage} from "../Skeleton/NoData/NoImage";

interface SimilarShowcaseProps {
    movie: FullMovie | null;
    nbToShow: number;
    title: string;
}

const SimilarShowcase: React.FC<SimilarShowcaseProps> = ({movie, nbToShow, title}) => {
   let similars;
    {title === "Similar" ?  similars = movie?.similar : similars = movie?.recommendations}
    const router = useRouter();
    const handleClick = (idMovie:number) => {
        router.push('/ui/movies/'+idMovie);
    };

    return (
        <div className="">
            <h1 className="category_title">{title}</h1>
            <ul className=" flex flex-wrap  justify-center gap-3">
                {similars?.slice(0, nbToShow).map(similar => (
                    <li key={similar.id} className="flex-column relative w-[110px] cursor-pointer transform transition-transform hover:scale-110 hover:z-[10]" onClick={() => handleClick(similar.id)}>
                        {similar.poster_path ? showImage(similar) : showNoImage("w-[110px]", "h-[160px]", "text-[90px]", "rounded-xl")}
                        <div className="pt-2 text-white absolute bottom-[15px] left-[10px] pr-[10px]">
                            {/*<p className="text-white"></p>*/}
                            {/*<p className="text-white bold font-bold text-xs bg-black bg-opacity-80">{similar.title.toUpperCase()}</p>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    function showImage(similar: Movie){
        return (
            <div
                className="h-[160px] rounded-xl "
                style={{
                    backgroundImage: `url(${ConfigService.themoviedb.urls.image_view + "/w220_and_h330_face" + similar.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
        )
    }
}
export default SimilarShowcase;
