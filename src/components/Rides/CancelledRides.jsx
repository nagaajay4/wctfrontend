import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, Paper, Box } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AdminSidebar from '../../layouts/AdminSidebar';
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
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthUser from "../AuthUser";
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  


const CancelledRides = () => {
  const [ridesRows, setRidesRows] = useState([]);
  const navigate = useNavigate();
  const {getToken,clearToken} =AuthUser();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const filterData = () => {
    // Filter data based on the date range
    setLoading(true);
    if(startDate !== "" || endDate !== "") {
        const filteredRows = filteredData.filter((ride) => {
          const rideDate = new Date(ride.Ride_Date);
          let start, end;
          if (startDate !== "") {
            start = new Date(startDate);
          }
          if (endDate !== "") {
            end = new Date(endDate);
          }
          if (start && end) {
            return rideDate >= start && rideDate <= end;
          } else if (start) {
            return rideDate >= start;
          } else if (end) {
            return rideDate <= end;
          }
        });
      setRidesRows(filteredRows);
      setLoading(false);
    } else {
      fetchCompletedRides();
      setLoading(false);
    }
  };
  const clearFilter = () => {
    // Reset the date filters to their default state
    setStartDate("");
    setEndDate("");
    fetchCompletedRides();
  };

  async function fetchCompletedRides() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/cancelledRides",
      method: "get",
      headers: {
        Authorization: getToken()
      },
    })
      .then((response) => {
        setRidesRows(response.data.data);
        setFilteredData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setLoading(false);
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        }else {
          console.log(error.message);
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    if(getToken()===null) {
      navigate('/AdminLogin');
    }
    fetchCompletedRides();
    axios({
      baseURL: BASE_URL,
      url: "/admin/drivers",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setDrivers(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        }else {
          console.log(error.message);
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

  //Handle Undo Ride
  const handleUndo = (id) => {
    axios({
        baseURL: BASE_URL,
        url: "/admin/cancelledRideUndo",
        method: "post",
        data: {
          rideId: id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      })
        .then((response) => {
          
          fetchCompletedRides();
          setAlertMessage({
            status: "success",
            alert: "Ride marked UNDO successfully..!",
          });
  
          setAlertOpen(true);
          //fetchData();
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
            setAlertMessage({
              status: "error",
              alert: "Unable to UNDO ride as cancelled..!",
            });
  
            setAlertOpen(true);
          } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
            clearToken();
          } else {
            console.log("error", error);
            setAlertMessage({
              status: "error",
              alert: error.response.data.message,
            });
            setAlertOpen(true);
          }
        });
  };


  const rideColumns = [
    {
      field: "edit",
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
    {
      field: "undo",
      headerName: "Undo",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleUndo(params.id)}>
          <SettingsBackupRestoreIcon />
        </IconButton>
      ),
    },
    { field: "RideID", headerName: "Ride ID", width: 100 },
    { field: "Ride_Status", headerName: "Ride Status", width: 150 },
    {field: "Driver_ID",headerName:"Driver ID",minWidth: 120,},
    {
      field: "AssignedDriver",
      headerName: "Driver",
      valueGetter: (params) => {
        const driver = drivers.find((driver) => driver.driverID === params.row.Driver_ID);
        return driver ? driver.driverFirstName + " " + driver.driverLastName : "";
      },
    },
    { field: "Ride_Date", headerName: "Ride Date" },
    { field: "Customer_FirstName", headerName: "First Name" },
    { field: "Customer_LastName", headerName: "Last Name" },
    { field: "Phone_Number", headerName: "Phone_Number" },
    { field: "Transportation_Type", headerName: "T Type" },
    { field: "Pick_Up_Time", headerName: "Pickup Time" },
    { field: "Arrival_Time", headerName: "Arrival Time" },
    { field: "Estimated_Distance", headerName: "Estimated Distance" },
    { field: "Pickup_Address", headerName: "Pickup Address" },
    { field: "Dropoff_Address", headerName: "Dropoff Address" },
    { field: "Pickup_Directions", headerName: "Pickup Directions" },   
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
      Driver_ID: "",
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
    Driver_ID: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    closepopup();
  };
  
  const handleEditRow = (id) => {
    const editRide=ridesRows.filter((ride) => ride.RideID === id)[0];
    if(editRide===null) 
    {
      alert("Id is not found");
    }
    setRide({
      RideID: editRide.RideID,
      Ride_Status: editRide.Ride_Status,
      Ride_Date: editRide.Ride_Date,
      Customer_FirstName: editRide.Customer_FirstName,
      Customer_LastName: editRide.Customer_LastName,
      Phone_Number: editRide.Phone_Number,
      Transportation_Type: editRide.Transportation_Type,
      Pick_Up_Time: editRide.Pick_Up_Time,
      Arrival_Time: editRide.Arrival_Time,
      Estimated_Distance: editRide.Estimated_Distance,
      Pickup_Address: editRide.Pickup_Address,
      Dropoff_Address: editRide.Dropoff_Address,
      Pickup_Directions: editRide.Pickup_Directions,
      Driver_ID: editRide.Driver_ID,
    });
    functionopenpopup();
  };

  return (
    <>
     
      <AdminSidebar />
      <Typography variant="h3" sx={{marginBottom:'12px',color:'#004080'}}>
      Cancelled Rides
      </Typography>
      <div>
        
        <Dialog
          // fullScreen
          open={open}
          onClose={()=>closepopup()}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Completed Ride Details{" "}
            <IconButton onClick={()=>closepopup()} style={{ float: "right" }}>
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
                label="Transportation Type"
                name="Transportation_Type"
                value={ride.Transportation_Type}
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
                label="Arrival Time"
                name="Arrival_Time"
                value={ride.Arrival_Time}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="Estimated Distance"
                name="Estimated_Distance"
                value={ride.Estimated_Distance}
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
                name="Driver_ID"
                value={ride.Driver_ID}
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
      {loading ? (
          <Container sx={{ marginTop: "15rem" }}>
            <CircularProgress />
          </Container>
        ) : (<Container>
          <Toolbar />
          <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            // sx={boxDefault}
          >
            <Stack direction="row" spacing={2} marginTop={2}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ marginRight: 2, width: 200 }} // Adjust width as needed
                InputLabelProps={{ shrink: true }} // Ensure label doesn't overlap
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ marginRight: 2, width: 200 }} // Adjust width as needed
                InputLabelProps={{ shrink: true }} // Ensure label doesn't overlap
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => filterData()}
              >
                Apply Filter
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => clearFilter()}
              >
                Clear Filter
              </Button>
            </Stack>
          </Box>
          <Paper component={Box} width={1} height={700}>
            <DataGrid
              rows={ridesRows}
              columns={rideColumns}
              pageSize={5}
              getRowId={(ridesRows) => ridesRows.RideID}
              // checkboxSelection
              onEditCellChangeCommitted={handleEditCellChange}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Paper>
        </Container>)}
        
      </div>
      <div>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertMessage.status}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {typeof alertMessage.alert === "object"
              ? JSON.stringify(alertMessage.alert)
              : alertMessage.alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default CancelledRides;







