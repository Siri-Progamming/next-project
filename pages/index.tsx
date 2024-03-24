import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from "../src/contexts/AuthContext";
import HomeShowcases from "../src/components/HomeShowcases";
interface IndexProps {
    searchQuery: string;
}
const Index:React.FC<IndexProps> = ({searchQuery}) => {
    const {user, verifyToken} = useAuth();
    const router = useRouter();

    useEffect(() => {
            // verifyToken();
    },[] );

    return (
        <main>
            <HomeShowcases />
        </main>
    );
}

export default Index;
