//En front :  https://image.tmdb.org/t/p/original/fxYazFVeOCHpHwuqGuiqcCTw162.jpg
// https://image.tmdb.org/t/p/w500/fxYazFVeOCHpHwuqGuiqcCTw162.jpg  il y a aussi w200,w300...
// QUERY_PARAMETERS
// movie_id int64 required
// include_image_language string optional (specify a comma separated list of ISO-639-1 values to query, for example: en,null)
// language string optional
import {switchGetData} from "/src/services/IMDB.API/fetch.service";
import {buildURL_movies_id_images} from "/src/services/IMDB.API/urlBuilder.service";
/**
 * @swagger
 * /api/movies/{idMovie}/images:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les images d'un film par ID
 *     description: Renvoie les images d'un film par ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film dont on veut visualiser les images
 *       - in: query
 *         name: include_image_language
 *         type: string
 *         required: false
 *         description: Langue affichée sur les images. Spécifiez une liste séparée par des virgules de valeurs ISO-639-1 pour la requête, par exemple en,null. (Par défaut = all, null inclus)
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: Langue du retour serveur (par défaut en-US)
 *     responses:
 *       200:
 *         description: Liste des images liées au film demandé
 */
export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = buildURL_movies_id_images(idMovie, req.query.include_image_language, req.query.language);
    await switchGetData(req, res, url);
}
