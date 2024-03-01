import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, Paper, Box, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriverSidebar from "../../layouts/DriverSidebar";
import AuthUser from "../AuthUser";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Fullscreen } from "@mui/icons-material";

function DriverPastRides() {
  const [ridesRows, setRidesRows] = useState([]);
  const { getToken, clearToken } = AuthUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (getToken() === null) {
      navigate("/DriverLogin");
    }
    axios({
      baseURL: BASE_URL,
      url: "/driver/completedRides",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setRidesRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else if (
          error.response.data.error === "Unauthorized" &&
          error.response.data.message === "Invalid token"
        ) {
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
    { field: "RideID", headerName: "Ride ID", width: 100 },
    { field: "Ride_Status", headerName: "Ride Status", width: 150 },
    { field: "Ride_Date", headerName: "Ride Date" ,width: 150},
    { field: "Customer_FirstName", headerName: "First Name",width: 150 },
    { field: "Customer_LastName", headerName: "Last Name",width: 150 },
    { field: "Phone_Number", headerName: "Phone_Number",width: 150 },
    { field: "Transportation_Type", headerName: "T Type",width: 150 },
    { field: "Pick_Up_Time", headerName: "Pickup Time",width: 150 },
    { field: "Arrival_Time", headerName: "Arrival Time",width: 150 },
    { field: "Estimated_Distance", headerName: "Estimated Distance",width: 150 },
    { field: "Pickup_Address", headerName: "Pickup Address",width: 150 },
    { field: "Dropoff_Address", headerName: "Dropoff Address" ,width: 150},
    { field: "Pickup_Directions", headerName: "Pickup Directions",width: 150 },
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
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    closepopup();
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editRide = ridesRows.filter((ride) => ride.RideID === id)[0];
    if (editRide === null) {
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
    });
    functionopenpopup();
    console.log(`Edit row with ID ${editRide[0]}`);
  };
  return (
    <>
        <Dialog open={open} onClose={closepopup} fullScreen={fullScreen} fullWidth maxWidth="100px">
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
              {/* <TextField
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
                   */}

              <Button
                color="primary"
                variant="contained"
                onClick={(event) => handleSubmit(event)}
              >
                Close
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
     
      <Box display={"flex"}>
        <DriverSidebar />
        <Box
          display={"flex"}
          flexDirection={"column"}
          flexGrow={"1"}
          margin={"16px"}
        >
          <Typography variant="h3" sx={{ marginTop: "60px", color: "#004080" }}>
            Drivers Past Rides
          </Typography>

          <div
            style={{
              overflowX: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Container>
              <Paper component={Box} width={1}>
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
            </Container>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default DriverPastRides;
