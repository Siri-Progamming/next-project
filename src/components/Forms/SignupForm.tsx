import React, { useState } from 'react';
import {useRouter} from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InputEmail from "./FormElements/InputEmail";
import InputPassword from "./FormElements/InputPassword";
import InputText from "./FormElements/InputText";
import Button from "@mui/material/Button";

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
    const handleClickOnLogin = () => {
        router.push('/ui/login').then();
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
                <h1>Inscription</h1>
                <img id="signup-logo-fennext" src="/fennec2.png" alt="picture of fennext"/>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputEmail/>
                    </div>
                    <div>
                        <InputText type="text" label="Nom" id="name" name="name" required={true} autoComplete="username"/>
                    </div>
                    <div>
                        <InputPassword/>
                    </div>
                    <Button variant="contained" type="submit" className="form-btn auth-form-btn">
                        S'inscrire
                    </Button>
                    <div className="switch-form-text">
                        <a onClick={handleClickOnLogin}>Se connecter</a>
                    </div>
                </form>
            </div>
        </>
    );
};
export default SignupForm;
