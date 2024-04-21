import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/series/{idSerie}/towatch:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Retourne si un user à mis une série à regarder plus tard
 *      description: Retourne si un user à mis une série à regarder plus tard
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idSerie
 *         type: number
 *         required: true
 *         description: ID de la série
 *      responses:
 *          200:
 *              description: true/false (à voir/pas à voir)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: Switch à voir/pas à voir pour un user et une série
 *      description: Switch à voir/pas à voir pour un user et une série
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: idSerie
 *         type: number
 *         required: true
 *         description: ID de la série
 *      responses:
 *          200:
 *              description: IdSerie à voir/pas à voir
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
                    { $set: { toWatch : !usr_tv.toWatch } }
                )
                data = {
                    action: 'IdSerie toWatch : ' + !usr_tv.toWatch,
                    idMovie: idSerie,
                    idUser: idUser,
                    toWatch: !usr_tv.toWatch
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("USR_TV_LIKES").insertOne(
                    {idTMDB: idSerie, idUser: idUser, liked: false, seen: false, toWatch: true}
                )
                data = {
                    action: 'Relation IdSerie/User created',
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: false,
                    seen: false,
                    toWatch: true
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_tv){
                res.json({ status: 200, toWatch: usr_tv.toWatch});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
