import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/services/IMDB.API/config.service";
import {buildURL_movies_onlyLanguage} from "/services/IMDB.API/urlBuilder.service";
import {getLikesCountForAMovie} from "/services/MONGODB.BDD/likes.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     summary: Renvoie les détails d'un film par ID
 *     description: Renvoie les détails d'un film par ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film à retourner
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
    const baseURL = ConfigService.themoviedb.urls.movie.replace("{movie_id}", idMovie.toString());
    const url = buildURL_movies_onlyLanguage(idMovie, req.query.language, baseURL);

    switch (req.method) {
        case "GET":
            const movie = await fetch(url, tmdbGetOption )
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
