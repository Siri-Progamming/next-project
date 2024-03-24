import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/src/services/IMDB.API/config.service";
import {buildURL_movies_full, buildURL_movies_onlyLanguage} from "/src/services/IMDB.API/urlBuilder.service";
import {getLikesCountForAMovie} from "/src/services/MONGODB.BDD/queries.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les détails d'un film par ID
 *     description: Renvoie les détails d'un film par ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film à retourner
 *       - in: query
 *         name: append_to_response
 *         type: string
 *         required: false
 *         description: permet de fetch plus de données en une seule requête pour un film [credits,images,keywords,recommandations,reviews,similar,videos]
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Détails du film demandé
 */
export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = buildURL_movies_full(idMovie, req.query.append_to_response,req.query.language);
    switch (req.method) {
        case "GET":
            // console.log("API CALL - GET - URL : ", url);
            const movie = await fetch(url, tmdbGetOption)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));
            if (movie) {
                movie.likes = await getLikesCountForAMovie(idMovie);
                res.json({status: 200, data: {movie: movie}});
            } else {
                res.status(404).json({status: 404, error: "Not Found"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
