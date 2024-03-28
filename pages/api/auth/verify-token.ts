import {NextApiRequest, NextApiResponse} from "next";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }
    // console.log("verify-token.ts - Verifying token");
    const token = req.cookies.token;
    // console.log("verify-token.ts - token : ", token);
    if (!token) {
        // console.log("verify-token.ts - No token provided");
        return res.status(401).end();
    }
    try {
        const jwtSecret = process.env.JWT_KEY;
        // Vérifier et décoder le token -> ça retourne le payload du token
        const decoded = jwt.verify(token, jwtSecret as string);
        // if(req.user.id !== decoded.id) {
        //     return res.status(401).json({ message: 'Token invalide.' });
        // }
        // console.log("verify-token.ts - decoded : ", decoded);
        return res.status(200).json({payload: decoded});
    } catch (error) {
        // En cas d'erreur de vérification du token
        return res.status(401).json({ message: 'Token invalide.' });
    }
};

