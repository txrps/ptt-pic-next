import { FormControl, FormLabel } from '@mui/material'
import React from 'react'
import "./FormLabel.css"

interface ILabelInput {
    label?: string;
    children?: React.ReactNode;
}

const FormLabelInput = ({ label, children }: ILabelInput) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" className='text-xs mb-1 font-bold'>{label}</FormLabel>
            {children}
        </FormControl>
    )
}

export default FormLabelInput