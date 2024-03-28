import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import HomeShowcases from "../src/components/HomeShowcases";
interface IndexProps {
    searchQuery: string;
}
const Index:React.FC<IndexProps> = ({searchQuery}) => {
    const router = useRouter();

    useEffect(() => {
        // localStorage.setItem('previousLocation', router.asPath);
    },[] );

    return (
        <main>
            <HomeShowcases />
        </main>
    );
}

export default Index;
