import React, {useEffect, useState} from "react";
import VerticalListShowcase from "../../../../src/components/Showcase/VerticalListShowcase";
import {useAuth} from "../../../../src/contexts/AuthContext";
import {useRouter} from 'next/router';

interface likesProps {
}
const likes: React.FC<likesProps> = () => {
    const {user, isTokenVerified} = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!isTokenVerified){
            setIsLoading(true);
            return;
        }else{
            if(!user){
                router.push('/ui/login').then();
            }else{
                setIsLoading(false);
            }
        }
    }, [isTokenVerified]);

    return(
        <main>
            {isLoading ?
                <div>Loading...</div>
                :
                <VerticalListShowcase api={`/api/users/${user?.id}/movies/likes`} title = "films préférés : "/>
            }
        </main>
    );
}
export default likes;
