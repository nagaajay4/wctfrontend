import React, { useState, useEffect } from "react";
import Header from '../../layouts/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Container, Paper, Box, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DriverSidebar from '../../layouts/DriverSidebar'
import AuthUser from "../AuthUser";
import axios from 'axios';


import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from 'react-router-dom';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DriverPastUsers() {
  const [ridesRows, setRidesRows] = useState([]);
  const {http,getToken} =AuthUser();
  const navigate = useNavigate();
  if(getToken()===null) {
    navigate('/DriverLogin');
  }

  const [snackbaropen, setSnackbaropen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbaropen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbaropen(false);
  };

  useEffect(() => {
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/driver/getCompletedUserRides",
      method: "get",
      headers: {
        Authorization: getToken()
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data",response.data);
        setRidesRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
    }, []);

  const handleDeleteRow = (id) => {
    console.log(id);
    if (ridesRows.filter((ride) => ride.RideID === id)) {
      const updatedRows = ridesRows.filter((ride) => ride.RideID !== id);
      setRidesRows(updatedRows);
    } else {
      alert("ID is already deleted...!");
    }
  };


  const handleEditCellChange = (params) => {
    const updatedRows = [...ridesRows];
    updatedRows[params.RideID - 1] = {
      ...updatedRows[params.id - 1],
      [params.field]: params.props.value,
    };
    setRidesRows(updatedRows);
  };
  const handleStatusChange = (id, newStatus) => {
    const updatedRows = ridesRows.map((ridesRows) =>
      ridesRows.RideID === id ? { ...ridesRows, Driver: newStatus } : ridesRows
    );
    console.log("Ride id: ", id);
    console.log("Driver Selected: ", newStatus);
    setRidesRows(updatedRows);
  };

  const rideColumns = [
   
   
    { field: "rideId", headerName: "Ride ID", width: 100 },
    { field: "rideStatus", headerName: "Ride Status", width: 150 },
    { field: "rideDate", headerName: "Ride Date" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "phoneNumber", headerName: "Phone_Number" },
    { field: "pickUpTime", headerName: "Pickup Time" },
    { field: "pickUpAddress", headerName: "Pickup Address" },
    { field: "dropOffAddress", headerName: "Dropoff Address" },
    { field: "instructions", headerName: "Pickup Instructions" },
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
  const handleChange = (event) => {
    setRide({ ...ride, [event.target.name]: event.target.value });
  };
  const drivers = ['Nagaajay', 'Darwin', 'Zak'];
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(ride);
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
    console.log(editRide);
    setRide({
         // {
    //     "rideId": 2,
    //     "rideStatus": "COMPLETED",
    //     "firstName": "yyyyyyyy",
    //     "lastName": "yyyyyyyyy",
    //     "rideDate": "yyyyyyyyyyyyy",
    //     "pickUpTime": "yyyyyyyyyyyyyyyy",
    //     "pickUpAddress": "yyyyyyyyyyyyyyy",
    //     "dropOffAddress": "yyyyyyyyyyyy",
    //     "phoneNumber": "9876543210",
    //     "instructions": "NULL",
    //     "driverId": "19921",
    //     "createdAt": "2024-02-05T13:51:15.178Z",
    //     "updatedAt": "2024-02-05T16:19:39.245Z"
    // }
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
        <Box display={'flex'} flexDirection={'column'} margin={'16px'}>
          <Typography variant="h3" sx={{marginTop:'60px', color:'#004080'}}>
                Drivers Past Rides
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
              <Box
                m={1}
                //margin
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                // sx={boxDefault}
              >
              
              </Box>

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




