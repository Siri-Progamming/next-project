export default async function handler(req, res) {
    const { email, password } = req.body
    // Ici votre logique d'authentification
    res.status(200).json({ success: true });
}
