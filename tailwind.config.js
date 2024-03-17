/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    "200": "#7fbfcf",
                    "300": "#59aac7",
                    "400": "#3a98bf",
                    "500": "#006377",
                    "600": "#005264",
                    "700": "#00424e",
                    "800": "#003439",
                    "900": "#002124"
                },
                secondary: {
                    200: '#fbd38d', // Jaune clair
                    300: '#f6ad55', // Jaune moyen
                    400: '#ed8936', // Orange siège
                    500: '#dd6b20', // Orange foncé
                    600: '#c05621', // Orange brûlé
                    700: '#9c4221', // Orange terre cuite
                    800: '#7b341e', // Orange rouillé
                    900: '#5a261b', // Orange brique
                },
                tertiary: {
                    200: '#feb2b2', // Rouge clair
                    300: '#fc8181', // Rouge moyen
                    400: '#f56565', // Rouge ticket
                    500: '#e53e3e', // Rouge foncé
                    600: '#c53030', // Rouge écarlate
                    700: '#9b2c2c', // Rouge rubis
                    800: '#822727', // Rouge bordeaux
                    900: '#611d1d', // Rouge vin
                },
                neutral: {
                    200: '#cbd5e0', // Gris clair
                    300: '#a0aec0', // Gris moyen
                    400: '#718096', // Gris foncé
                    500: '#4a5568', // Gris sol
                    600: '#2d3748', // Gris charbon
                    700: '#1a202c', // Gris ardoise
                    800: '#171923', // Gris ardoise foncé
                    900: '#0a0c10', // Gris ardoise nuit
                },
                midnight: {
                    200: '#202053',
                    300: '#1c1c49',
                    400: '#18183f',
                    500: '#141435',
                    600: '#10102b',
                    700: '#0c0c21',
                    800: '#080817',
                    900: '#04040e',
                },
                white: '#F3ECE5',
                black: '#04040e',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, #63b3ed, #4299e1)',
                'gradient-secondary': 'linear-gradient(to right, #fbd38d, #f6ad55)',
                'gradient-tertiary': 'linear-gradient(to right, #feb2b2, #fc8181)',
                'gradient-neutral': 'linear-gradient(to right, #cbd5e0, #718096)',
            },
            fontFamily: {
                'body': ['Karla'],
            }
        }
    },
    plugins: [require("daisyui")],
}

