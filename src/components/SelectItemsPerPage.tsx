import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelect {
    value: string,
    label: string,
    options: string[],
    // eslint-disable-next-line no-unused-vars
    onChange: (event: SelectChangeEvent<string>) => void
}

export default function SelectOption(props: ISelect) {  
    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">
            {props.label}
            </InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={props.value}
            label={props.label}
            onChange={props.onChange}
          >
            {props.options.map((x, index) => 
              <MenuItem
                key={index} 
                value={x}
                >
                  {x}
              </MenuItem>
              )}
          </Select>
        </FormControl>
      </Box>
    )
}