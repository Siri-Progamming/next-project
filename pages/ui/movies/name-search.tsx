import React, {useEffect, useState} from "react";
import VerticalListShowcase from "../../../src/components/Showcase/VerticalListShowcase";
import {useRouter} from "next/router";
import {useNameSearch} from "../../../src/contexts/NameSearchContext";

interface searchProps {
}
const nameSearch: React.FC<searchProps> = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;
    const {query,fullQuery} = useNameSearch();

    useEffect(() => {
        if (fullQuery){
            setSearchQuery(fullQuery);
        }
    }, [fullQuery]);

    useEffect(() => {
        console.log("nameSearch - searchQuery : ", searchQuery);
    }, [searchQuery]);

    return(
        <main>
            {isSearch ? <VerticalListShowcase api="/api/movies/search" title = "Résultats de la recherche : " searchQuery={searchQuery} /> : <h1>Effectuez une recherche.</h1>}
        </main>
    );
}
export default nameSearch;
