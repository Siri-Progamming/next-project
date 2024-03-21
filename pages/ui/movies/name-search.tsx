import React, {useEffect, useState} from "react";
import VerticalListShowcase from "../../../src/components/Showcase/VerticalListShowcase";
import {useRouter} from "next/router";

interface searchProps {
}
const nameSearch: React.FC<searchProps> = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const isSearch = searchQuery !== '' && searchQuery.trim().length > 0;

    useEffect(() => {
        const { query } = router.query;
        if (query){
            setSearchQuery(query as string);
        }
    }, [router.query]);

    useEffect(() => {
        // console.log("nameSearch - searchQuery : ", searchQuery);
    }, [searchQuery]);

    return(
        <main>
            {isSearch ? <VerticalListShowcase api="/api/movies/search" title = "Résultats de la recherche : " searchQuery={searchQuery} /> : <h1>Effectuez une recherche.</h1>}
        </main>
    );
}
export default nameSearch;
