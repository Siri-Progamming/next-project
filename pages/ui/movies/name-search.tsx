import React, {useEffect, useState} from "react";
import {useNameSearch} from "../../../src/contexts/NameSearchContext";
import {MediaCardProps, MediaSearchState} from "../../../src/interfaces/UI";
import {getMediaSearch} from "../../../src/services/API/call.api.service";
import {
    createMediaCardPropsFromMovie,
    createMediaCardPropsFromSerie
} from "../../../src/services/API/object.creator.service";
import Loader from "../../../src/components/utils/Loader";
import VerticalItemsShowcase from "../../../src/components/Showcase/VerticalItemsShowcase";

interface searchProps {
}
const NameSearch: React.FC<searchProps> = () => {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const {query,setQuery} = useNameSearch();
    const [mediaCards, setMediaCards] = useState<Array<MediaCardProps>>([])
    const [urlApi, setUrlApi] = useState<string>('');
    const [mediaSearchState, setMediaSearchState] = useState<MediaSearchState>({isSearchEmpty: false, isLoading: true, nbPages: 0, nbResults: 0});
    const [starterLoader, setStarterLoader] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<number>(1);
    const initMediaCards = async () => {
        // console.log("Initilaizing media cards for MOVIES/NAME-SEARCH");
        // console.log("name-search initMediaCards urlAPI : ",urlApi);
        const results = await getMediaSearch(urlApi);
        // console.log("results : ",results);
        const items = results.results;
        // console.log("items : ",items);
        if (items && items.length > 0) {
            setMediaSearchState({...mediaSearchState, isSearchEmpty: false, nbPages: results.total_pages, nbResults: results.total_results});
            let tempMedias: Array<MediaCardProps> = [];
            for(const item of items) {
                if(item.media_type === "tv"){
                    tempMedias.push(createMediaCardPropsFromSerie(item))
                }else{
                    tempMedias.push(createMediaCardPropsFromMovie(item))
                }
            }
            setMediaCards(tempMedias);
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:false, isSearchEmpty: true});
        }
    }

    const handlePageChange = async (e: React.ChangeEvent<unknown>, pageNumber: number) => {
        let queryy = query;
        if(pageNumber){
            queryy = queryy.replace(/(page=)\d+/, `$1${pageNumber}`);
        }
        setQuery(queryy);
        setActivePage(pageNumber);
    }

    useEffect(() => {
        setTimeout(() => {
            setStarterLoader(false);
        } , 500);
    }, []);

    useEffect(() => {
        if(query && query !== ''){
            setIsSearch(true);
            setUrlApi("/api/movies/search?query="+query);
        }else{
            setIsSearch(false);
        }
    }, [query]);

    useEffect(() => {
        if(urlApi !== ""){
            setActivePage(urlApi.search("page=") ? parseInt(urlApi.split("page=")[1]) : 1);
            initMediaCards().then();
        }
    } , [urlApi]);

    useEffect(() => {
        if(isSearch && mediaCards.length > 0){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else if(isSearch && mediaCards.length === 0 && mediaSearchState.isSearchEmpty){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:true});
        }
    } , [mediaCards]);

    useEffect(() => {
        // console.log("series filter search isLoading : "+mediaSearchState.isLoading+" - isSearchEmpty : "+mediaSearchState.isSearchEmpty);
    }, [mediaSearchState]);


    return(
        <main>
            {starterLoader ?
                <div className="flex justify-center items-center h-[80vh] mt-[10vh]"><Loader/></div>
                :
                isSearch ?
                    <VerticalItemsShowcase medias={mediaCards} mediaSearchState={mediaSearchState} title="résultats : "
                                           activePage={activePage} handlePageChange={handlePageChange}/>
                    :
                    <div className="mt-[10vh]"><h1>Effectuez une recherche.</h1></div>
                        }
                    </main>
                );
            }
            export default NameSearch;
