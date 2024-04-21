import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/movies/{idMovie}/towatch:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Savoir si un user a mis se film dans la liste des films à voir
 *      description: Savoir si un user a mis se film dans la liste des films à voir
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
 *              description: true/false (à voir/pas à voir)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: switch à voir/pas à voir pour un user et un film
 *      description: switch à voir/pas à voir pour un user et un film
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
 *              description: IdMovie à voir/pas à voir
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
                    { $set: { toWatch : !usr_movie.toWatch } }
                )
                data = {
                    action: 'IdMovie toWatch : ' + !usr_movie.toWatch,
                    idMovie: idMovie,
                    idUser: idUser,
                    toWatch: !usr_movie.toWatch
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, idUser: idUser, liked: false, seen: false, toWatch: true}
                )
                data = {
                    action: 'Relation IdMovie/User created',
                    idMovie: idMovie,
                    idUser: idUser,
                    liked: false,
                    seen: false,
                    toWatch: true
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_movie){
                res.json({ status: 200, toWatch: usr_movie.toWatch});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
