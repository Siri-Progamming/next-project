import React, {useEffect, useState} from "react";
import VerticalListShowcase from "../../../src/components/Showcase/VerticalListShowcase";
import {useRouter} from "next/router";
import {useMovieFilter} from "../../../src/contexts/MovieFilterContext";

interface searchProps {
}
const search: React.FC<searchProps> = () => {
    const router = useRouter();
    const {query} = useMovieFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;

    useEffect(() => {
        // @ts-ignore
        if (query){
            setSearchQuery(query);
        }
    }, [query]);

    useEffect(() => {
        console.log("nameSearch - searchQuery : ", searchQuery);
    }, [searchQuery]);

    return(
        <main>
            {isSearch ? <VerticalListShowcase api="/api/discover" title = "Résultats de la recherche : " searchQuery={searchQuery} /> : <h1>Effectuez une recherche.</h1>}
        </main>
    );
}
export default search;
