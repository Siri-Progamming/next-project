//Recommander une liste de films selon ses likes et les genre des films
//Récupérer la liste de tous les films liké par l'utilisateur
//Récupérer pour chaque film la liste "SimilarShowcase" de TMDB
//Créer une nouvelle liste basée sur un mélange de toutes les listes "SimilarShowcase" des films liké

import clientPromise from "/lib/mongodb";
import {ConfigService, tmdbGetOption} from "../../../../../src/services/IMDB.API/config.service";
import fetch from "node-fetch";
/**
 * @swagger
 * /api/users/{idUser}/movies/recommanded:
 *   get:
 *     tags:
 *       - Utilisateur
 *     summary: Renvoie une liste de films recommandé pour un utilisateur par ID
 *     description: Renvoie une liste de films recommandé pour un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         type: string
 *         required: true
 *         description: ID de l'utilisateur dont on veut visualiser les recommandations
 *       - in: query
 *         name: language
 *         type: string
 *         required: false
 *         description: langue d'affichage de la réponse serveur (format en-US, fr-FR, etc.) (par défaut en-US)
 *     responses:
 *       200:
 *         description: Liste des films recommandés pour l'utilisateur
 */
export default async function handler(req, res) {
    const idUser = req.query.idUser
    const client = await clientPromise;
    const db = client.db("bdd");
    const movies_liked = await db.collection("likes").find({idUser: idUser, liked: true}).toArray();
    switch (req.method) {
        case "GET":
            const list_similar_movies = [];
            if(movies_liked.length > 0){
                for(const movie of movies_liked){
                    const baseURL = ConfigService.themoviedb.urls.movie_recommanded;
                    let url = baseURL.replace("{movie_id}", movie.idTMDB.toString());
                    if(req.query.language){
                        const language = req.query.language;
                        url = url + '?language=' + language;
                    }

                    const apiResponse = await fetch(url, tmdbGetOption)
                        .then(r => r.json())
                        .catch(err => console.error('error:' + err));
                    if (apiResponse.results) {

                        // On trie les résultats par score pondéré
                        // const sortedByScoreResults = sortByScore(apiResponse.results);
                        const results = apiResponse.results;
                        // list_similar_movies.push(...sortedByScoreResults);
                        list_similar_movies.push(...results);
                    }
                }
            }else{
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            //On supprime les doublons
            const uniqueMoviesSet = new Set(list_similar_movies.map(JSON.stringify));
            const list_similar_movies_nodouble = Array.from(uniqueMoviesSet).map(JSON.parse);
            // res.json({ status: 200, data: shuffleArray(list_similar_movies_nodouble).slice(0,15)});
            const list_recommanded_no_liked = deleteAlreadyLikedMovies(list_similar_movies_nodouble, movies_liked);
            res.json({ status: 200, data: shuffleArray(list_recommanded_no_liked).slice(0,15)});
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}

function deleteAlreadyLikedMovies(movies, likedMovies) {
    movies.filter(movie => !likedMovies.some(likedMovie => likedMovie.idTMDB === movie.id));
    return movies;
}
function shuffleArray(array) {
    const shuffledArray = [...array]; // Crée une copie du tableau pour ne pas modifier l'original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
function sortByScore(movies) {
    const maxVoteCount = Math.max(...movies.map(movie => movie.vote_count));
    const maxPopularity = Math.max(...movies.map(movie => movie.popularity));

    movies.forEach(movie => {
        // Normalisation des valeurs entre 0 et 1 pour le vote_count et la popularité
        const normalizedVoteCount = movie.vote_count / maxVoteCount;
        const normalizedPopularity = movie.popularity / maxPopularity;

        // Calcul du score pondéré
        movie.score = (0.4 * movie.vote_average) + (0.4 * normalizedVoteCount) + (0.2 * normalizedPopularity);
    });

    // Tri des films en fonction du score, du plus élevé au plus bas
    movies.sort((a, b) => b.score - a.score);

    // Suppression de la propriété "score" des films après le tri
    movies.forEach(movie => delete movie.score);

    return movies;
}
