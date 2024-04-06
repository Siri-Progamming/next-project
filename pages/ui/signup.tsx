import React, {useEffect, useState} from "react";
import SignupForm from "../../src/components/Forms/SignupForm";
import {useAuth} from "../../src/contexts/AuthContext";
import {useRouter} from "next/router";

const signup: React.FC = () => {
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
            <div className="flex justify-center items-center h-screen">
                <SignupForm/>
            </div>
        </main>
    );
}
export default signup;
