import React, {useEffect, useState} from "react";
import LoginForm from "../../src/components/Forms/LoginForm";
import {useAuth} from "../../src/contexts/AuthContext";
import {useRouter} from "next/router";

const login: React.FC = () => {
    const {user, isTokenVerified} = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!isTokenVerified){
            setIsLoading(true);
            return;
        }else{
            if(user){
                    router.push(localStorage.getItem('previousLocation') ?? '/').then();
            }else{
                setIsLoading(false);
            }
        }
    }, [isTokenVerified]);

    return (
        <main className="p-0">
        {isLoading ?
            <div>Loading...</div> :
            <div className="flex justify-center items-center h-screen">
                <LoginForm/>
            </div>
        }
        </main>
    );
}
export default login;
