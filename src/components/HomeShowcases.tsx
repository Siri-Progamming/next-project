import * as React from 'react';
import HorizontalListShowcase from "./Showcase/HorizontalListShowcase";
import {useAuth} from "../contexts/AuthContext";

interface HomeShowcasesProps {

}

const HomeShowcases: React.FC<HomeShowcasesProps> = ({}) => {
    const {user} = useAuth();

    return (
        <div className="flex flex-col gap-y-8">
            {user && <HorizontalListShowcase type="recommended" title="Mes recommandations personnalisées"/>}
            <HorizontalListShowcase type="trending" title="Les tendances actuelles 🔥"/>
            <HorizontalListShowcase type="toprated" title="Les mieux notés ⭐"/>
        </div>
    )
}

export default HomeShowcases;
