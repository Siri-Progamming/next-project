import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/src/services/IMDB.API/config.service";
import {buildURL_media_full} from "../../../src/services/IMDB.API/urlBuilder.service";

/**
 * @swagger
 * /api/series/{idSerie}:
 *   get:
 *     tags:
 *       - Series
 *     summary: Renvoie les détails d'une série par ID
 *     description: Renvoie les détails d'une série par ID
 *     parameters:
 *       - in: path
 *         name: idSerie
 *         type: number
 *         required: true
 *         description: ID de la série à retourner
 *       - in: query
 *         name: append_to_response
 *         type: string
 *         required: false
 *         description: permet de fetch plus de données en une seule requête pour une série [credits,images,recommendations,reviews,similar,videos,watch/providers]
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Détails de la série demandée
 */
export default async function handler(req,res){
    const idSerie = parseInt(req.query.idSerie, 10);
    const url = buildURL_media_full(idSerie, req.query.append_to_response,req.query.language, "serie");

    switch (req.method) {
        case "GET":
            const serie = await fetch(url, tmdbGetOption)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));
            if(serie){
                // console.log(serie);
                //Si le filtre de langue ne permet pas d'afficher les images
                if(req.query.language){
                    if(serie.images.backdrops){
                        console.log("Images disponibles pour la série "+idSerie+" dans la langue "+req.query.language+" : "+serie.images.backdrops.length);
                        if(serie.images.backdrops && (!serie.images.backdrops.length || serie.images.backdrops.length < 8)){
                            //On va récup toutes les images sans filtre de langue
                            const imagesTMDBURL = ConfigService.themoviedb.urls.serie_images.replace("{serie_id}", idSerie);
                            const images = await fetch(imagesTMDBURL,tmdbGetOption)
                                .then(r => r.json())
                                .catch(err => console.error('error:' + err));
                            if(images){
                                console.log("Nombre d'images disponibles sans filtre de langue : ",images.backdrops.length);
                                serie.images.backdrops = images.backdrops;
                            }
                        }
                    }
                    const serieRecommendations = serie.recommendations.results;
                    if(serieRecommendations){
                        console.log("Recommandations pour la série "+idSerie+" dans la langue "+req.query.language+" : "+serieRecommendations.length);
                        if(serieRecommendations && (!serieRecommendations.length || serieRecommendations.length < 4)){
                            const recommandationsTMDBURL = ConfigService.themoviedb.urls.serie_recommanded.replace("{serie_id}", idSerie);
                            const recommandations = await fetch(recommandationsTMDBURL,tmdbGetOption)
                                .then(r => r.json())
                                .catch(err => console.error('error:' + err));
                            if(!recommandations.results.length){
                                console.log("Nombre de recommandations disponibles sans filtre de langue : ",recommandations.results.length);
                                serie.recommendations = recommandations;
                            }
                        }
                    }
                }
                // AJOUT DES EPISODES AUX SAISONS
                if(serie.seasons.length > 0){
                    for(const [index,season] of serie.seasons.entries()){
                        const seasonURL = `https://api.themoviedb.org/3/tv/${serie.id}/season/${season.season_number}?language=${req.query.language}`
                        const seasonFetched = await fetch(seasonURL, tmdbGetOption)
                            .then(r => r.json())
                            .catch(err => console.error('error:' + err));
                        if (seasonFetched) {
                            const saisonToCompleteWithEpisodes = serie.seasons[index];
                            if(saisonToCompleteWithEpisodes){
                                serie.seasons[index].episodes = seasonFetched.episodes;
                            }
                        }
                    }
                }
                //Récupérer les likes MONGODB et les ajouter à notre objet
                // movie.likes = await getLikesCountForAMovie(idMovie);
                res.json({status: 200, data: {serie: serie}});
            }else {
                res.status(404).json({status: 404, error: "La série n'a pas été trouvée !"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
