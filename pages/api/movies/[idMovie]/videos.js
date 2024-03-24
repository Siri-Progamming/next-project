import { buildURL_movies_onlyLanguage } from "../../../../src/services/IMDB.API/urlBuilder.service";
import {switchGetData} from "../../../../src/services/IMDB.API/fetch.service";
import {ConfigService} from "../../../../src/services/IMDB.API/config.service";
/**
 * @swagger
 * /api/movies/{idMovie}/videos:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les vidéos d'un film par ID
 *     description: Renvoie les vidéos d'un film par ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film dont on veut visualiser les vidéos
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: Langue des vidéos (par défaut en-US)
 *     responses:
 *       200:
 *         description: Liste des vidéos liées au film demandé
 */
export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const baseURL = ConfigService.themoviedb.urls.movie_videos.replace("{movie_id}", idMovie.toString());
    const url = buildURL_movies_onlyLanguage(req.query.language, baseURL);
    await switchGetData(req, res, url);
}
