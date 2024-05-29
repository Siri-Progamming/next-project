import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18n
    .use(initReactI18next) // Passe les traductions à react-i18next
    .init({
        resources,
        lng: 'fr', // Langue par défaut
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false // React s'échappe déjà des valeurs
        }
    });

export default i18n;
