import clientPromise from "/lib/mongodb";
import {getFavoritesSeriesWithIdsInTMDB} from "../../../../../src/services/BDD_TMDB";
import {DEFAULT_LANGUAGE} from "../../../../../src/constantes/tmdb_movie_constantes";
/**
 * @swagger
 * /api/users/{idUser}/series/likes:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Retourne la liste des séries likées par un utilisateur by ID
 *      description: Retourne la liste des séries likées par un utilisateur by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur dont on visualise le compteur de likes
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue désirée pour l'affichage des séries
 *      responses:
 *          200:
 *              description: La liste des séries likées par l'utilisateur
 */
export default async function handler(req, res) {
    const idUser =  req.query.idUser;
    const client = await clientPromise;
    const db = client.db("bdd");
    const language = req.query.language || DEFAULT_LANGUAGE;
    let resMongo, data;

    switch (req.method) {
        case "GET":
            resMongo = await db.collection("USR_TV_LIKES").find(
                {idUser: idUser, liked:true});
            const series = await resMongo.toArray();
            if(resMongo && series.length > 0){
                const idSeries = series.map(serie => serie.idTMDB);
                const seriesFromBDD = await getFavoritesSeriesWithIdsInTMDB(language,idSeries);
                if(seriesFromBDD && seriesFromBDD.length > 0){
                    data = {
                        idUser: idUser,
                        movies: seriesFromBDD
                    }
                    res.status(201).json({ status: 201, data: data });
                }else{
                    res.status(404).json({ status: 404, error: "Aucune série trouvée en BDD." });
                }
            }else{
                res.status(404).json({ status: 404, error: "L'utilisateur ne dispose d'aucune série dans ses préférences." });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
