import React from "react";
import {Season} from "../../interfaces/Serie";
import Image from "next/image";
import {ConfigService} from "../../services/IMDB.API/config.service";
import {showNoImage} from "../Skeleton/NoData/NoImage";

interface HorizontalEpisodeShowcaseProps {
    seasons: Array<Season>
}

const HorizontalEpisodeShowcase: React.FC<HorizontalEpisodeShowcaseProps> = ({seasons}) => {
    const [activeSeason, setActiveSeason] = React.useState<number>(0);

    const changeActiveSeason = (index: number) => {
        if (index != activeSeason) {
            setActiveSeason(index);
        } else {
            setActiveSeason(-1);
        }

    }
    return (
        <div className="relative mt-[3vh]">
            <div className="ml-[3vw] mr-[3vw] ">
                {/*SAISONS*/}
                <div className="overflow-x-auto">
                    <ul className="flex flex-row gap-x-4">
                        {sortSeasons(seasons).map((season, index) => (
                            <li key={index} onClick={() => changeActiveSeason(index)} className="cursor-pointer">
                                <p>{season.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {/*EPISODES*/}
                <div className="mt-4">
                    <p>{formatDateFR(seasons[activeSeason].air_date)} | {seasons[activeSeason].episode_count} épisodes</p>
                    <ul className="flex flex-row gap-x-4 pb-4 pt-4 overflow-x-auto">
                        {(activeSeason != -1 && seasons[activeSeason].episodes?.length == 0) && (seasons[activeSeason].air_date === null ? "Coming soon !" : "Coming soon => " + seasons[activeSeason].air_date)}

                        {(activeSeason != -1 && seasons[activeSeason].episodes?.length > 0) && seasons[activeSeason].episodes.map((episode, index) => (
                            <li key={index+"-"+activeSeason+seasons} className="">
                                <div className="relative w-[300px] h-[180px]">
                                    {episode.still_path == null ?
                                        showNoImage("w-[300px]", "h-[180px]", "text-[150px]", "rounded-sm")
                                        :
                                        <Image
                                            src={ConfigService.themoviedb.urls.image_view + "/original" + episode.still_path}
                                            alt={"Image of " + episode.name} fill={true} className="rounded-sm"
                                            />}
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

function formatDateFR(date: string | null) {
    if (date === null) return "Coming soon !";
    let theDate = new Date(date).toLocaleDateString('fr-FR');
    let day = theDate.split("/")[0];
    let month = theDate.split("/")[1];
    let year = theDate.split("/")[2];
    switch (month) {
        case "1":
        case "01":
            month = "Janvier";
            break;
        case "2":
        case "02":
            month = "Février";
            break;
        case "3":
        case "03":
            month = "Mars";
            break;
        case "4":
        case "04":
            month = "Avril";
            break;
        case "5":
        case "05":
            month = "Mai";
            break;
        case "6":
        case "06":
            month = "Juin";
            break;
        case "7":
        case "07":
            month = "Juillet";
            break;
        case "8":
        case "08":
            month = "Août";
            break;
        case "9":
        case "09":
            month = "Septembre";
            break;
        case "10":
            month = "Octobre";
            break;
        case "11":
            month = "Novembre";
            break;
        case "12":
            month = "Décembre";
            break;
    }
    theDate = month + " " + year;
    return theDate;
}
