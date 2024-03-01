import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { Container, Paper, Box, Typography } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DriverSidebar from '../../layouts/DriverSidebar'
import AuthUser from "../AuthUser";
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';


function DriverPastUsers() {
  const [ridesRows, setRidesRows] = useState([]);
  const {getToken,clearToken } =AuthUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  

 // const [snackbaropen, setSnackbaropen] = React.useState(false);

//   const handleSnackbarClick = () => {
//     setSnackbaropen(true);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setSnackbaropen(false);
//   };

  useEffect(() => {
    if(getToken()===null) {
        navigate('/DriverLogin');
      }
    axios({
      baseURL: BASE_URL,
      url: "/driver/getCompletedUserRides",
      method: "get",
      headers: {
        Authorization: getToken()
      },
    })
      .then((response) => {
        setRidesRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.response.data.message);
        }
      });
    }, []);

 


  const handleEditCellChange = (params) => {
    const updatedRows = [...ridesRows];
    updatedRows[params.RideID - 1] = {
      ...updatedRows[params.id - 1],
      [params.field]: params.props.value,
    };
    setRidesRows(updatedRows);
  };
 

  const rideColumns = [
   
   
    { field: "rideId", headerName: "Ride ID", width: 100 },
    { field: "rideStatus", headerName: "Ride Status", width: 150 },
    { field: "rideDate", headerName: "Ride Date",width: 150 },
    { field: "firstName", headerName: "First Name",width: 150 },
    { field: "lastName", headerName: "Last Name",width: 150 },
    { field: "phoneNumber", headerName: "Phone_Number",width: 150 },
    { field: "pickUpTime", headerName: "Pickup Time",width: 150 },
    { field: "pickUpAddress", headerName: "Pickup Address",width: 150 },
    { field: "dropOffAddress", headerName: "Dropoff Address",width: 150 },
    { field: "instructions", headerName: "Pickup Instructions",width: 150 },
     {
      field: "View",
      headerName: "View",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },

  ];

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
    setRide({
      RideID: "",
      Ride_Status: "",
      Ride_Date: "",
      Customer_FirstName: "",
      Customer_LastName: "",
      Phone_Number: "",
      Transportation_Type: "",
      Pick_Up_Time: "",
      Arrival_Time: "",
      Estimated_Distance: "",
      Pickup_Address: "",
      Dropoff_Address: "",
      Pickup_Directions: "",
      Driver: "",
    });
  };

  const [ride, setRide] = useState({
    RideID: "",
    Ride_Status: "",
    Ride_Date: "",
    Customer_FirstName: "",
    Customer_LastName: "",
    Phone_Number: "",
    Transportation_Type: "",
    Pick_Up_Time: "",
    Arrival_Time: "",
    Estimated_Distance: "",
    Pickup_Address: "",
    Dropoff_Address: "",
    Pickup_Directions: "",
    Driver: "",
  });
 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    closepopup();
  };

  const [isEditMode,setIsEditMode]=useState(false);
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editRide=ridesRows.filter((ride) => ride.rideId === id)[0];
    if(editRide===null) 
    {
      alert("Id is not found");
    }
    setRide({ 
      RideID: editRide.rideId,
      Ride_Status: editRide.rideStatus,
      Ride_Date: editRide.rideDate,
      Customer_FirstName: editRide.firstName,
      Customer_LastName: editRide.lastName,
      Phone_Number: editRide.phoneNumber,
      Pick_Up_Time: editRide.pickUpTime,
      Estimated_Distance: editRide.Estimated_Distance,
      Pickup_Address: editRide.pickUpAddress,
      Dropoff_Address: editRide.dropOffAddress,
      Pickup_Directions: editRide.instructions,
      Driver: editRide.driverId,
    });
    functionopenpopup();
    console.log(`Edit row with ID ${editRide[0]}`);
   
  };
  return (
    <>
      <Box display={'flex'}>
        <DriverSidebar />
        <Box display={'flex'} flexDirection={'column'} flexGrow={"1"} margin={'16px'}>
          <Typography variant="h3" sx={{marginTop:'60px', color:'#004080'}}>
                Drivers Past User Rides
          </Typography>
          <div>
            
            <Dialog
              // fullScreen
              open={open}
              onClose={closepopup}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                Completed Ride Details{" "}
                <IconButton onClick={closepopup} style={{ float: "right" }}>
                  <CloseIcon color="primary"></CloseIcon>
                </IconButton>{" "}
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  <TextField
                    label="Ride ID"
                    name="RideID"
                    value={ride.RideID}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Ride Status"
                    name="Ride_Status"
                    value={ride.Ride_Status}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Ride Date"
                    name="Ride_Date"
                    value={ride.Ride_Date}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Customer First Name"
                    name="Customer_FirstName"
                    value={ride.Customer_FirstName}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Customer Last Name"
                    name="Customer_LastName"
                    value={ride.Customer_LastName}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Phone Number"
                    name="Phone_Number"
                    value={ride.Phone_Number}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  
                  <TextField
                    label="Pick Up Time"
                    name="Pick_Up_Time"
                    value={ride.Pick_Up_Time}
                    // onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                 
                
                  <TextField
                    label="Pickup Address"
                    name="Pickup_Address"
                    value={ride.Pickup_Address}
                    //onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Dropoff Address"
                    name="Dropoff_Address"
                    value={ride.Dropoff_Address}
                    //onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Pickup Directions"
                    name="Pickup_Directions"
                    value={ride.Pickup_Directions}
                    //onChange={handleChange}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    name="Driver"
                    value={ride.Driver}
                    //onChange={handleChange}
                    label="Driver"
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  
      
              
                  <Button color="primary" variant="contained" onClick={(event) => handleSubmit(event)}>
                    Close
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions>
              
              </DialogActions>
            </Dialog>
          </div>

          <div style={{ height: "80%", width: "100%" }}>
            <Container>
             

              <Paper component={Box} width={1} height={700}>
                <DataGrid
                  rows={ridesRows}
                  columns={rideColumns}
                  pageSize={5}
                  getRowId={(ridesRows) => ridesRows.rideId}
                  // checkboxSelection
                  onEditCellChangeCommitted={handleEditCellChange}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              </Paper>
            </Container>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default DriverPastUsers




