import React, {useState} from "react";
import MovieFilterForm from "../Forms/MovieFilterForm";
import SerieFilterForm from "../Forms/SerieFilterForm";
import Switch from "../Forms/Filters/Switch";

const CollapsibleVerticalPanel: React.FC = () => {
    const [showPanel, setShowPanel] = useState(false);
    const [elementToDisplay, setElementToDisplay] = useState<number>(0); // 0 for movies, 1 for series

    const handleMouseEnter = () => {
        setShowPanel(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowPanel(false);
        }, 150);
    };
    const handleSwitch = (element: string) => {
        setElementToDisplay(element === "Films" ? 0 : 1);
    }
    return (
        <>
            <div className="sticky top-0 z-[1200]">
                <div className="relative">
                    <div
                        onMouseOver={handleMouseEnter}
                        className={`absolute left-0 z-[499] w-[2vw] h-screen`}></div>
                    <div id="collapsible-vertical-panel"
                            onMouseLeave={handleMouseLeave}
                         className={`collapsible-element flex flex-row relative overflow-hidden text-wrap ${
                             showPanel ? 'w-[80vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw] 2xl:w-[20vw] showPanel' : 'w-0'
                         }`}>
                        <h1 className="">Rechercher des médias</h1>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Switch elements={["Films", "Séries"]} onSelect={handleSwitch}/>
                            {elementToDisplay === 0 ?
                                    <MovieFilterForm/>
                                    :
                                    <SerieFilterForm/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CollapsibleVerticalPanel;
