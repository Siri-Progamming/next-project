import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', `token=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; SameSite=Strict; Secure`);
    res.status(200).json({ message: 'Utilisateur déconnecté avec succès.' });
}
