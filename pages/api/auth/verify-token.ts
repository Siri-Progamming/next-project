import {NextApiRequest, NextApiResponse} from "next";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({message: 'Méthode non autorisée'});
    }
    const token = req.cookies.token;
    if (!token) {
        res.status(401).end();
    }
    try {
        const jwtSecret = process.env.JWT_KEY;
        // Vérifier et décoder le token -> ça retourne le payload du token
        const decoded = jwt.verify(token!, jwtSecret as string);
        res.status(200).json({payload: decoded});
    } catch (error) {
        res.status(401).json({message: 'Token invalide.'});
    }
};

