import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, zize, label, value, varient, onChange, options, error = null } = props;

    return (
        <FormControl style={{width:"500px"}}
            variant={varient || "outlined"}
            {...(error && { error: true })}>
            <InputLabel style={{marginTop:"5px"}}>{label}</InputLabel>
            <MuiSelect
                label={label}
                zize={zize}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
