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
        <form id="movie-search-bar" onSubmit={handleSubmit} className="">
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    value={query}
                    className="grow text-neutral-500"
                    onChange={handleChange}
                    placeholder="Rechercher des films..."
                />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6 fill-neutral-400">
                        <path fillRule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </label>
        </form>
    );
}
export default SearchBar;
