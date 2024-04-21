import fetch from "node-fetch";
import {ConfigService, tmdbGetOption} from "/src/services/IMDB.API/config.service";
import {buildURL_media_full} from "/src/services/IMDB.API/urlBuilder.service";
import {getLikesCountForAMovie} from "/src/services/MONGODB.BDD/queries.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Renvoie les détails d'un film par ID
 *     description: Renvoie les détails d'un film par ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         type: number
 *         required: true
 *         description: ID du film à retourner
 *       - in: query
 *         name: append_to_response
 *         type: string
 *         required: false
 *         description: permet de fetch plus de données en une seule requête pour un film [credits,images,keywords,recommandations,reviews,similar,videos]
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Détails du film demandé
 */
export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = buildURL_media_full(idMovie, req.query.append_to_response,req.query.language, "movie");
    switch (req.method) {
        case "GET":
            // console.log("API CALL - GET - URL : ", url);
            const movie = await fetch(url, tmdbGetOption)
                .then(r => r.json())
                .catch(err => console.error('error:' + err));
            if(movie){
                // console.log(movie);
                //Si le filtre de langue ne permet pas d'afficher les images
                if(req.query.language){
                    if(movie.images.backdrops){
                        console.log("Images disponibles pour le film "+idMovie+" dans la langue "+req.query.language+" : "+movie.images.backdrops.length);
                        if(movie.images.backdrops.length < 8){
                            //On va récup toutes les images sans filtre de langue
                            const imagesTMDBURL = ConfigService.themoviedb.urls.movie_images.replace("{movie_id}", idMovie);
                            const images = await fetch(imagesTMDBURL,tmdbGetOption)
                                .then(r => r.json())
                                .catch(err => console.error('error:' + err));
                            if(images){
                                console.log("Nombre d'images disponibles sans filtre de langue : ",images.backdrops.length);
                                //TODO Si sans filtre il y a moins de 8 images, réajuster la sélectionner des images !
                                //TODO ajouter ces chiffres dans un fichier de conf
                                movie.images.backdrops = images.backdrops;
                            }
                        }
                    }
                    if(movie.recommendations){
                        const movieRecommendations = movie.recommendations.results;
                        if(movieRecommendations){
                            console.log("Recommandations pour le film "+idMovie+" dans la langue "+req.query.language+" : "+movieRecommendations.length);
                            if(!movieRecommendations.length || movieRecommendations.length < 4){
                                const recommandationsTMDBURL = ConfigService.themoviedb.urls.movie_recommanded.replace("{movie_id}", idMovie);
                                const recommandations = await fetch(recommandationsTMDBURL,tmdbGetOption)
                                    .then(r => r.json())
                                    .catch(err => console.error('error:' + err));
                                if(!recommandations.results.length){
                                    console.log("Nombre de recommandations disponibles sans filtre de langue : ",recommandations.results.length);
                                    movie.recommendations = recommandations;
                                }
                            }
                        }
                    }else{
                        movie.recommendations ={results:[]};
                    }
                }
                //Récupérer les likes MONGODB et les ajouter à notre objet
                //TODO Rajouter ça à l'interface movie
                movie.likes = await getLikesCountForAMovie(idMovie);
                res.json({status: 200, data: {movie: movie}});
            }else {
                res.status(404).json({status: 404, error: "Not Found"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
