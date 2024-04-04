import { db } from "./connect.db.service";

export async function getLikesCountForAMovie(idMovie){
    return await db.collection("likes").countDocuments({idTMDB: idMovie, liked: true});
}
export async function getUserByEmail(email){
    return await db.collection('users').findOne({ email});
}
export async function createUser(email, name,password){
    return await db.collection("users").insertOne(
        {email: email, name: name,password: password}
    )
}

export async function getFavoritesMoviesWithIds(idMovies){
    return await db.collection("movies").find(
        {idTMDB: { $in: idMovies}}).toArray();
}

export async function getAMovieById(idMovie){
    return await db.collection("movies").findOne(
        {idTMDB: idMovie});
}
export async function insertMovie(movie){
    return await db.collection("movies").insertOne(
        {idTMDB: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average}
    )
}
