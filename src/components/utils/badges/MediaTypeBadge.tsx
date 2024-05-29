import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';
import {MEDIA_TYPES} from "../../../constantes/app_constantes";

interface MediaTypeBadgeProps{
    type: string;
    className?: string;
}
const MediaTypeBadge: React.FC<MediaTypeBadgeProps> = ({type, className}) => {
    const { t } = useTranslation();
    const [color, setColor] = React.useState<string>("");

    useEffect(() => {
        switch (type) {
            case MEDIA_TYPES.movie : setColor("text-primary-400"); break;
            case MEDIA_TYPES.tv : setColor("text-secondary-500"); break;
            case MEDIA_TYPES.people : setColor("text-accent-400"); break;
        }
    }, [type]);
    return (
        <div className={`badge badge-secondary ${className}`}>
            {t(`mediaTypes.${type}`)}
        </div>
    )
}
export default MediaTypeBadge;
