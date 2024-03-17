import React, {useEffect, useState} from "react";
import {render} from "@testing-library/react";
import VerticalListShowcase from "../../../src/components/Showcase/VerticalListShowcase";
import {useRouter} from "next/router";

interface searchProps {
}
const search: React.FC<searchProps> = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [previousSearchQuery, setPreviousSearchQuery] = useState('');

    useEffect(() => {
        const { query } = router.query;
        if (query && query !== previousSearchQuery){
            setSearchQuery(query as string);
            setPreviousSearchQuery(query as string);
        }
    }, [router.query]);

    useEffect(() => {
        console.log("search - searchQuery : ", searchQuery);
    }, [searchQuery]);

    return(
        <main>
            {searchQuery !== '' && searchQuery.trim().length > 0 ? <VerticalListShowcase api="/api/movies/search" title = "Résultats de la recherche : " searchQuery={searchQuery} /> : <h1>Recherchez un film</h1>}
        </main>
    );
}
export default search;
