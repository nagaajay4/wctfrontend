import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography,Box } from '@mui/material';
import DriverSidebar from '../../layouts/DriverSidebar'
import AuthUser from "../AuthUser";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const rideDetailsStyles = {
  paper: {
    padding: '16px',
    margin: '16px',
    background: '#e6f7ff',
  },
  header: {
    marginTop: '60px',
    marginBottom: '12px',
  },
};

const appStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '16px',
    height: '100%',
    width: '100%',
  },
};

const typoStyle = {
  Typography: {
    fontWeight: 'bold',
    color: 'blue',
  }
}



const RideDetails = ({ ride }) => { 
  return (
    <>
      <Paper elevation={3} style={rideDetailsStyles.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride ID</Typography> {ride.RideID}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride Status</Typography> {ride.Ride_Status}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride Date</Typography> {ride.Ride_Date}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Customer Name</Typography> {`${ride.Customer_FirstName} ${ride.Customer_LastName}`}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Phone Number</Typography> {ride.Phone_Number}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Transportation Type</Typography> {ride.Transportation_Type}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Time</Typography> {ride.Pick_Up_Time}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Arrival Time</Typography> {ride.Arrival_Time}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Estimated Distance</Typography> {ride.Estimated_Distance} miles</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Address</Typography> {ride.Pickup_Address}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Dropoff Address</Typography> {ride.Dropoff_Address}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Directions</Typography> {ride.Pickup_Directions || 'N/A'}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Driver</Typography> {ride.Driver_ID || 'N/A'}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Cost</Typography> {ride.Cost || 'N/A'}</Grid>
        </Grid>
      </Paper>
    </>
  );
};


const UserRideDetails = ({ ride }) => { 
  return (
    <>
      <Paper elevation={3} style={rideDetailsStyles.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride ID</Typography> {ride.rideId}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride Status</Typography> {ride.rideStatus}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Ride Date</Typography> {ride.rideDate}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Customer Name</Typography> {`${ride.firstName} ${ride.lastName}`}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Phone Number</Typography> {ride.phoneNumber}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Time</Typography> {ride.pickUpTime}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Address</Typography> {ride.pickUpAddress}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Dropoff Address</Typography> {ride.dropOffAddress}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Pickup Directions</Typography> {ride.instructions || 'N/A'}</Grid>
          <Grid item xs={12} md={6} lg={4}><Typography style={typoStyle.Typography}>Driver</Typography> {ride.driverId || 'N/A'}</Grid>
          
        </Grid>
      </Paper>
    </>
  );
};


const DriverActiveRides = () => {
  const [myrides,setMyRides]=useState([]);
  const [userrides,setUserRides]=useState([]);
  const {getToken,clearToken} =AuthUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  if(getToken()===null) {
    navigate('/DriverLogin');
  }


  useEffect(() => {
    if(getToken()===null) {
      navigate('/DriverLogin');
    }
    axios({
      baseURL: BASE_URL,
      url: "/driver/assignedRides",
      method: "get",
      headers: {
        Authorization: getToken()
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data",response.data);
        setMyRides(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error);
        }
      });
      axios({
        baseURL: BASE_URL,
        url: "/driver/getAssignedUserRides",
        method: "get",
        headers: {
          Authorization: getToken()
        },
      })
        .then((response) => {
          setUserRides(response.data.data);
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
    <Box display={'flex'}>
      <DriverSidebar />
      <div style={appStyles.container}>
        <Typography variant="h3" sx={{marginTop:'60px',color:'#004080',alignItems:'center', }}>
          Drivers Active Rides
        </Typography>
        {myrides.map((ride, index) => (
          <RideDetails key={index} ride={ride} />
        ))}


        <Typography variant="h3" sx={{marginTop:'60px',color:'#004080'}}>
          Drivers Active Rides For User
        </Typography>
        {userrides.map((ride, index) => (
          <UserRideDetails key={index} ride={ride} />
        ))}
      </div>
    </Box>
  );
};

export default DriverActiveRides;



