import React, {createContext, useContext, useEffect, useState} from 'react';
import {User} from "../interfaces/User";
import {useRouter} from "next/router";
interface AuthContextProps {
    user: User | null
    login: (userData: any) => void;
    logout: () => void;
    verifyToken: () => void;
    isTokenVerified: boolean;
    location: string;
    previousLocation: string;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
interface AuthProviderProps {
    children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [location, setLocation] = useState(router.asPath);
    const [previousLocation, setPreviousLocation] = useState(location);
    const verifyToken = async () => {
        // console.log("AuthContext gonna call verify-token.ts");
        try {
            const response = await fetch('/api/auth/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                // console.log("veriToken AuthContext data received from OK : ", data);
                if(data) {
                    setUser(data.payload);
                }else{
                    logout();
                }
            } else {
                logout();
            }
        } catch (error) {
            console.error("error : ", error);
            logout();
        }
    }

    //Vérification du token à chaque changement de route
    useEffect(() => {
        // console.log("AuthContext useEffect router.asPath : ", router.asPath);
        const checkToken = async () => {
            if(location !== router.asPath) {
                setPreviousLocation(location);
            }
            if(isTokenVerified){
                setLocation(router.asPath);
            }
            try{
                await verifyToken();
                setIsTokenVerified(true);
            }catch (error){
                setIsTokenVerified(false);
            }
        }
        checkToken().then();
    }, [router.asPath]);

    useEffect(() => {
        console.log("AuthContext useEffect previousLocation : ", previousLocation);
    }, [previousLocation]);

    useEffect(() => {
        console.log("AuthContext useEffect location : ", location);
    }, [location]);

    const login = (userData: User) => {
        setUser(userData);
    };
    const logout = () => {
        // console.log("Login out");
        setUser(null);
        // router.push('/ui/login').then();
    };

    const contextValue = {
        user,
        login,
        logout,
        verifyToken,
        isTokenVerified,
        location,
        previousLocation
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
