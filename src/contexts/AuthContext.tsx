import React, {createContext, useContext, useEffect, useState} from 'react';
import {User} from "../interfaces/User";
import {useRouter} from "next/router";
interface AuthContextProps {
    user: User | null
    login: (userData: any) => void;
    logout: () => void;
    verifyToken: () => void;
    isTokenVerified: boolean;
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
        const checkToken = async () => {
            try{
                await verifyToken();
                setIsTokenVerified(true);
            }catch (error:any){
                setIsTokenVerified(false);
            }
        }
        checkToken().then();
    }, [router.asPath]);

    const login = (userData: User) => {
        setUser(userData);
    };
    const logout = async () => {
        // console.log("Login out");
        setUser(null);
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("error : ", error);
        }
        // router.push('/ui/login').then();
    };

    const contextValue = {
        user,
        login,
        logout,
        verifyToken,
        isTokenVerified
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
