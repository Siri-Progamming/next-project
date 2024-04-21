import clientPromise from "/lib/mongodb";
import {getFavoritesMoviesWithIdsInTMDB} from "../../../../../src/services/BDD_TMDB";
import {DEFAULT_LANGUAGE} from "../../../../../src/constantes/tmdb_movie_constantes";
/**
 * @swagger
 * /api/users/{idUser}/movies/towatch:
 *  get:
 *      tags:
 *       - Utilisateur
 *      summary: Retourne la liste des films à voir par un utilisateur by ID
 *      description: Retourne la liste des films à voir par un utilisateur by ID
 *      parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue désirée pour l'affichage des films
 *      responses:
 *          200:
 *              description: La liste des films à voir par l'utilisateur
 */
export default async function handler(req, res) {
    const idUser =  req.query.idUser;
    const client = await clientPromise;
    const db = client.db("bdd");
    const language = req.query.language || DEFAULT_LANGUAGE;
    let resMongo, data;

    switch (req.method) {
        case "GET":
            resMongo = await db.collection("likes").find(
                {idUser: idUser, toWatch:true});
            const movies = await resMongo.toArray();
            if(resMongo && movies.length > 0){
                const idMovies = movies.map(movie => movie.idTMDB);
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
                res.status(404).json({ status: 404, error: "L'utilisateur ne dispose d'aucun film dans sa liste 'à voir'." });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
