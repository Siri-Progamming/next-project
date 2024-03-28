import React, { useState } from 'react';
import {useRouter} from "next/router";
import {useAuth} from "../../contexts/AuthContext";

const LoginForm = () => {
    const [error, setError] = useState<string>('');
    const { login, user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch('/api/auth/sign-in', {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    headers: {'Content-Type': 'application/json'}
                });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }else{
                const data = await response.json();
                login(data.user);
                router.push(localStorage.getItem('previousLocation') ?? '/').then();
            }
        } catch (error: any) {
            setError(error.message as string);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required autoComplete="username"/>
            </div>
            <div>
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required autoComplete="current-password"/>
            </div>
            <button type="submit">Se connecter</button>
        </form>
    );
};
export default LoginForm;
