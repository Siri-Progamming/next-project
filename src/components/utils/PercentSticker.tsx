import React from "react";
import {NA_VALUE} from "../../constantes/app_constantes";

interface PercentStickerProps{
    note: number | typeof NA_VALUE;
}
const PercentSticker: React.FC<PercentStickerProps> = ({note}) => {
    return (
        <p className="radial-progress text-xs bg-black bg-opacity-100"
           style={{
               // @ts-ignore
               "--value": `${calculNoteForRing(note)}`,
               "--size": "40px", "--thickness": "4px",
               "color": calculColor(note)
           }}
           title={note === NA_VALUE ? "Pas assez de votes récoltés" : ''}
        >
            <span className="text-white font-bold">
                {percentNote(note)}
            </span>
        </p>
    )
}
export default PercentSticker;

function calculNoteForRing(note: number | typeof NA_VALUE): string {
    if (note == NA_VALUE) {
        return NA_VALUE
    }
    note = Math.round(note * 10 / 10) * 10
    if(note == 0){
        return "0"
    }else if(note == 10){
        return "10"
    }else{
        return note.toString();
    }
}

function calculColor(note: number | typeof NA_VALUE):string {
    const badColor = "#C45B5C";
    const averageColor = "#E0AE41";
    const goodColor = "#00C178";
    const percent = percentNote(note);
    return typeof percent === 'number' ? (percent >= 70 ? goodColor : percent >= 50 ? averageColor : badColor) : "transparent";
}

function percentNote(note: number | typeof NA_VALUE):number|typeof NA_VALUE{
    if(note == NA_VALUE){
        return note;
    }
    return Math.round(note * 10);
}
