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
import logoImage from '../assests/westCentralTransportationedited.png';
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;
const navItems = ['About Us', 'Contact', 'Mission'];
function HomePageHeader() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
    const navigate = useNavigate();
  
    const LogoImage = styled('img')({
      maxWidth: '150px',
      maxHeight: '150px',
    });
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <List>
            <ListItem>
              <ListItemButton>
              <LogoImage src={logoImage} alt="Logo" />


              </ListItemButton>
            <Typography onClick={()=>navigate('/')}>
              
            </Typography>

            </ListItem>


          </List>
            
          <Divider />
          <List>
            <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/AboutUs')} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="About Us" />
                  </ListItemButton>


            </ListItem>
            <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/Contact')} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Contact" />
                  </ListItemButton>


            </ListItem>
            <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/Mission')} sx={{ textAlign: 'center' }}>
                  <ListItemText primary="Mission" />
                  </ListItemButton>


            </ListItem>
          
          </List>
        </Box>
      );
  return (
    <Box>
    <AppBar component="nav" sx={{background: "#ffdbc3"}}>
        <Toolbar>
        <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexGrow={1}>
            <Button onClick={()=>navigate('/')}>
            <LogoImage src={logoImage} alt="Logo" />
            </Button>
            <Box sx={{ display: { xs: 'none', sm: 'block' }}} alignContent={'flex-end'}>
                <Button onClick={()=>navigate('/AboutUs')} sx={{color:"#B80000"}}>
                  About Us
                </Button>
                <Button onClick={()=>navigate('/Contact')} sx={{color:"#B80000"}}>
                  Contact
                </Button>
                <Button onClick={()=>navigate('/Mission')} sx={{color:"#B80000"}}>
                  Mission
                </Button>
            </Box>
        </Box>
        </Toolbar>
    </AppBar>
    <CssBaseline />
    <nav>
    <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
        keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
    >
        {drawer}
    </Drawer>
    </nav>
    <Toolbar />
    </Box>
  )
}

export default HomePageHeader