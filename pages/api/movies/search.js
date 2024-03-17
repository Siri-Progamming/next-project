// QUERY PARAMS
// query string required
// include_adult boolean
// language string
// primary_release_year string
// page int32
// region string
// year string
//https://api.themoviedb.org/3/search/movie

import fetch from "node-fetch";
import {ConfigService} from "/src/services/IMDB.API/config.service"

/**
 * @swagger
 * /api/movies/search:
 *  get:
 *      summary: Renvoie les films selon une recherche
 *      description: Renvoie les films selon une recherche
 *      parameters:
 *        - in: query
 *          name: query
 *          type: string
 *          required: true
 *          description: mots clés de la recherche
 *        - in: query
 *          name: language
 *          type: string
 *          required: false
 *          description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *        - in: query
 *          name: page
 *          type: number
 *          required: false
 *          description: Retourne la page de recherche indiquée (par défaut 1 pour 1ère page)
 *      responses:
 *          200:
 *              description: Liste des films correspondant à la recherche
 */
export default async function handler(req, res) {
    console.log("api/movies/search req.query : ", req.query);
    let url = ConfigService.themoviedb.urls.search_movie
    let query;
    if (req.query.query) {
        query = req.query.query;
        url = url + '?query=' + query + '&include_adult=false';
    }
    if(req.query.language){
        const language = req.query.language;
        url = url + '&language=' + language;
    }
    if(req.query.page){
        const page = req.query.page;
        url = url + '&page=' + page;
    }
    console.log("api/movies/search url : ", url);
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
    res.json({status: 200, data: apiResponse});
}
