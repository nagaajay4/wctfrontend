import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logoImage from "../assests/westCentralTransportationedited.png";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const LogoImage = styled("img")({
  maxWidth: "150px",
  maxHeight: "150px",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { token, logout,getRole } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout("admin");
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#ffffff", color: "#2f2f2f", display: "flex" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ margin: "auto" }}>
              <LogoImage src={logoImage} alt="Logo" />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
          <ListItem
              disablePadding
              sx={{ display: "block" }}
              
            >
              <span>
                <ListItemText
                  primary="KAIZEN DATA"
                  sx={{ paddingBlockStart:2,paddingLeft: 4, opacity: open ? 1 : 0,fontWeight: 'bold', color: 'red', fontSize: '1.5em' }}
                />
                </span>
              
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/FileUpload")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <UploadFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary="File Upload"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/ActiveRides")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CarCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Un-assigned Rides" sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/AssignedRides")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DepartureBoardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Assigned Rides"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/CompletedRides")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <NoCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Completed Rides"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/CancelledRides")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WrongLocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Cancelled Rides"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/DriverProfiles")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AirlineSeatReclineNormalIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Drivers"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            {(getRole()==="SUPER_ADMIN") && <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/Payments")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Payments"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>}

            {(getRole()==="SUPER_ADMIN") && <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/AdminDetails")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Admin Details"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>}
           

            {/* User */}
            <ListItem
              disablePadding
              sx={{ display: "block" }}   
            >
              <span>
                <ListItemText
                  primary="USER REQUESTS"
                  sx={{ paddingBlockStart:2, paddingLeft: 4,opacity: open ? 1 : 0,fontWeight: 'bold', color: 'red', fontSize: '1.5em' }}
                />
                </span>
              
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/UnAssignedUsers")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CarCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Un-assigned Users" sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/AssignedUsers")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DepartureBoardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Assigned Users"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/CompletedUsers")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <NoCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Completed Users"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/CancelledUsers")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WrongLocationIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Cancelled Users"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>

             {/* User */}
             <ListItem
              disablePadding
              sx={{ display: "block" }}
              
            >
              <span>
                <ListItemText
                  primary="USER FORMS"
                  sx={{ paddingBlockStart:2,paddingLeft: 4, opacity: open ? 1 : 0,fontWeight: 'bold', color: 'red', fontSize: '1.5em' }}
                />
                </span>
              
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/FormDetails")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <CarCrashIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Form Details" sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate("/ContactedForms")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DepartureBoardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Contacted Forms"
                  sx={{ opacity: open ? 1 : 0,fontWeight: 'bold' }}
                />
              </ListItemButton>
            </ListItem>

            

            

           




            {/* Logout */}
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                logoutUser();
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout Admin"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </>
  );
}
