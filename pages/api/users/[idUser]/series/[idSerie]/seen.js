import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/users/{idUser}/series/{idSerie}/seen:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Retourne si un user a vu une série
 *      description: Retourne si un user a vu une série
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
 *              description: true/false (vu/pas vu)
 *  put:
 *      tags:
 *       - Utilisateur
 *      summary: Switch vu/pas vu pour un user et une série
 *      description: Switch vu/pas vu pour un user et une série
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
 *              description: IdSerie vu/pas vu
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
                    { $set: { seen : !usr_tv.seen } }
                )
                data = {
                    action: 'IdSerie seen : ' + !usr_tv.seen,
                    idMovie: idSerie,
                    idUser: idUser,
                    seen: !usr_tv.seen
                }
                res.status(201).json({ status: 201, data: data });
            } else {
                resMongo = await db.collection("USR_TV_LIKES").insertOne(
                    {idTMDB: idSerie, idUser: idUser, liked: false, seen: true, toWatch: false}
                )
                data = {
                    action: 'Relation IdSerie/User created',
                    idMovie: idSerie,
                    idUser: idUser,
                    liked: false,
                    seen: true,
                    toWatch: false
                }
                res.status(201).json({ status: 201, data: data });
            }
            break;
        case "GET":
            if(usr_tv){
                res.json({ status: 200, seen: usr_tv.seen});
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
