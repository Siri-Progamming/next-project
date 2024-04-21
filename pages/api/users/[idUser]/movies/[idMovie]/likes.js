import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/movies/{idMovie}/likes:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Get le compteur de likes pour un utilisateur et un film by ID
 *      description: Get le compteur de likes pour un utilisateur et un film by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur dont on visualise le compteur de likes
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film dont on veut visualiser le compteur de likes
 *      responses:
 *          200:
 *              description: true/false (liké/pas liké)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: Incrémente/décrémente le compteur de likes pour un utilisateur et un film by ID
 *      description: Incrémente/décrémente le compteur de likes pour un utilisateur et un film by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur qui veut liker/dislike le film
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film à liker/disliker
 *      responses:
 *          200:
 *              description: IdMovie liked/disliked
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
                    { $set: { liked : !usr_movie.liked } }
                )
                data = {
                    action: 'IdMovie liked : ' + !usr_movie.liked,
                    idMovie: idMovie,
                    idUser: idUser,
                    liked: !usr_movie.liked
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, idUser: idUser, liked: true}
                )
                data = {
                    action: 'Relation IdMovie/User created',
                    idMovie: idMovie,
                    idUser: idUser,
                    liked: true
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_movie){
                res.json({ status: 200, liked: usr_movie.liked});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
