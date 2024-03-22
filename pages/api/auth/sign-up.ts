import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import {getUserByEmail, createUser} from "../../../src/services/MONGODB.BDD/queries.service";

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     tags:
 *       - Inscription
 *     summary: Inscription de l'utilisateur
 *     description: nscription de l'utilisateur
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
 *       201:
 *         description: user created + email + id en base de données
 *       400:
 *         description: Un compte existe déjà avec cette adresse e-mail
 *       405:
 *         description: Méthode non autorisée
 *       500:
 *         description: Une erreur s'est produite lors de l'inscription
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            console.log("Inscription de : ", email, " - ",password);
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                return res.status(400).send('Un compte existe déjà avec cette adresse e-mail');
            }
            // Hasher le mot de passe sauf pour Donatien héhé, joyeuses Pâques
            let hashedPassword = password;
            if(!email.includes("donatien")){
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const resMongo = await createUser(email, hashedPassword);
            if(resMongo){
                const data = {
                    action: 'user created',
                    email: email,
                    id: resMongo.insertedId.toString()
                }
                res.status(201).json({ status: 201, data: data });
            }else{
                throw new Error('Une erreur s\'est produite lors de l\'insertion en base de données.');
            }
        } catch (error:any) {
            console.error('Erreur lors de l\'inscription:', error);
            return res.status(500).send('Une erreur s\'est produite lors de l\'inscription.');
        }
    } else {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
