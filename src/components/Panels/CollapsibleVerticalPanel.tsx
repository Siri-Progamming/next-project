import React, {useState} from "react";
import MovieFilterForm from "../Forms/MovieFilterForm";

const CollapsibleVerticalPanel: React.FC = () => {
    const [showPanel, setShowPanel] = useState(true);
    const handleMouseEnter = () => {
        setShowPanel(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowPanel(false);
        }, 300);
    };
    return (
        <>
                <div className="relative">
                    <div
                        onMouseOver={handleMouseEnter}
                        className={`absolute top-[10vh] left-[10vw] z-[999] w-[20vw] h-full`}></div>
                    <div id="collapsible-vertical-panel"
                            // onMouseLeave={handleMouseLeave}
                            className={`flex flex-row relative overflow-hidden text-wrap ${
                                showPanel ? '' : 'hidden'}`}>
                        <div className="cursor-pointer">
                            <h1 className="">Rechercher des films</h1>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <MovieFilterForm/>
                        </div>
                    </div>
                </div>
        </>
    );
}
export default CollapsibleVerticalPanel;
