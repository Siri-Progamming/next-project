import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/movies/{idMovie}/seen:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Savoir si un user a vu un film
 *      description: Savoir si un user a vu un film
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film
 *      responses:
 *          200:
 *              description: true/false (vu/pas vu)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: switch vu/pas vu pour un user et un film
 *      description: switch vu/pas vu pour un user et un film
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film
 *      responses:
 *          200:
 *              description: IdMovie vu/pas vu
 */
export default async function handler(req, res) {
    //TODO parser le JWT
    const idUser =  req.query.idUser;
    const idMovie = parseInt(req.query.idMovie, 10);
    const client = await clientPromise;
    const db = client.db("bdd");

    const usr_movie = await db.collection("likes").findOne({idTMDB: idMovie, idUser: idUser});
    let resMongo, data;

    switch (req.method) {
        case "PUT":
            if (usr_movie) {
                resMongo = await db.collection("likes").updateOne(
                    {idTMDB: idMovie, idUser: idUser},
                    { $set: { seen : !usr_movie.seen } }
                )
                data = {
                    action: 'IdMovie seen : ' + !usr_movie.seen,
                    idMovie: idMovie,
                    idUser: idUser,
                    seen: !usr_movie.seen
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, idUser: idUser, liked: false, seen: true, toWatch: false}
                )
                data = {
                    action: 'Relation IdMovie/User created',
                    idMovie: idMovie,
                    idUser: idUser,
                    liked: false,
                    seen: true,
                    toWatch: false
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_movie){
                res.json({ status: 200, seen: usr_movie.seen});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
