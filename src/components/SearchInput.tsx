import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchProps {
    value: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (event: any) => void, // fix it
    // eslint-disable-next-line no-unused-vars
    onKeyPress: (event: any) => void
}

export default function SearchInput(props: ISearchProps) {  
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl>
            <TextField
                size="small"
                variant="outlined"
                value={props.value}
                onChange={props.onChange}
                onKeyDown={(e) => e.key === 'Enter' && props.onKeyPress(e)}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                )
            }}
            />
        </FormControl>
      </Box>
    )
}