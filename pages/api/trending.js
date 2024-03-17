import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/src/services/IMDB.API/config.service"
import {buildURL_movies_onlyLanguage} from "../../src/services/IMDB.API/urlBuilder.service";

/**
 * @swagger
 * /api/trending:
 *   get:
 *     summary: Renvoie les films populaires [day/week]
 *     description: Renvoie les films populaires [day/week]
 *     parameters:
 *       - in: query
 *         name: time_window
 *         type: string
 *         required: true
 *         description: période de popularité des films (day/week) (par défaut day)
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Liste des films populaires du jour ou de la semaine
 */
export default async function handler(req, res) {
    let time_window;
    if(req.query.time_window !== "day" && req.query.time_window !== "week"){
        time_window = "day";
    }else{
        time_window = req.query.time_window;
    }
    const url = buildURL_movies_onlyLanguage(req.query.language, ConfigService.themoviedb.urls.movie_trending.replace("{time_window}", time_window));

    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({status: 200, data: apiResponse});
}
