import React, { useState } from 'react';
import {useRouter} from "next/router";

const SignupForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;
        try {
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                body: JSON.stringify({email, name, password}),
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
                {error && <div style={{color: 'red'}}>{error}</div>}
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" required autoComplete="username"/>
                </div>
                <div>
                    <label>Prénom:</label>
                    <input type="text" id="name" name="name" required autoComplete="username"/>
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" id="password" name="password" required autoComplete="current-password"/>
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};
export default SignupForm;
