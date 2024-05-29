import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {getFullActor} from "../../../src/services/API/call.api.service";
import {createFullActor} from "../../../src/services/API/object.creator.service";
import {ConfigService} from "../../../src/services/IMDB.API/config.service";
import Loader from "../../../src/components/utils/Loader";
import {showNoImage} from "../../../src/components/Skeleton/NoData/NoImage";
import {useConstantes} from "../../../src/contexts/ConstantesContext";
import {FullActor} from "../../../src/interfaces/People";
import HorizontalItemsShowcase from "../../../src/components/Showcase/HorizontalItemsShowcase";
import {MediaCardProps} from "../../../src/interfaces/UI";
import {countSpaces, movieTitleSize} from "../movies/[idMovie]";
import {MEDIA_TYPES} from "../../../src/constantes/app_constantes";

const IdPeople: React.FC = ({}) => {
    const router = useRouter();
    const {idPeople} = router.query;
    const [people, setPeople] = useState<FullActor | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {DISPLAY_LANGUAGE} = useConstantes();
    const [movies, setMovies] = useState<Array<MediaCardProps>>([]);
    const [series, setSeries] = useState<Array<MediaCardProps>>([]);

    const initPeople = async () => {
        const people = await getFullActor(DISPLAY_LANGUAGE, Number(idPeople as string));
        if (people != null) {
            setPeople(createFullActor(people));
        }
    }

    const sortMovies = () => {
        const movies_cc = people?.combined_credits
            .filter(credit => credit.media_type === 'movie')
            .sort((a, b) => {
                    //ALGO POPULARITE / ROLE
                    const ratioA = popularityOrderRoleRatio(a.popularity, a.order!)
                    const ratioB = popularityOrderRoleRatio(b.popularity, b.order!)
                    if (ratioA > ratioB) {
                        return -1;
                    } else {
                        return 1;
                    }
                    //ALGO NORMAL
                    // if (a.popularity > b.popularity) {
                    //     return -1;
                    // } else {
                    //     return 1;
                    // }
                }
            )
        if(movies_cc && movies_cc.length > 0){
            let tempMovies:Array<MediaCardProps> = [];
            tempMovies =  movies_cc.map(movie => ({
                id: movie.id,
                type: movie.media_type,
                title: movie.title!,
                release_date: movie.release_date!,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                poster_path: movie.poster_path,
                character: movie.character,
                roleOrder: movie.order
            }))
            setMovies(tempMovies);
        }
    }
    const sortSeries = () => {
        const series_cc = people?.combined_credits
            .filter(credit => credit.media_type === 'tv')
            // .sort((a, b) => (a.release_date ? a.release_date : a.first_air_date) > (b.release_date ? b.release_date : b.first_air_date) ? -1 : 1)
            .sort((a, b) => {
                const ratioA = popularityEpisodesRatio(a.popularity, a.episode_count!)
                const ratioB = popularityEpisodesRatio(b.popularity, b.episode_count!)
                if (ratioA > ratioB) {
                    return -1;
                } else {
                    return 1;
                }
            })
        if (series_cc && series_cc.length > 0) {
            let tempMedias:Array<MediaCardProps> = [];
            tempMedias =  series_cc.map(serie => ({
                id: serie.id,
                type: serie.media_type,
                title: serie.name!,
                release_date: serie.first_air_date!,
                vote_average: serie.vote_average,
                vote_count: serie.vote_count,
                poster_path: serie.poster_path,
                character: serie.character,
                nbEpisodes: serie.episode_count
            }))
            setSeries(tempMedias);
        }
    }

    useEffect(() => {
        if (idPeople) {
            setIsLoading(true);
            initPeople().then();
        }
    }, [idPeople]);

    useEffect(() => {
        if (people?.id == idPeople) {
            sortMovies();
            sortSeries();
        } else {
            setIsLoading(true);
        }
    }, [people]);

    useEffect(() => {
        if((movies.length == people?.combined_credits.filter(credit => credit.media_type === 'movie').length)
            && (series.length == people?.combined_credits.filter(credit => credit.media_type === 'tv').length)){
            setIsLoading(false);
        }
    }, [movies, series]);

    return (
        <main id="main_movie_page">
            {isLoading ?
                <div className="flex justify-center items-center h-screen"><Loader/></div>
                :
                <div className="movie_page relative mt-[10vh] ml-[20vw] mr-[20vw]">
                    biography: {people?.biography}<br/>
                    birthday: {people?.birthday}<br/>
                    âge : {convertBirthdayToAge(people?.birthday!)}<br/>
                    deathday: {people?.deathday}<br/>
                    known_for_department: {people?.known_for_department}<br/>
                    name: {people?.name}<br/>
                    place_of_birth: {people?.place_of_birth}<br/>
                    popularity: {people?.popularity}<br/>
                    profile_path: {people?.profile_path}<br/>
                    <HorizontalItemsShowcase type={MEDIA_TYPES.movie} title="Médiathèque : " movies={movies} series={series} />
                </div>
            }
        </main>
    )
}
export default IdPeople;

function popularityOrderRoleRatio(popularity: number, orderRole: number) {
    orderRole += 1;
    return (popularity / orderRole) + (popularity - (orderRole * 1));
}
function popularityEpisodesRatio(popularity: number, episodes: number) {
    return (popularity * episodes);
}
function convertBirthdayToAge(birthday: string) {
    if (birthday === null || birthday === undefined) return "NaN";
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if(age > 1){
        return age + " ans";
    }else{
        return age + " an";
    }
}
