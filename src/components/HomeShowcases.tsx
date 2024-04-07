import * as React from 'react';
import HorizontalListShowcase from "./Showcase/HorizontalListShowcase";
import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";

interface HomeShowcasesProps {

}

const HomeShowcases: React.FC<HomeShowcasesProps> = ({}) => {
    const {user} = useAuth();

    return (
        <div className="flex flex-col gap-y-8">
            {user && <HorizontalListShowcase api={`/api/users/${user?.id}/movies/recommanded`} title="Mes recommandations personnalisées"/>}
            <HorizontalListShowcase api="/api/trending" title="Les tendances actuelles 🔥"/>
            <HorizontalListShowcase api="/api/discover/toprated" title="Les mieux notés ⭐"/>
        </div>
    )
}

export default HomeShowcases;
