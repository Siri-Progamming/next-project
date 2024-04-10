import React, {useEffect, useState} from "react";
import VerticalItemsShowcase from "../../../src/components/Showcase/VerticalItemsShowcase";
import {useSerieFilter} from "../../../src/contexts/SerieFilterContext";
import {getMediaSearch} from "../../../src/services/API/call.api.service";
import {createMediaCardPropsFromSerie} from "../../../src/services/API/object.creator.service";
import {MediaSearchState, MediaCardProps} from "../../../src/interfaces/UI";

const search: React.FC = () => {
    const {query} = useSerieFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;

    const [mediaCards, setMediaCards] = useState<Array<MediaCardProps>>([])
    const [urlApi, setUrlApi] = useState<string>("");
    const [mediaSearchState, setMediaSearchState] = useState<MediaSearchState>({isSearchEmpty: false, isLoading: true, nbPages: 0, nbResults: 0});
    const initMediaCards = async (page?:number) => {
        let url = urlApi;
        if(page){
            console.log("series search initSeries - page : ",page);
            url = urlApi.replace(/(page=)\d+/, `$1${page}`);
        }
        console.log("series search initMediaCards urlAPI : ",url);
        const results = await getMediaSearch(url);
        console.log("results : ",results);
        const items = results.results;
        console.log("items : ",items);
        if (items && items.length > 0) {
            setMediaSearchState({...mediaSearchState, isSearchEmpty: false, nbPages: results.total_pages, nbResults: results.total_results});
            let tempSeries: Array<MediaCardProps> = [];
            for(const item of items) {
                tempSeries.push(createMediaCardPropsFromSerie(item))
            }
            setMediaCards(tempSeries);
        }else{
            setMediaSearchState({...mediaSearchState, isSearchEmpty: true});
        }
    }
    const handlePageChange = async (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        initMediaCards(pageNumber).then();
    }

    useEffect(() => {
        if (query){
            setSearchQuery(query);
        }
    }, [query]);

    //Pour re-render le composant à chaque changement de la query
    useEffect(() => {
        setUrlApi("/api/series/search?query="+searchQuery);
    }, [searchQuery]);

    useEffect(() => {
       if(urlApi !== ""){
           console.log("series filter search - urlApi : ", urlApi);
           initMediaCards().then();
       }
    } , [urlApi]);

    useEffect(() => {
        console.log("series filter search - mediaCards before if : ", mediaCards);
        if(mediaCards.length > 0){
            console.log("series filter search - mediaCards : ", mediaCards);
            setMediaSearchState({...mediaSearchState,isLoading:false, isSearchEmpty: false});
        }else if(mediaCards.length === 0 && mediaSearchState.isSearchEmpty){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:true});
        }
    } , [mediaCards]);

    useEffect(() => {
        if(isSearch){

        }
    }, [isSearch]);

    useEffect(() => {
        console.log("series filter search isLoading : ", mediaSearchState.isLoading);
        console.log("series filter search isSearchEmpty : ", mediaSearchState.isSearchEmpty);
        }, [mediaSearchState]);

    return(
        <main>
            {isSearch ?
                <VerticalItemsShowcase medias={mediaCards} mediaSearchState={mediaSearchState} title = "résultats : " searchQuery={query} handlePageChange={handlePageChange} />
                :
                 <h1>Effectuez une recherche.</h1>
            }
        </main>
    );
}
export default search;
