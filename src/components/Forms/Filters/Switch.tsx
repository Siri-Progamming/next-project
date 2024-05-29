import React, {useEffect} from "react";
import { useTranslation } from 'react-i18next';

interface SwitchProps{
    elements: Array<string>;
    onSelect: (element: string) => void;
}
const Switch: React.FC<SwitchProps> = ({elements, onSelect}) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = React.useState<number>(0);

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const index = Number(e.currentTarget.id);
        setIsActive(index);
        onSelect(elements[index]);
    }

    return (
        <ul className="flex flex-row border border-secondary-300 w-fit">
            {elements.map((element, index) => (
                <li key={index}
                    id={String(index)}
                    className={`cursor-pointer ${isActive === index ? "bg-secondary-300 text-white" : "text-secondary-300"} p-2 transition-colors duration-500`}
                    onClick={handleClick}>
                    {element}
                </li>
            ))}
        </ul>
    )
}
export default Switch;
