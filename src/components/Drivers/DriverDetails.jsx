// import React, { useState, useEffect } from "react";
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Container, Box} from "@mui/material";
import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DriverSidebar from '../../layouts/DriverSidebar'
import AuthUser from "../AuthUser";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'



const driverDetailsStyles = {
  paper: {
    padding: '16px',
    //margin: '16px',
    maxWidth: '100%',
    background: '#e6f7ff', // Light blue background
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    //marginBottom: '12px',
    color: '#004080', // Dark blue text color
  },
  label: {
    fontWeight: 'bold',
    color: '#0066cc', // Medium blue text color
    width: '48%',
    marginBottom: '10px',
    textAlign:'start',
    fontSize:'20px',
  },
  value: {
    color: '#333', // Dark gray text color
    marginBottom: '10px',
    width: '48%',
    textAlign:'start',
  },
};

const DriverDetail = ({ driver }) => {
  return (
    <>
      <Box display={'flex'}>
        <DriverSidebar />
        <Container maxWidth="sm"  sx={{flexDirection:"column", }} >
          <Typography variant="h3" style={driverDetailsStyles.header}>
              Driver Details
          </Typography>
          <Paper elevation={3} style={driverDetailsStyles.paper}>
            <Box sx={{display:'flex', flexWrap:'wrap'}}>
              <Typography style={driverDetailsStyles.label}>Driver ID</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.driverID}</Typography>

              <Typography style={driverDetailsStyles.label}>Driver Name</Typography>
              <Typography style={driverDetailsStyles.value}>
                {`${driver.driverFirstName} ${driver.driverLastName}`}
              </Typography>

              <Typography style={driverDetailsStyles.label}>Email</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.email}</Typography>

              <Typography style={driverDetailsStyles.label}>Address</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.driverAddress}</Typography>

              <Typography style={driverDetailsStyles.label}>Phone Numbers</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.driverPhoneNumber1}, {driver.driverPhoneNumber2}</Typography>

              <Typography style={driverDetailsStyles.label}>Vehicle Color</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.vehicleColor}</Typography>

              <Typography style={driverDetailsStyles.label}>Vehicle Make/Model</Typography>
              <Typography style={driverDetailsStyles.value}>
                {`${driver.vehicleMake} ${driver.vehicleModel}`}
              </Typography>

              <Typography style={driverDetailsStyles.label}>Vehicle License</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.vehicleLicense}</Typography>

              <Typography style={driverDetailsStyles.label}>Driver License</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.driverLicense}</Typography>

              <Typography style={driverDetailsStyles.label}>SSN:</Typography>
              <Typography style={driverDetailsStyles.value}>{driver.driverSSN}</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

const DriverDetails = () => {
  const [mydriver,setMyDriver]=useState([]);
  const {clearToken,getToken} =AuthUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;


 
  useEffect(() => {
    if(getToken()===null) {
      navigate('/DriverLogin');
    }
  
    axios({
      baseURL: BASE_URL,
      url: "/driver/getDetails",
      method: "get",
      headers: {
        Authorization: getToken()
      },
    })
      .then((response) => {
        setMyDriver([response.data.data]);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        }  else {
          console.log(error.response.data.message);
        }
      });
    }, []);

  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {mydriver.map((driver, index) => (
        <DriverDetail key={index} driver={driver} />
      ))}
    </div>
  );
}

export default DriverDetails;

