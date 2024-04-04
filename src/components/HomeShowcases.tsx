import * as React from 'react';
import HorizontalListShowcase from "./Showcase/HorizontalListShowcase";
import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";

interface HomeShowcasesProps {

}

const HomeShowcases: React.FC<HomeShowcasesProps> = ({}) => {
    const {user} = useAuth();
    const [isRecommandedEmpty, setIsRecommandedEmpty] = React.useState<boolean>(true);
    const [isRecommandedLoading, setIsRecommandedLoading] = React.useState<boolean>(true);

    const handleCheckListEmpty = (isListEmpty: boolean) => {
        console.log("Handling isRecommandedEmpty", isListEmpty);
        setIsRecommandedEmpty(isListEmpty);
    }
    const handleCheckRecommandedLoading = (isLoading: boolean) => {
        setIsRecommandedLoading(isLoading);
    }
    useEffect(() => {
        console.log("isRecommandedEmpty", isRecommandedEmpty);
    }, [isRecommandedEmpty]);
    return (
        <>
            <HorizontalListShowcase api="/api/trending" title="Trending"/>
            {user && <HorizontalListShowcase api={`/api/users/${user?.id}/movies/recommanded`} title="Mes recommandations"/>}
            <HorizontalListShowcase api="/api/discover/toprated" title="Top Rated"/>
            <HorizontalListShowcase api="/api/discover" title="Discover"/>
        </>
    )
}

export default HomeShowcases;
