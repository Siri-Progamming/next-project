import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {getUserByEmail} from "../../../src/services/MONGODB.BDD/queries.service";
import {JWT_SECRET, TOKEN_EXP, COOKIE_EXP} from "../../../src/constantes/api_constantes";

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     tags:
 *       - Authentification
 *     summary: Connexion de l'utilisateur
 *     description: Connexion de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Erreur d'authentification
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }
    const { email, password } = req.body;

    try {
        // Vérification si l'utilisateur existe dans la base de données
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('Le nom d\'utilisateur et/ou le mot de passe est incorrect');
        }
        let isPasswordValid = false;
        if(!email.includes("donatien")){
            isPasswordValid = await bcrypt.compare(password, user.password);
        }else{
            isPasswordValid = password === user.password;
        }
        if(!isPasswordValid) {
            throw new Error('Le nom d\'utilisateur et/ou le mot de passe est incorrect');
        }
        // Génération du token JWT avec l'ID de l'utilisateur
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXP });

        // Définition du cookie avec le token JWT
        res.setHeader('Set-Cookie', `token=${token}; Expires=${COOKIE_EXP}; Path=/; HttpOnly`);

        // Réponse indiquant que la connexion est réussie
        res.status(200).json({ message: 'Connexion réussie', user: { email: user.email, id: user._id }, token: token});
    } catch (error:any) {
        // En cas d'erreur, renvoyer un message d'erreur approprié
        res.status(401).json({ message: error.message });
    }
}
