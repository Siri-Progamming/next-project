import React from "react";
import {useNameSearch} from "../../contexts/NameSearchContext";

const SearchBar: React.FC = () => {
    const {search, handleSubmit, handleChange} = useNameSearch();

    return (
        <form id="movie-search-bar" onSubmit={handleSubmit} className="">
            <label className="input flex items-center gap-2 bg-white">
                <input
                    type="text"
                    value={search}
                    className="grow text-midnight-200"
                    onChange={handleChange}
                    placeholder="Rechercher des films..."
                />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6 fill-midnight-200">
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
