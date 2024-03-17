import {router} from "next/client";
import {useRouter} from "next/router";
import SearchBar from "./SearchBar";
import React from "react";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    };

    const handleSearch = (query: string) => {
        router.push('/ui/movies/search?query='+query);
    }

    return (
        <>
            <header className="flex flex-row">
                <img src="/fennec.png" alt="logo" onClick={handleClick} className="cursor-pointer"/>
                <div id={"title_sloggan"} onClick={handleClick} className="cursor-pointer">
                    <h1 className="">Fennext</h1>
                    <h2>What'ch next ?</h2>
                </div>
                <SearchBar onSearch={handleSearch} />
            </header>
        </>
    );
}
export default Header;
