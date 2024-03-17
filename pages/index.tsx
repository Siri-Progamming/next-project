import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
// @ts-ignore
import {useAuth} from '/src/contexts/auth';
import HomeShowcases from "../src/components/HomeShowcases";
import VerticalListShowcase from "../src/components/Showcase/VerticalListShowcase";
interface IndexProps {
    searchQuery: string;
}
const Index:React.FC<IndexProps> = ({searchQuery}) => {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            //router.push('/ui/sign-in');
        }
    }, [user, router]);

    return (
        <main>
            <HomeShowcases />
        </main>
    );
}

export default Index;
