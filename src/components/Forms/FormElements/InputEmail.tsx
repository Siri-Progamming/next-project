import React from "react";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface InputEmailProps{

}
const InputEmail: React.FC<InputEmailProps> = () => {

    return (
        <div>
            <FormControl variant="outlined" className="mb-2 w-[25ch]">
                <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    name="email"
                    type="email"
                    endAdornment={
                        <InputAdornment position="end">
                            <EmailOutlinedIcon className="text-white opacity-50" />
                        </InputAdornment>
                    }
                    label="E-mail"
                    required={true}
                    autoComplete="username"
                />
            </FormControl>
        </div>
    )
}
export default InputEmail;
