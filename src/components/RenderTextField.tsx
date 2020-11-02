import React from 'react'
import { TextField } from '@material-ui/core'

interface RenderTextFieldProps {
    input: any,
    meta: {touched: boolean, invalid: boolean, error: string}
}

export const RenderTextField: React.FC<RenderTextFieldProps> = ({
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        variant="outlined"
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)