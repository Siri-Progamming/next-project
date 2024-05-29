import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {MEDIA_TYPES} from "../../../constantes/app_constantes";

interface MediaTypeBadgeProps{
    type: string;
    className?: string;
}
const MediaTypeBadge: React.FC<MediaTypeBadgeProps> = ({type, className}) => {
    const { t } = useTranslation();
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case MEDIA_TYPES.movie : setColor("bg-primary-400/80 border-primary-300"); break;
            case MEDIA_TYPES.tv : setColor("bg-secondary-500/80 border-secondary-400"); break;
            case MEDIA_TYPES.people : setColor("bg-accent-400/80 border-accent-300"); break;
            default: setColor("");
        }
    }, [type]);

    return (
        type && (
        <div className={`badge ${className} ${color} p-[12px] text-xs font-semibold uppercase tracking-wider text-white shadow-md`}>
            {t(`mediaTypes.${type}`)}
        </div>
        )
    )
}
export default MediaTypeBadge;
