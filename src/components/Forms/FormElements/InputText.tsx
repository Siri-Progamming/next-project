import React from "react";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface InputTextProps{
    id?: string;
    name?: string;
    type?: string;
    label?: string;
    required?: boolean;
    autoComplete?: string;
}
const InputText: React.FC<InputTextProps> = ({id,name,type,label, required,  autoComplete}) => {

    return (
        <div>
            <FormControl variant="outlined" className="mb-2 w-[25ch]">
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInput
                    id={id}
                    name={name}
                    type={type}
                    // endAdornment={
                    //     <InputAdornment position="end">
                    //         <EmailOutlinedIcon className="text-white opacity-50" />
                    //     </InputAdornment>
                    // }
                    label={label}
                    required={required}
                    autoComplete={autoComplete}
                />
            </FormControl>
        </div>
    )
}
export default InputText;
