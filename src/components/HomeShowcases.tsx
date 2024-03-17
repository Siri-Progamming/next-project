import * as React from 'react';
import HorizontalListShowcase from "./Showcase/HorizontalListShowcase";

interface HomeShowcasesProps {

}
const HomeShowcases: React.FC<HomeShowcasesProps> = ({}) => {
    return (
        <>
            <HorizontalListShowcase api="/api/trending" title="Trending"/>
            <HorizontalListShowcase api="/api/discover" title="Discover"/>
            <HorizontalListShowcase api="/api/discover/toprated" title="Top Rated"/>
        </>
    );
}

export default HomeShowcases;
