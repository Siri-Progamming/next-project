import React, {useEffect, useState} from "react";
import VerticalItemsShowcase from "../../../src/components/Showcase/VerticalItemsShowcase";
import {useSerieFilter} from "../../../src/contexts/SerieFilterContext";
import {getMediaSearch} from "../../../src/services/API/call.api.service";
import {createMediaCardPropsFromSerie} from "../../../src/services/API/object.creator.service";
import {MediaSearchState, MediaCardProps} from "../../../src/interfaces/UI";
import Loader from "../../../src/components/utils/Loader";
//UI / SERIES / SEARCH
//TODO MEME PAGE QUE MOVIES/SEARCH
const Search: React.FC = () => {
    const {queryData, setQueryData} = useSerieFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;
    const [mediaCards, setMediaCards] = useState<Array<MediaCardProps>>([])
    const [urlApi, setUrlApi] = useState<string>('');
    const [mediaSearchState, setMediaSearchState] = useState<MediaSearchState>({isSearchEmpty: false, isLoading: true, nbPages: 0, nbResults: 0});
    const [starterLoader, setStarterLoader] = useState<boolean>(true);

    const initMediaCards = async () => {
        let url = urlApi;

        // console.log("series search initMediaCards urlAPI : ",url);
        const results = await getMediaSearch(url);
        // console.log("results : ",results);
        const items = results.results;
        // console.log("items : ",items);
        if (items && items.length > 0) {
            setMediaSearchState({...mediaSearchState, isSearchEmpty: false, nbPages: results.total_pages, nbResults: results.total_results});
            setQueryData({...queryData, nbPages: results.total_pages, nbResults: results.total_results});
            let tempSeries: Array<MediaCardProps> = [];
            for(const item of items) {
                tempSeries.push(createMediaCardPropsFromSerie(item))
            }
            setMediaCards(tempSeries);
        }else{
            setMediaSearchState({...mediaSearchState, isLoading:false, isSearchEmpty: true});
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

    //Pour re-render le composant à chaque changement de la query
    useEffect(() => {
        // console.log("series filter search - searchQuery : ", searchQuery);
        if(isSearch){
            setUrlApi("/api/series/search?query="+searchQuery);
        }
    }, [searchQuery]);

    useEffect(() => {
       if(urlApi !== ""){
           console.log("series filter search - urlApi : ", urlApi);
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
