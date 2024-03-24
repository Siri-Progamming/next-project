import React, {useEffect, useState} from "react";
import LoginForm from "../../src/components/Forms/LoginForm";
import {useAuth} from "../../src/contexts/AuthContext";
import {useRouter} from "next/router";

const login: React.FC = () => {
    const {user, isTokenVerified, previousLocation, location} = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!isTokenVerified){
            setIsLoading(true);
            return;
        }else{
            if(user){
                router.push(previousLocation).then();
            }else{
                setIsLoading(false);
            }
        }
    }, [isTokenVerified]);

    return (
        <main>
        {isLoading ?
            <div>Loading...</div> :
            <div className="mt-[150px] ml-[150px]">
                <LoginForm/>
            </div>
        }
        </main>
    );
}
export default login;
