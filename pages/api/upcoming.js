import fetch from "node-fetch";
import { ConfigService, tmdbGetOption } from "/src/services/IMDB.API/config.service"

/**
 * @swagger
 * /api/upcoming:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les films qui vont sortir
 *     description: Renvoie les films qui vont sortir
 *     responses:
 *       200:
 *         description: Liste des films qui vont sortir
 */
export default async function handler(req, res) {
    const url = ConfigService.themoviedb.urls.movie_upcoming;

    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({ status: 200, data: apiResponse.results });
}
