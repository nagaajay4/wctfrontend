import CorouselItem from '../layouts/Corousel'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Hidden from '@mui/material/Hidden'
import logoImage from '../assests/westCentralTransportationedited.png';
import CardList from '../layouts/CardList';
import Footer from '../layouts/Footer';
import HomePageHeader from '../layouts/HomePageHeader';

const appStyles = {
  listItem : {
    display: 'list-item',
    fontSize: '1.15rem',
    fontWeight: '300',
  },
  container : {
    background: 'linear-gradient(to bottom right, #EAEEE9 50%, #FFFFF0)',
    fontFamily: 'sansSerif'
  },
  typography : {
    fontSize: "2.0rem",
    fontWeight: "600",
    fontFamily: 'sansSerif',
    color: "#ffffff",
    marginTop: '16px',
    background: 'linear-gradient(to right, #FC6C85 50%, #FF007F)',
  }
}

function Home() {

  return (
    <>
      <HomePageHeader />
      <Box style={appStyles.container}>
        <Box>
          <Hidden mdDown>
            <CorouselItem />
          </Hidden>
        </Box>
        <Typography style={appStyles.typography}>
          We provide safe, affordable and Non-emergency medical transportation services through West Central Minnesota and surrounding communities and out-of-town trips such as going to the doctor in Fargo or Twin Cities.
        </Typography>
        <Container>
            <Typography variant="h3" gutterBottom style={{fontSize: "2.0rem", fontWeight: "600", color: "#808000", marginTop: '16px'}}>
                Welcome to West Central Transportation, Inc (WCTI)
            </Typography>
            <Typography variant='body 1' style={{fontSize: "1.5rem", fontWeight: "600"}}>Non-emergency medical transportation in West Central region of Minnesota. </Typography>
            <Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'} marginTop={'10px'}>
              <Typography variant='body 1' style={{fontSize: "1.15rem", fontWeight: "600"}}>
                Our medical non-emergency car services can be used for appointments with:
              </Typography>
                <List sx={{ listStyleType: 'disc', display:'block', paddingLeft:'20px' }}>
                  <ListItem style={appStyles.listItem}>Doctors – Physician Appointments</ListItem>
                  <ListItem style={appStyles.listItem}>Hospital Inpatient/Outpatient </ListItem>
                  <ListItem style={appStyles.listItem}>Gynecologist</ListItem>
                  <ListItem style={appStyles.listItem}>Hospital Discharge</ListItem>
                  <ListItem style={appStyles.listItem}>Radiation Appointments</ListItem>
                  <ListItem style={appStyles.listItem}>Dialysis Appointments</ListItem>
                  <ListItem style={appStyles.listItem}>Pulmonary and Cardiac Rehabilitation</ListItem>
                  <ListItem style={appStyles.listItem}>Physical Therapists</ListItem>
                  <ListItem style={appStyles.listItem}>Dentist Appointementa</ListItem>
                  <ListItem style={appStyles.listItem}>Chiropractors</ListItem>
                  <ListItem style={appStyles.listItem}>Geriatric Day Care Center</ListItem>
                  <ListItem style={appStyles.listItem}>Massage Therapist</ListItem>
                  <ListItem style={appStyles.listItem}>...and more!</ListItem>
                </List>
            </Box>
        </Container>
        <CardList />
        <Footer />
      </Box>
    </>
  );
}

export default Home
