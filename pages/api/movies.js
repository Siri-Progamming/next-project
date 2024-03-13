// Endpoint : /api/movies
/**
 * @swagger
 * /api/movies:
 *  get:
 *      summary: Ne sert à rien
 *      description: Ne sert à rien
 *      responses:
 *          200:
 *              description: List of movies
 */
export default async function handler(req, res) {
    const movies = [
        { _id: 1, title: "The Batman" },
        { _id: 2, title: "The Joker" },
    ];

    //Réponses
    switch (req.method) {
        case "POST":
            const { title } = req.body;
            const newMovie = { _id: movies.length + 1, title: title };
            movies.push(newMovie);
            res.status(201).json({ status: 201, data: { movie: newMovie } });
            break;
        case "GET":
            res.json({ status: 200, data: movies });
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
