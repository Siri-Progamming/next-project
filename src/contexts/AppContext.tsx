import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";

interface AppProps {
}
const AppContext = createContext<AppProps | undefined>(undefined);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAuth must be used within an AppProvider");
    }
    return context;
}

interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const router = useRouter();
    const ignoredPaths = ['/ui/login', '/ui/signup'];

    useEffect(() => {
        if(!ignoredPaths.includes(router.asPath)){
            localStorage.setItem('previousLocation', router.asPath);
        }
    }, [router.asPath]);

    const contextValue = {
    }
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
