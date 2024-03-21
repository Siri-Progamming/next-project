import React, {useState} from "react";
import MovieFilterForm from "../Forms/MovieFilterForm";

const CollapsibleVerticalPanel: React.FC = () => {
    const [showPanel, setShowPanel] = useState(false);
    const handleMouseEnter = () => {
        setShowPanel(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowPanel(false);
        }, 150);
    };
    return (
        <>
            <div className="sticky top-0 z-[499]">
                <div className="relative">
                    <div
                        onMouseOver={handleMouseEnter}
                        className={`absolute left-0 z-[499] w-[1vw] h-screen`}></div>
                    <div id="collapsible-vertical-panel"
                            onMouseLeave={handleMouseLeave}
                            className={`flex flex-row relative overflow-hidden text-wrap ${
                                showPanel ? '' : 'hidden'}`}>
                        <h1 className="">Rechercher des films</h1>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <MovieFilterForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CollapsibleVerticalPanel;
