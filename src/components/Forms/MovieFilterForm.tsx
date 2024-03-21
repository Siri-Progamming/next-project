import * as React from 'react';
import {useMovieFilter} from "../../contexts/MovieFilterContext";
import {LANGUAGES, SORT_BY} from "../../constantes/tmdb_movie_constantes";

interface CollapsibleVerticalFilterPanelProps {

}
const MovieFilterForm: React.FC<CollapsibleVerticalFilterPanelProps> = ({}) => {
    const {genres, setGenres, language, setLanguage,
                sortBy, setSortBy, noteMin, setNoteMin, noteMax, setNoteMax,
                nbVotesMin, setNbVotesMin, handleChangeLanguage, handleChangeSortBy, handleChangeNoteMin, handleChangeNoteMax, handleChangeNbVotesMin,
                handleSelectGenre, handleSubmit, handleReset} = useMovieFilter();

    //TODO constantes pour les genres, les langues, les notes, les votes

    return (
        <div>
            {/*language, page, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, with_genres*/}
            <form id="movie-filters" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="language">Langue : </label>
                    <select id="language" name="language"
                            value={language}
                            onChange={handleChangeLanguage}
                            className="select select-bordered w-full max-w-xs text-black">
                        {LANGUAGES.map((lang) => (
                            <option key={lang.id} value={lang.name}>{lang.display_name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sort_by">Trier par : </label>
                    <select id="sort_by" name="sort_by"
                            value={sortBy}
                            onChange={handleChangeSortBy}
                            className="select select-bordered w-full max-w-xs text-black">
                        {SORT_BY.map((sort) => (
                            <option key={sort.name} value={sort.name}>{sort.display_name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-secondary">Rechercher</button>
            </form>
        </div>
    );
}

export default MovieFilterForm;
