import fetch from "node-fetch";
import { ConfigService, tmdbGetOption } from "/services/IMDB.API/config.service"

/**
 * @swagger
 * /api/discover:
 *  get:
 *      summary: Renvoie les films à découvrir
 *      description: Renvoie les films à découvrir
 *      responses:
 *          200:
 *              description: Liste des films à découvrir
 */
export default async function handler(req, res) {
    const url = ConfigService.themoviedb.urls.discover;

    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({ status: 200, data: apiResponse.results });
}
