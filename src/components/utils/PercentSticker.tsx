import React from "react";

interface PercentStickerProps{
    note: number;
}
const PercentSticker: React.FC<PercentStickerProps> = ({note}) => {
    const badColor = "#C45B5C";
    const averageColor = "#E0AE41";
    const goodColor = "#00C178";
    return (
        <p className="radial-progress text-xs bg-black bg-opacity-100"
           style={{
               // @ts-ignore
               "--value": `${Math.round(note * 10 / 10) * 10}`,
               "--size": "40px", "--thickness": "4px",
               "color": Math.round(note * 10) >= 70 ? goodColor : Math.round(note * 10) >= 50 ? averageColor : badColor
           }}
        >
            <span className="text-white font-bold">{Math.round(note * 10)}</span>
        </p>
    )
}
export default PercentSticker;
