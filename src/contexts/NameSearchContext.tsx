// NameSearchContext.tsx
import React, {createContext, FormEvent, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useConstantes} from "./ConstantesContext";

// Interface pour les valeurs du contexte de recherche par nom
interface NameSearchContextProps {
    search: string;
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
    const [search, setSearch] = useState<string>('');
    const {DISPLAY_LANGUAGE} = useConstantes();

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("SearchBar - handleSubmit : ", search);
        if(search !== '' && search.trim().length > 0){
            let finalQuery = search+"&include_adult=false&language="+DISPLAY_LANGUAGE+"&page=1";
            setQuery(finalQuery);
            router.push('/ui/movies/name-search').then(() => {
            });
        }
        // console.log("SearchBar - handleSubmit reset query  : ", query);
    };

    useEffect(() => {
        const previousLocation = localStorage.getItem('previousLocation');
        if (previousLocation && previousLocation === '/ui/movies/name-search'){
            const lastNameSearch = localStorage.getItem('lastNameSearch');
            if (lastNameSearch && lastNameSearch !== '') {
                if(lastNameSearch !== ''){
                    setQuery(lastNameSearch);
                }
            }
        }
    }, []);

    useEffect(() => {
        if(query && query !== ''){
            localStorage.setItem('lastNameSearch',  query);
        }
    }, [query]);

    // Fonction pour gérer le changement de valeur de l'input de recherche
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // Valeurs fournies par le contexte
    const contextValue = {
        search,
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
