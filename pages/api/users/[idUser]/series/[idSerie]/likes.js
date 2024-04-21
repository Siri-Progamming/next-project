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

    const usr_tv = await db.collection("USR_TV_LIKES").findOne({idTMDB: idSerie, idUser: idUser});
    let resMongo, data;

    switch (req.method) {
        case "PUT":
            if (usr_tv) {
                resMongo = await db.collection("USR_TV_LIKES").updateOne(
                    {idTMDB: idSerie, idUser: idUser},
                    { $set: { liked : !usr_tv.liked } }
                )
                data = {
                    action: 'IdSerie liked : ' + !usr_tv.liked,
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: !usr_tv.liked
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("USR_TV_LIKES").insertOne(
                    {idTMDB: idSerie, idUser: idUser, liked: true, seen: false, toWatch: false}
                )
                data = {
                    action: 'Relation IdSerie/User created',
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: true,
                    seen: false,
                    toWatch: false
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_tv){
                res.json({ status: 200, liked: usr_tv.liked});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
