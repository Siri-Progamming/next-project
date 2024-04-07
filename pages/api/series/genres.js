import fetch from "node-fetch";
import { ConfigService, tmdbGetOption } from "/src/services/IMDB.API/config.service"
import {buildURL_movies_onlyLanguage} from "/src/services/IMDB.API/urlBuilder.service";

/**
 * @swagger
 * /api/series/genres:
 *   get:
 *     tags:
 *       - Series
 *     summary: Renvoie tous les genres de séries
 *     description: Renvoie tous les genres de séries
 *     parameters:
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en, fr) (par défaut en)
 *     responses:
 *       200:
 *         description: Liste de tous les genres de séries
 */
export default async function handler(req, res) {
    const url = buildURL_movies_onlyLanguage(req.query.language, ConfigService.themoviedb.urls.serie_genres);
    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({ status: 200, data: apiResponse.genres });
}
