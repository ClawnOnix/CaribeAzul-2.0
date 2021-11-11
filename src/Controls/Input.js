import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, variant, Iprops, iLProps, onChange, error = null, ...other } = props;
    return (
        <TextField
            variant={variant || "outlined"}
            label={label}
            InputLabelProps={iLProps}
            InputProps={Iprops}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
