import * as React from 'react';
export default function SignIn() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                //login(data.userData, data.token);
                router.push('/');
            } else {
                console.error('Failed to sign in');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
      <h1>LOGIN PAGE</h1>
    );
}
