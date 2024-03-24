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

