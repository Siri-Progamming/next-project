import React, {useEffect, useState} from "react";
import {useMovieFilter} from "../../../src/contexts/MovieFilterContext";
import {MediaCardProps, MediaSearchState} from "../../../src/interfaces/UI";
import {getMediaSearch} from "../../../src/services/API/call.api.service";
import {createMediaCardPropsFromMovie} from "../../../src/services/API/object.creator.service";
import Loader from "../../../src/components/utils/Loader";
import VerticalItemsShowcase from "../../../src/components/Showcase/VerticalItemsShowcase";

interface searchProps {
}
const Search: React.FC<searchProps> = () => {
    const {queryData, setQueryData} = useMovieFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;

    const [mediaCards, setMediaCards] = useState<Array<MediaCardProps>>([])
    const [urlApi, setUrlApi] = useState<string>('');
    const [mediaSearchState, setMediaSearchState] = useState<MediaSearchState>({isSearchEmpty: false, isLoading: true, nbPages: 0, nbResults: 0});
    const [starterLoader, setStarterLoader] = useState<boolean>(true);

    const initMediaCards = async () => {
        console.log("Initilaizing media cards for MOVIES/SEARCH");
        let url = urlApi;

        console.log("movies search initMediaCards urlAPI : ",url);
        const results = await getMediaSearch(url);
        console.log("results : ",results);
        const items = results.results;
        // console.log("items : ",items);
        if (items && items.length > 0) {
            setMediaSearchState({...mediaSearchState, isSearchEmpty: false, nbPages: results.total_pages, nbResults: results.total_results});
            setQueryData({...queryData, nbPages: results.total_pages, nbResults: results.total_results});
            let tempSeries: Array<MediaCardProps> = [];
            for(const item of items) {
                tempSeries.push(createMediaCardPropsFromMovie(item))
            }
            setMediaCards(tempSeries);
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:false, isSearchEmpty: true});
        }
    }

    const handlePageChange = async (e: React.ChangeEvent<unknown>, pageNumber: number) => {
        setQueryData({...queryData, activePage: pageNumber})
    }

    useEffect(() => {
        setTimeout(() => {
            setStarterLoader(false);
        } , 500);
    }, []);

    useEffect(() => {
        // console.log("series filter search - queryData : ", queryData);
        if (queryData.query && queryData.query !== ''){
            setSearchQuery(queryData.query);
        }
    }, [queryData]);

    useEffect(() => {
        // console.log("series filter search - searchQuery : ", searchQuery);
        if(isSearch){
            setUrlApi("/api/discover?query="+searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
        if(urlApi !== ""){
            console.log("movies filter search - urlApi : ", urlApi);
            initMediaCards().then();
        }
    } , [urlApi]);

    useEffect(() => {
        // console.log("series filter search - mediaCards before if : ", mediaCards);
        if(isSearch && mediaCards.length > 0){
            // console.log("series filter search - mediaCards : ", mediaCards);
            setMediaSearchState({...mediaSearchState,isLoading:false, isSearchEmpty: false});
        }else if(isSearch && mediaCards.length === 0 && mediaSearchState.isSearchEmpty){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:true});
        }
    } , [mediaCards]);

    useEffect(() => {
        console.log("series filter search isLoading : "+mediaSearchState.isLoading+" - isSearchEmpty : "+mediaSearchState.isSearchEmpty);
    }, [mediaSearchState]);

    return(
        <main>
            {starterLoader ?
                <div className="flex justify-center items-center h-[80vh] mt-[10vh]"><Loader/></div>
                :
                isSearch ?
                    <VerticalItemsShowcase medias={mediaCards} mediaSearchState={mediaSearchState} title="résultats : "
                                           activePage={queryData.activePage} handlePageChange={handlePageChange}/>
                    :
                    <h1>Effectuez une recherche.</h1>
            }
        </main>
    );
}
export default Search;
