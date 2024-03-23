import {useRouter} from "next/router";
import SearchBar from "./Forms/SearchBar";
import React, {useState} from "react";
import IcoDropdown from "./Utils/IcoDropdown";
import {useAuth} from "../contexts/AuthContext";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const Header: React.FC = () => {
    const router = useRouter();
    const [showHeader, setShowHeader] = useState(false);
    const {user} = useAuth();
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
                            className={`flex flex-row text-wrap transition-height duration-700 overflow-hidden ${
                                showHeader ? 'h-[var(--nav-height)]' : 'h-0'
                            }`}>
                        <img id="logo" src="/fennec.png" alt="logo" onClick={handleClick} className="cursor-pointer"/>
                        <div id={"title_sloggan"} onClick={handleClick} className="cursor-pointer">
                            <h1 className="">Fennext</h1>
                            <h2>What'ch next ?</h2>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <SearchBar/>
                        </div>
                        <div className="self-center absolute top-1/2 right-2 transform -translate-y-1/2">
                            {user ? <IcoDropdown/> : <div className="avatar placeholder btn btn-lg btn-ghost btn-circle">
                                <div className="bg-neutral text-neutral-content rounded-full">
                                    <span className="text-2xl"><AccountCircleTwoToneIcon className="text-[80px] text-white opacity-93" /></span>
                                </div>
                            </div>}
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}
export default Header;
