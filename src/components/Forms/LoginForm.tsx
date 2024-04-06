import React, { useState } from 'react';
import {useRouter} from "next/router";
import {useAuth} from "../../contexts/AuthContext";
import InputPassword from "../Forms/FormElements/InputPassword";
import InputEmail from "../Forms/FormElements/InputEmail";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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

    const handleClickOnSignup = () => {
        router.push('/ui/signup').then();
    }
    return (
        <>
            {error && (
                <div>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} className="auth-error-msg">
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                </div>
                )}
            <div id="auth-form">
                <h1>Connexion</h1>
                <img id="login-logo-fennext" src="/fennec.png" alt="picture of fennext"/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputEmail/>
                    </div>
                    <div>
                        <InputPassword/>
                    </div>
                    <Button variant="contained" type="submit" className="form-btn auth-form-btn">
                        Se connecter
                    </Button>
                    <div className="switch-form-text">
                        <a onClick={handleClickOnSignup}>S'inscrire</a>
                    </div>
                </form>
            </div>
        </>
    );
};
export default LoginForm;
