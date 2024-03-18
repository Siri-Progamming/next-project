import * as React from 'react';

interface FiltersProps {

}
const Filters: React.FC<FiltersProps> = ({}) => {
    return (
        <div>
            {/*language, page, sort_by, vote_average.gte, vote_average.lte, vote_count.gte, vote_count.lte, with_genres*/}
            <form id="movie-filters">

            </form>
        </div>
    );
}

export default Filters;
