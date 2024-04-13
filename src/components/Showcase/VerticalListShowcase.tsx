import React, {useEffect, useRef, useState} from "react";
import {Movie} from '../../interfaces/Movie';
import MediaCard from "../Cards/MediaCard";
import { createMovie } from "../../services/API/object.creator.service";
import {getMediaSearch,getMoviesLiked} from "../../services/API/call.api.service";
import Loader from "../utils/Loader";
import {useAuth} from "../../contexts/AuthContext";
import {useConstantes} from "../../contexts/ConstantesContext";
import Paginations from "../utils/Paginations";
interface VerticalListShowcase {
    api: string;
    title: string;
    searchQuery?: string;
}
const VerticalListShowcase: React.FC<VerticalListShowcase> = ({api, title, searchQuery}) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [resultsNb, setResultsNb] = useState<number>(0);
    const [pagesNb, setPagesNb] = useState<number>(0);
    const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let urlApi = api+searchQuery
    const anchor = useRef<HTMLDivElement>(null);

    const initMovies = async (page?:number) => {
        if(page){
            console.log("initMovies - page : ",page);
            urlApi = urlApi.replace(/(page=)\d+/, `$1${page}`);
        }
        console.log("urlAPI : ",urlApi);
        const results = await getMediaSearch(urlApi);
        const items = results.results;
        if (items && items.length > 0) {
            setIsSearchEmpty(false);
            setPagesNb(results.total_pages);
            setResultsNb(results.total_results);
            let tempMovies: Array<Movie> = [];
            for(const item of items) {
                tempMovies.push(createMovie(item))
            }
            setMovies(tempMovies);
        }else{
            setIsSearchEmpty(true);
        }
    }

    useEffect(() => {
        initMovies().then();
    }, []);

    //Pour re-render le composant à chaque changement de la query
    useEffect(() => {
        initMovies().then();
    }, [searchQuery]);

    useEffect(() => {
        if(movies.length > 0){
            setIsLoading(false);
            setIsSearchEmpty(false);
        }else if(movies.length === 0 && isSearchEmpty){
            setIsLoading(false);
        }else{
            setIsLoading(true);
        }
    }, [movies]);

    const handlePageChange = async (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        initMovies(pageNumber).then();
        if (anchor.current) {
            anchor.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
        {
            isLoading ?
                <div className="flex justify-center items-center h-screen"><Loader/></div>
                    : isSearchEmpty ?
                        <div className="flex justify-center items-center h-screen mt-[10vh]">{"La recherche n'a retourné aucun résultat."}</div>
                        :
                        <div className="category_movies mt-[10vh] flex flex-col justify-center items-center">
                            <h1 className="category_title self-start" ref={anchor}>{String(resultsNb)} {title}</h1>
                            <ul id="vertical-list-showcase" className="">
                                {movies.map(movie => (
                                    <MediaCard key={movie.id} type={0} id={movie.id} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} poster_path={movie.poster_path}/>
                                ))}
                            </ul>
                            <div className="sticky bottom-0 z-[999] h-fit w-screen flex flex-row items-center justify-center">
                                <Paginations pages={pagesNb} handlePageChange={handlePageChange}/>
                            </div>
                        </div>
        }
        </>
    );
}
export default VerticalListShowcase;
