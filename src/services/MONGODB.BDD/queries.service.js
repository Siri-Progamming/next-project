import {db} from "./connect.db.service";

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
    const movies = await db.collection("movies").find({ id: { $in: idMovies } }).toArray();
    //On s'assure qu'on fera jamais apparaitre 2 fois le même film (au cas où il y aurait des doublons dans la BDD)
    return Array.from(new Set(movies.map(movie => movie.id))).map(id => movies.find(movie => movie.id === id));
}

export async function getAMovieById(idMovie){
    return await db.collection("movies").findOne(
        {id: idMovie});
}
export async function insertMovie(movie){
    return await db.collection("movies").insertOne(
        {id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average}
    )
}
