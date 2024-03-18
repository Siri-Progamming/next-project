import {useRouter} from "next/router";
import SearchBar from "./SearchBar";
import React from "react";

const Header: React.FC = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    };
    return (
        <>
            <header className="flex flex-row relative overflow-hidden text-wrap">
                <img src="/fennec.png" alt="logo" onClick={handleClick} className="cursor-pointer"/>
                <div id={"title_sloggan"} onClick={handleClick} className="cursor-pointer">
                    <h1 className="">Fennext</h1>
                    <h2>What'ch next ?</h2>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <SearchBar />
                </div>
            </header>
        </>
    );
}
export default Header;
