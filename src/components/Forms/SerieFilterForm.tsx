import * as React from 'react';
import {useSerieFilter} from "../../contexts/SerieFilterContext";
import {LANGUAGES, NOTES, VOTES, SERIES_SORT_BY} from "../../constantes/tmdb_movie_constantes";
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import {useConstantes} from "../../contexts/ConstantesContext";
const SerieFilterForm: React.FC = ({}) => {
    const {SERIE_GENRES} = useConstantes();
    const {genres, language, sortBy, noteMin, nbVotesMin,
                handleChangeLanguage, handleChangeSortBy, handleChangeNoteMin, handleChangeNbVotesMin,
                handleSelectGenre, handleSubmit, handleReset} = useSerieFilter();

    //TODO constantes pour les genres, les langues, les notes, les votes
    return (
        <div>
            {/*language, page, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, with_genres*/}
            <form id="movie-filters" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="language">Langue</label>
                    <select id="language" name="language"
                            value={language}
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
                            value={sortBy}
                            onChange={handleChangeSortBy}
                            className="select select-bordered w-full max-w-xs text-black bg-white">
                        {SERIES_SORT_BY.map((sort) => (
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
                            defaultValue={noteMin}
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
                        defaultValue={nbVotesMin}
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
                        {SERIE_GENRES.map((genre) => (
                            <button key={genre.id} type="button" onClick={(event) => handleSelectGenre(event, genre.id)}
                                    className="genre_filter"
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
export default SerieFilterForm;
