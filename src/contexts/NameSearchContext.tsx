// NameSearchContext.tsx
import React, {createContext, FormEvent, useContext, useState} from "react";
import {useRouter} from "next/router";

// Interface pour les valeurs du contexte de recherche par nom
interface NameSearchContextProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Création du contexte de recherche par nom
const NameSearchContext = createContext<NameSearchContextProps | undefined>(undefined);

// Hook personnalisé pour consommer les valeurs du contexte de recherche par nom
export const useNameSearch = () => {
    const context = useContext(NameSearchContext);
    if (!context) {
        throw new Error("useNameSearch must be used within a NameSearchProvider");
    }
    return context;
};

interface NameSearchProviderProps{
    children: React.ReactNode;
}
// Fournisseur de contexte de recherche par nom
export const NameSearchProvider: React.FC<NameSearchProviderProps> = ({ children }) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("SearchBar - handleSubmit : ", query);
        if(query !== '' && query.trim().length > 0){
            router.push('/ui/movies/search?query='+query).then(() => {
                setQuery('');
            });
        }
        // console.log("SearchBar - handleSubmit reset query  : ", query);
    };

    // Fonction pour gérer le changement de valeur de l'input de recherche
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    // Valeurs fournies par le contexte
    const contextValue = {
        query,
        setQuery,
        handleSubmit,
        handleChange
    };

    // Fournir les valeurs du contexte aux composants enfants
    return (
        <NameSearchContext.Provider value={contextValue}>
            {children}
        </NameSearchContext.Provider>
    );
};
