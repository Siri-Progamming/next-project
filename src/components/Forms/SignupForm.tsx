import React, { useState } from 'react';
import {useRouter} from "next/router";

const SignupForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                // Redirection vers la page de connexion en cas de succès
                router.push( '/ui/login').then();
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error:any) {
            setError('Une erreur s\'est produite lors de l\'inscription.');
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };
    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};
export default SignupForm;
