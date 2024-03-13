import fetch from "node-fetch";
import { ConfigService } from "/services/IMDB.API/config.service"

/**
 * @swagger
 * /api/discover/toprated:
 *   get:
 *     summary: Renvoie les films les mieux notés
 *     description: Renvoie les films les mieux notés
 *     parameters:
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Liste des films les mieux notés
 */
export default async function handler(req, res) {
    let language = null;
    let url;
    if(req.query.language){
        language = req.query.language;
        url = ConfigService.themoviedb.urls.movie_top_rated + '?language=' + language;
    }else{
        url = ConfigService.themoviedb.urls.movie_top_rated
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };
    const apiResponse = await fetch(url, options)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));
    res.json({ status: 200, data: apiResponse.results });
}
