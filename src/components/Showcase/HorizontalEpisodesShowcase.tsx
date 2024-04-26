import React from "react";
import {Season} from "../../interfaces/Serie";
import Image from "next/image";
import {ConfigService} from "../../services/IMDB.API/config.service";
import NoImage, {showNoImage} from "../Skeleton/NoData/NoImage";

interface HorizontalEpisodeShowcaseProps{
    seasons:Array<Season>
}
const HorizontalEpisodeShowcase: React.FC<HorizontalEpisodeShowcaseProps> = ({seasons}) => {
    const [activeSeason, setActiveSeason] = React.useState<number>(0);

    const changeActiveSeason = (index:number) => {
        if(index != activeSeason){
            setActiveSeason(index);
        }else{
            setActiveSeason(-1);
        }

    }
    return (
        <div className="relative mt-[3vh]">
            <div className="ml-[3vw] mr-[3vw] ">
                <div className="overflow-x-auto">
                    <ul className="flex flex-row gap-x-4">
                        {sortSeasons(seasons).map((season, index) => (
                            <li key={index} onClick={() => changeActiveSeason(index)} className="cursor-pointer">
                                <p>{season.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="overflow-x-auto">
                    <ul className="flex flex-row gap-x-4 mb-4 mt-4">

                        {(activeSeason != -1 && seasons[activeSeason].episodes?.length == 0) && (seasons[activeSeason].air_date === null ? "Coming soon !" : "Coming soon => " + seasons[activeSeason].air_date)}

                        {(activeSeason != -1 && seasons[activeSeason].episodes?.length > 0) && seasons[activeSeason].episodes.map((episode, index) => (
                            <li key={index} className="">
                                <div className="relative w-[300px] h-[180px]">
                                    {episode.still_path == null ?
                                        showNoImage("w-[300px]", "h-[180px]", "text-[150px]", "rounded-sm")
                                        :
                                        <Image
                                            src={ConfigService.themoviedb.urls.image_view + "/original" + episode.still_path}
                                            alt={"Image of " + episode.name} fill={true} className="rounded-sm"/>}
                                </div>

                                <div className="pt-2 leading-none">
                                    <p className="font-light text-xs text-white text-opacity-50">Episode {episode.episode_number}</p>
                                    <p className="text-sm font-semibold">{episode.name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default HorizontalEpisodeShowcase;

function sortSeasons(seasons: Season[]) {
    return seasons.sort((a, b) => {
        if (a.season_number === 0 && b.season_number !== 0) {
            return 1;
        } else if (a.season_number !== 0 && b.season_number === 0) {
            return -1;
        } else {
            return a.season_number - b.season_number;
        }
    });
}
