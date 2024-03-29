import {useRouter} from "next/router";
import SearchBar from "./Forms/SearchBar";
import React, {useState} from "react";
import IcoDropdown from "./utils/IcoDropdown";
import {useAuth} from "../contexts/AuthContext";


const Header: React.FC = () => {
    const router = useRouter();
    const [showHeader, setShowHeader] = useState(false);
    const {user, logout} = useAuth();
    const handleClick = () => {
        router.push('/');
    };
    const handleMouseEnter = () => {
        setShowHeader(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowHeader(false);
        }, 150);
    };

    return (
        <>
            <div className="sticky top-0 z-[999]">
                <div className="relative">
                    <div
                        onMouseOver={handleMouseEnter}
                        className={`absolute inset-0 z-[999] w-full h-[10vh]`}></div>
                    <header onMouseLeave={handleMouseLeave}
                            className={`flex flex-row text-wrap transition-height duration-700 ${
                                showHeader ? 'h-[var(--nav-height)] showHeader' : 'h-0'
                            }`}>
                        <img id="logo" src="/fennec.png" alt="logo" onClick={handleClick} className="cursor-pointer"/>
                        <div id="title_sloggan" onClick={handleClick} className="cursor-pointer">
                            <h1 className="">Fennext</h1>
                            <h2>What'ch next ?</h2>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <SearchBar/>
                        </div>
                        <div className="self-center absolute right-2 flex flex-row">
                            {user && <div  className="self-center mr-2 font-bold"><p>Bonjour {user?.name} !</p></div>}
                            <IcoDropdown/>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}
export default Header;
