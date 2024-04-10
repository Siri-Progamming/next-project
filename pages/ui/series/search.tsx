import React, {useEffect, useState} from "react";
import VerticalListShowcase from "../../../src/components/Showcase/VerticalListShowcase";
import {useSerieFilter} from "../../../src/contexts/SerieFilterContext";
interface searchProps {
}
const search: React.FC<searchProps> = () => {
    const {query} = useSerieFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;

    useEffect(() => {
        if (query){
            setSearchQuery(query);
        }
    }, [query]);

    useEffect(() => {
        // console.log("search - searchQuery : ", searchQuery);
    }, [searchQuery]);

    return(
        <main>
            {isSearch ? <VerticalListShowcase api="/api/series/search" title = "résultats : " searchQuery={query} /> : <h1>Effectuez une recherche.</h1>}
        </main>
    );
}
export default search;
