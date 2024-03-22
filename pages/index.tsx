import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from "../src/contexts/AuthContext";
import HomeShowcases from "../src/components/HomeShowcases";
interface IndexProps {
    searchQuery: string;
}
const Index:React.FC<IndexProps> = ({searchQuery}) => {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/ui/login').then();
        }
    }, [user, router]);

    return (
        <main>
            <HomeShowcases />
        </main>
    );
}

export default Index;
