import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "../../src/services/IMDB.API/config.service"
import {buildURL_movies_discover} from "../../src/services/IMDB.API/urlBuilder.service";
import {LOGGER} from "../../src/services/API/utils.api.service";

/**
 * @swagger
 * /api/discover:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les films à découvrir
 *     description: Renvoie les films à découvrir
 *     parameters:
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *       - in: query
 *         name: page
 *         type: number
 *         required: false
 *         description: le numéro de page qu'on souhaite afficher (par défaut 1)
 *       - in: query
 *         name: sort_by
 *         type: string
 *         required: false
 *         description: trier les films (original_title.asc/desc, popularity.asc/desc, revenue.asc/desc, primary_release_date.asc/desc, title.asc/desc, vote_average.asc/desc, vote_count.asc/desc)(Default popularity.desc)
 *       - in: query
 *         name: vote_average_gte
 *         type: number
 *         required: false
 *         description: N'affiche que les films qui ont PLUS que cette note
 *       - in: query
 *         name: vote_average_lte
 *         type: number
 *         required: false
 *         description: N'affiche que les films qui ont MOINS que cette note
 *       - in: query
 *         name: vote_count_gte
 *         type: number
 *         required: false
 *         description: N'affiche que les films qui ont PLUS que ce nombre de votes
 *       - in: query
 *         name: vote_count_lte
 *         type: number
 *         required: false
 *         description: N'affiche que les films qui ont MOINS que ce nombre de votes
 *       - in: query
 *         name: with_genres
 *         type: string
 *         required: false
 *         description: filtrer les films par genre (format id1, id2 | id1, id2, id3, etc.)
 *     responses:
 *       200:
 *         description: Liste des films à découvrir
 */
export default async function handler(req, res) {
    const url = buildURL_movies_discover(req, ConfigService.themoviedb.urls.discover);
   LOGGER('api/discover URL:'+url);
    const apiResponse = await fetch(url, tmdbGetOption)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({status: 200, data: apiResponse});
}
