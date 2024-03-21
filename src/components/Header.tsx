import {useRouter} from "next/router";
import SearchBar from "./Forms/SearchBar";
import React, {useState} from "react";

const Header: React.FC = () => {
    const router = useRouter();
    const [showHeader, setShowHeader] = useState(false);
    const handleClick = () => {
        router.push('/');
    };

    const handleMouseEnter = () => {
        setShowHeader(true);
    };

    const handleMouseLeave = () => {
       setTimeout(() => {
            setShowHeader(false);
        }, 300);
    };

    return (
        <>
            <div className="sticky top-0 z-[999]">
                <div className="relative">
                    <div
                        onMouseOver={handleMouseEnter}
                        className={`absolute inset-0 z-[999] w-full h-[10vh]`}></div>
                    <header onMouseLeave={handleMouseLeave}
                            className={`flex flex-row relative overflow-hidden text-wrap ${
                                showHeader ? '' : 'hidden'}`}>
                        <img src="/fennec.png" alt="logo" onClick={handleClick} className="cursor-pointer"/>
                        <div id={"title_sloggan"} onClick={handleClick} className="cursor-pointer">
                            <h1 className="">Fennext</h1>
                            <h2>What'ch next ?</h2>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <SearchBar/>
                        </div>
                    </header>
                </div>
            </div>
            </>
            );
            }
            export default Header;
