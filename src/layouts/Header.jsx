import React from 'react';
import { AppBar, Toolbar, Grid,  CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import logoImage from '../assests/westCentralTransportationedited.png';
import { Link } from 'react-router-dom';

const useStyles = styled('div')({
  flexGrow: 1,
});

const LogoImage = styled('img')({
  maxWidth: '150px', // Adjust as needed
  maxHeight: '150px', // Adjust as needed
});

const AppBarStyled = styled(AppBar)({
  backgroundColor: 'white', // Set AppBar background color to white
});



export default function Header() {
  return (
    <div className={useStyles}>
      <CssBaseline />
      <AppBarStyled position="static">
        <Toolbar>
      
          <Grid container direction="row" justifyContent="center" alignItems="center">
          <Link to="/">
            <LogoImage src={logoImage} alt="Logo" />
            </Link>
          </Grid>
        
        </Toolbar>
      </AppBarStyled>
    </div>
  );
}
