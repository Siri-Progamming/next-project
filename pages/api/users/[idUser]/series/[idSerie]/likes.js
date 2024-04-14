import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/series/{idSerie}/likes:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Get le compteur de likes pour un utilisateur et une série by ID
 *      description: Get le compteur de likes pour un utilisateur et une série by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur dont on visualise le compteur de likes
 *       - in: path
 *         name: idSerie
 *         type: number
 *         required: true
 *         description: ID de la série dont on veut visualiser le compteur de likes
 *      responses:
 *          200:
 *              description: true/false (liké/pas liké)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: Incrémente/décrémente le compteur de likes pour un utilisateur et une série by ID
 *      description: Incrémente/décrémente le compteur de likes pour un utilisateur et une série by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur qui veut liker/dislike le film
 *       - in: path
 *         name: idSerie
 *         type: number
 *         required: true
 *         description: ID de la série à liker/disliker
 *      responses:
 *          200:
 *              description: IdSerie liked/disliked
 */
export default async function handler(req, res) {
    const idUser =  req.query.idUser;
    const idSerie = parseInt(req.query.idSerie, 10);
    const client = await clientPromise;
    const db = client.db("bdd");

    const like = await db.collection("USR_TV_LIKES").findOne({idTMDB: idSerie, idUser: idUser});
    let resMongo, data;

    switch (req.method) {
        case "PUT":
            if (like) {
                resMongo = await db.collection("USR_TV_LIKES").updateOne(
                    {idTMDB: idSerie, idUser: idUser},
                    { $set: { liked : !like.liked } }
                )
                data = {
                    action: 'IdSerie liked : ' + !like.liked,
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: !like.liked
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("USR_TV_LIKES").insertOne(
                    {idTMDB: idSerie, idUser: idUser, liked: true}
                )
                data = {
                    action: 'Relation IdSerie/User created',
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: true
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(like){
                res.json({ status: 200, liked: like.liked});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
