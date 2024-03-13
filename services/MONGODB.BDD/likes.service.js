import clientPromise from "/lib/mongodb";

const client = await clientPromise;
const db = client.db("bdd");
export async function getLikesCountForAMovie(idMovie){
    return await db.collection("likes").countDocuments({idTMDB: idMovie, liked: true});
}
