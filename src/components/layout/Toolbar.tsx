import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, Box } from '@mui/material';
import Logo from '../../assets/pokeball.png';

const ToolBar =() =>{
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor: '#0f224a'}}>
          <Toolbar>
            <Box>
                <img src={Logo} alt='Logo' width={50}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default ToolBar;