import React, {ChangeEvent, FormEvent, useState} from "react";

interface SimilarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SimilarProps> = ({onSearch}) => {
    const [query, setQuery] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("SearchBar - handleSubmit : ", query);
        if(query !== '' && query.trim().length > 0){
            onSearch(query);
            setQuery('');
        }
        // console.log("SearchBar - handleSubmit reset query  : ", query);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        console.log("SearchBar - handleChange : ", query);
    };

    return (
        <form id="movie-search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Rechercher des films..."
            />
            <button type="submit">Rechercher</button>
        </form>
    );
}
export default SearchBar;
