import {getAMovieById,  insertMovie} from './MONGODB.BDD/queries.service';
import {fetchMovie} from './IMDB.API/fetch.service';
export async function processFavoriteMovie(idMovie){
    console.log("Processing movie ", idMovie);
    const movieFromDB = await getAMovieById(idMovie);
    if(movieFromDB){
        console.log("Movie already in DB ");
    }else{
        console.log("Movie NOT in DB ");
        const tmbdMovie = await fetchMovie(idMovie);
        console.log("Return from fetch TMDB : ", tmbdMovie);
        if(tmbdMovie){
            console.log("Got movie from TMDB ");
            const insertedMovie = await insertMovie(tmbdMovie);
            const data = {
                action: 'Movie inserted',
               movie: insertedMovie,
            }
            console.log("Movie inserted");
            return data;
        }
    }
}
