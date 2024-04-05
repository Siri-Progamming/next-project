import clientPromise from "/lib/mongodb";
import {getFavoritesMoviesWithIds} from "../../../../../src/services/MONGODB.BDD/queries.service";
import {getFavoritesMoviesWithIdsInTMDB} from "../../../../../src/services/BDD_TMDB";
import {DEFAULT_LANGUAGE} from "../../../../../src/constantes/tmdb_movie_constantes";
/**
 * @swagger
 * /api/users/{idUser}/movies/likes:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Retourne la liste des films likés par un utilisateur by ID
 *      description: Retourne la liste des films likés par un utilisateur by ID
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
 *         description: langue désirée pour l'affichage des films
 *      responses:
 *          200:
 *              description: La liste des films likés par l'utilisateur
 */
export default async function handler(req, res) {
    //TODO parser le JWT
    const idUser =  req.query.idUser;
    const client = await clientPromise;
    const db = client.db("bdd");
    const language = req.query.language || DEFAULT_LANGUAGE;
    let resMongo, data;

    switch (req.method) {
        case "GET":
            resMongo = await db.collection("likes").find(
                {idUser: idUser, liked:true});
            const movies = await resMongo.toArray();
            if(resMongo && movies.length > 0){
                //On récupère les détails des films dans la table movies
                const idMovies = movies.map(movie => movie.idTMDB);
                // const moviesFromBDD = await getFavoritesMoviesWithIds(idMovies);
                const moviesFromBDD = await getFavoritesMoviesWithIdsInTMDB(language,idMovies);
                if(moviesFromBDD && moviesFromBDD.length > 0){
                    data = {
                        idUser: idUser,
                        movies: moviesFromBDD
                    }
                    res.status(201).json({ status: 201, data: data });
                }else{
                    res.status(404).json({ status: 404, error: "Aucun film trouvé en BDD." });
                }
            }else{
                res.status(404).json({ status: 404, error: "L'utilisateur ne dispose d'aucun film dans ses préférences." });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
