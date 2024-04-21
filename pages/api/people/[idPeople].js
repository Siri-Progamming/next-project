import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/src/services/IMDB.API/config.service";
import {buildURL_media_full, buildURL_people_full} from "/src/services/IMDB.API/urlBuilder.service";
import {getLikesCountForAMovie} from "/src/services/MONGODB.BDD/queries.service";

/**
 * @swagger
 * /api/people/{idPeople}:
 *   get:
 *     tags:
 *       - People
 *     summary: Renvoie les détails d'un acteur par ID
 *     description: Renvoie les détails d'un acteur par ID
 *     parameters:
 *       - in: path
 *         name: idPeople
 *         type: number
 *         required: true
 *         description: ID de l'acteur à retourner
 *       - in: query
 *         name: append_to_response
 *         type: string
 *         required: false
 *         description: permet de fetch plus de données en une seule requête pour un film [combined_credits,images]
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Détails de l'acteur demandé
 */
export default async function handler(req, res) {
    const idPeople = parseInt(req.query.idPeople, 10);
    const url = buildURL_people_full(idPeople, req.query.append_to_response,req.query.language);
    switch (req.method) {
        case "GET":
            const people = await fetch(url, tmdbGetOption)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));
            if(people){
                console.log(people);
                res.json({status: 200, data: {people: people}});
            }else {
                res.status(404).json({status: 404, error: "Not Found"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
