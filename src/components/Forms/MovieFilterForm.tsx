import * as React from 'react';
import {useMovieFilter} from "../../contexts/MovieFilterContext";
import {LANGUAGES, SORT_BY, NOTES, VOTES} from "../../constantes/tmdb_movie_constantes";
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import {useConstantes} from "../../contexts/ConstantesContext";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
const MovieFilterForm: React.FC = ({}) => {
    const {MOVIE_GENRES} = useConstantes();
    const {queryData,
                handleChangeLanguage, handleChangeSortBy, handleChangeNoteMin, handleChangeNbVotesMin,
                handleSelectGenre, handleSubmit, handleReset} = useMovieFilter();

    //TODO constantes pour les genres, les langues, les notes, les votes
    return (
        <div>
            {/*language, page, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, with_genres*/}
            <form id="movie-filters" onSubmit={handleSubmit}>
                <div className="absolute top-0 right-0"><RestartAltIcon className="reset-button" onClick={handleReset}/></div>
                <div className="form-group">
                    <label htmlFor="language">Langue</label>
                    <select id="language" name="language"
                            value={queryData.language}
                            onChange={handleChangeLanguage}
                            className="select select-bordered w-full max-w-xs text-black bg-white">
                        {LANGUAGES.map((lang) => (
                            <option key={lang.id} value={lang.name}>{lang.display_name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="sort_by">Trier</label>
                    <select id="sort_by" name="sort_by"
                            value={queryData.sortBy}
                            onChange={handleChangeSortBy}
                            className="select select-bordered w-full max-w-xs text-black bg-white">
                        {SORT_BY.map((sort) => (
                            <option key={sort.name} value={sort.name}>{sort.display_name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="note_min">Note minimale</label>
                    <div className="flex flex-row">
                        <p className="text-xs self-center pr-1">{NOTES.find(note => note.id === 'MIN')?.value}</p>
                        <StyledRating
                            name="note_min"
                            defaultValue={queryData.noteMin}
                            value={queryData.noteMin}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit"/>}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" className="text-tertiary-600"/>}
                            onChange={handleChangeNoteMin}
                            max={NOTES.find(note => note.id === 'MAX')?.value}
                        />
                        <p className="text-xs self-center pl-1">{NOTES.find(note => note.id === 'MAX')?.value}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="vote_count_min">Nombre de votes minimum</label>
                    <Slider
                        aria-label="vote_count_min"
                        defaultValue={queryData.nbVotesMin}
                        value={queryData.nbVotesMin}
                        step={100}
                        valueLabelDisplay="auto"
                        marks={VOTES}
                        max={VOTES.find(vote => vote.id === '5')?.value}
                        onChange={handleChangeNbVotesMin}
                        className="text-secondary-500"
                        sx={{
                            '& .MuiSlider-markLabel': {
                                color: 'white',
                                opacity: 0.6,
                            },
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genres">Genres</label>
                    <div className="flex flex-wrap">
                        {MOVIE_GENRES.map((genre) => (
                            <button key={genre.id} type="button" onClick={(event) => handleSelectGenre(event, genre.id)}
                                    className={`genre_filter ${queryData.genres.includes(genre.id) ? 'selected' : ''}`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button type="submit" className="form-btn w-full">Rechercher</button>
            </form>
        </div>
    );
}
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff3d47',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});
export default MovieFilterForm;
