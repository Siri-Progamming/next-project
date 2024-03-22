import React, { createContext, useContext, useState } from 'react';
import {User, UserWithToken} from "../interfaces/User";
import {useRouter} from "next/router";
interface AuthContextProps {
    user: UserWithToken | null
    login: (userData: any, token: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
interface AuthProviderProps{
    children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<UserWithToken | null>(null);
    const login = (userData:User, token:string) => {
        setUser({ ...userData, token });
    };
    const logout = () => {
        if(user){
            setUser(null);
            router.push('/').then();
        }
    };
    const contextValue = {
        user,
        login,
       logout
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
