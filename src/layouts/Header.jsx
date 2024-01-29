import React from 'react';
import { AppBar, Toolbar, Grid, Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import logoImage from '../assests/westCentralTransportationedited.png';

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

const LogoutButton = styled(Button)({
  marginLeft: 'auto',
});

export default function Header() {
  return (
    <div className={useStyles}>
      <CssBaseline />
      <AppBarStyled position="static">
        <Toolbar>
          {/* <Grid container direction="row" justifyContent="start" alignItems="start">
            <LogoImage src={logoImage} alt="Logo" />
          </Grid> */}
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <LogoImage src={logoImage} alt="Logo" />
          </Grid>
          {/* <Grid container direction="row" justifyContent="end" alignItems="end">
            <LogoImage src={logoImage} alt="Logo" />
          </Grid> */}
          {/* <LogoutButton color="primary">Logout</LogoutButton> */}
        </Toolbar>
      </AppBarStyled>
    </div>
  );
}
