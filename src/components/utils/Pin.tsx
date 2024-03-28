import React from "react";
import PushPinTwoToneIcon from '@mui/icons-material/PushPinTwoTone';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';

interface PinProps {
    isPinned: boolean;
    handlePin: () => void;
}

const Pin: React.FC<PinProps> = ({isPinned, handlePin}) => {


    return (
        <>
            {
                isPinned ?
                    <div className=""><PushPinRoundedIcon onClick={handlePin}/></div>
                    :
                    <div className="rotate-90"><PushPinOutlinedIcon onClick={handlePin}/></div>
            }
        </>
    )
}
export default Pin;
