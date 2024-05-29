import React, {useState} from "react";
import MediaCard from "../Cards/MediaCard";
import Switch from "../Forms/Filters/Switch";
import {MediaCardProps} from "../../interfaces/UI";

interface HorizontalListShowcaseProps {
    type: string;
    title: string;
    movies?: Array<MediaCardProps> | [];
    series?: Array<MediaCardProps> | [];
}

const HorizontalItemsShowcase: React.FC<HorizontalListShowcaseProps> = ({type, title, movies, series}) => {
    const [elementToDisplay, setElementToDisplay] = useState<number>(0); // 0 for movies, 1 for series

    const handleSwitchElement = (element: string) => {
        setElementToDisplay(element === "Films" ? 0 : 1);
    }

    return (
        <div className="flex flex-col">
            <div className="divider after:bg-accent-500 after:bg-opacity-50 after:h-[4px] divider-start "><h1 className="category_title min-w-full sm:min-w-fit">{title}</h1></div>
            <Switch elements={["Films", "Séries"]} onSelect={handleSwitchElement}/>
            <div className="relative">
                <ul id="movies-horizontal-showcase"
                    className="flex space-x-4 pb-5 pt-4 pl-4 pr-4 horizontal-fading">
                    {((elementToDisplay === 0 && movies && movies.length > 0)) && showMedias(movies)}
                    {(elementToDisplay === 1 && series && series.length > 0) && showSeries(series)}
                </ul>
            </div>
        </div>
    );
}
function showMedias(movies: Array<MediaCardProps>) {
    return (
        movies.map((movie,index) => (
            <MediaCard key={movie.id+'-'+index} media={movie} showMediaType={false}/>
        ))
    )
}
function showSeries(series: Array<MediaCardProps>) {
    return (
        series.map((serie,index) => (
            <MediaCard key={serie.id+'-'+index} media={serie} showMediaType={false}/>
        ))
    )
}
export default HorizontalItemsShowcase;
