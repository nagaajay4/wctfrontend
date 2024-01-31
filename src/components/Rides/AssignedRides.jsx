import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Container, Paper, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
import { useNavigate } from "react-router-dom";
import NoCrashSharpIcon from "@mui/icons-material/NoCrashSharp";

import AdminSidebar from "../../layouts/AdminSidebar";
import { Typography } from "@mui/material";
import AuthUser from "../AuthUser";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignedRides = () => {
  const { http, getToken } = AuthUser();

  const [ridesRows, setRidesRows] = useState([]);
  const rideStatus = ["UPCOMING", "PENDING_UPDATE", "COMPLETED", "CANCELED"];

  const navigate = useNavigate();
  //const drivers = ['Nagaajay', 'Darwin', 'Zak'];
  const [drivers, setDrivers] = useState([]);
  if (getToken() === null) {
    navigate("/AdminLogin");
  }

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  const [snackbaropen, setSnackbaropen] = React.useState(false);

  const handleSnackbarClick = () => {
    setSnackbaropen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbaropen(false);
  };

  useEffect(() => {
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/assignedRides",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data", response.data);
        setRidesRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });

    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/drivers",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data drivers", response.data);
        setDrivers(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });

    //const data = fetchUpComingRides();
    //console.log(data);
    //setRidesRows(data);
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
  const handleRideStatusChange = (id, newStatus) => {
    // const updatedRows = ridesRows.map((ridesRows) =>
    //   ridesRows.RideID === id ? { ...ridesRows, Ride_Status: newStatus } : ridesRows
    // );
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/updateRideAsCompleted",
      method: "post",
      data: {
        rideId: id,
      },

      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },

      timeout: 5000,
    })
      .then((response) => {
        console.log(response);
        console.log("response.data", response.data.data);
        console.log("message", response.data.message);
        const updatedRows = ridesRows.filter((ride) => ride.RideID !== id);

        setRidesRows(updatedRows);
        setAlertMessage({
          status: "success",
          alert: "Ride marked completed successfully..!",
        });

        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to mark ride as completed..!",
          });

          setAlertOpen(true);
        } else {
          console.log("error", error);
          setAlertMessage({
            status: "error",
            alert: "Unable to mark ride as completed..!",
          });

          setAlertOpen(true);
        }
      });
    console.log("Ride id: ", id);
    console.log("Status Selected: ", newStatus);
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
    // const updatedRows = ridesRows.map((ridesRows) =>
    //   ridesRows.RideID === id ? { ...ridesRows, Driver: newStatus } : ridesRows
    // );
    // console.log("Ride id: ", id);
    // console.log("Driver Selected: ", newStatus);
    // setRidesRows(updatedRows);
    console.log("id", id);
    console.log("newStatus", newStatus);
    const updatedRows = ridesRows.map((ridesRows) =>
      ridesRows.RideID === id
        ? { ...ridesRows, Driver: newStatus.driverFirstName }
        : ridesRows
    );
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/assignRide",
      method: "post",
      data: {
        rideId: id,
        driverId: newStatus.driverID,
      },

      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },

      // timeout: 5000,
    })
      .then((response) => {
        console.log(response);
        console.log("response.data", response.data.data);
        console.log("message", response.data.message);
        setRidesRows(updatedRows);
        setAlertMessage({
          status: "success",
          alert: "RIde assigned successfully..!",
        });

        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to assign ride to driver",
          });

          setAlertOpen(true);
        } else {
          console.log("error", error);
          setAlertMessage({
            status: "error",
            alert: "Unable to assign ride to driver",
          });

          setAlertOpen(true);
        }
      });
    //closepopup();
  };

  const rideColumns = [
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "Ride_Status",
      headerName: "Complete Ride",
      width: 80,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(e) => handleRideStatusChange(params.id, e.target.value)}
        >
          <NoCrashSharpIcon />
        </IconButton>
        // <Select
        //   value={params.value}
        //   onChange={(e) => handleRideStatusChange(params.id, e.target.value)}
        // >
        //   {rideStatus && rideStatus.map((status) => (
        //     <MenuItem key={status} value={status}>
        //       {status}
        //     </MenuItem>
        //   ))}
        // </Select>
      ),
      width: 80,
    },

    { field: "RideID", headerName: "Ride ID", width: 100 },
    { field: "Driver_ID", headerName: "Driver_ID" },
    {
      field: "Driver",
      headerName: "Assign Driver",
      minWidth: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleStatusChange(params.id, e.target.value)}
        >
          {drivers &&
            drivers.map((driver) => (
              <MenuItem key={driver.driverID} value={driver}>
                {driver.driverFirstName + " " + driver.driverLastName}
              </MenuItem>
            ))}
        </Select>
      ),
    },
    { field: "Ride_Date", headerName: "Ride Date" },
    { field: "Customer_FirstName", headerName: "First Name" },
    { field: "Customer_LastName", headerName: "Last Name" },
    { field: "Phone_Number", headerName: "Phone_Number" },
    { field: "Transportation_Type", headerName: "T Type" },
    { field: "Pick_Up_Time", headerName: "Pickup Time" },
    { field: "Arrival_Time", headerName: "Arrival Time" },
    { field: "Estimated_Distance", headerName: "Estimated Distance" },

    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   sortable: false,
    //   width: 80,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => (
    //     <IconButton
    //       color="secondary"
    //       onClick={() => {
    //         console.log(params);
    //         handleDeleteRow(params.id);
    //       }}
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   ),
    // },
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
      Driver_Name: "",
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
    Driver_Name: "",
  });
  const handleChange = (event) => {
    setRide({ ...ride, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(ride);
    closepopup();
  };
  // const handleAddRide=()=> {
  //   setIsEditMode(false);
  //   setRide({
  //     RideID: "",
  //     Ride_Status: "",
  //     Ride_Date: "",
  //     Customer_FirstName: "",
  //     Customer_LastName: "",
  //     Phone_Number: "",
  //     Transportation_Type: "",
  //     Pick_Up_Time: "",
  //     Arrival_Time: "",
  //     Estimated_Distance: "",
  //     Pickup_Address: "",
  //     Dropoff_Address: "",
  //     Pickup_Directions: "",
  //     Driver: "",
  //   });
  //   functionopenpopup();
  // }
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editRide = ridesRows.filter((ride) => ride.RideID === id)[0];
    if (editRide === null) {
      alert("Id is not found");
    }
    console.log(editRide);
    const driverAssigned = drivers.filter(
      (driver) => driver.driverID === editRide.Driver_ID
    )[0];

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
      Driver_Name:
        driverAssigned.driverFirstName + " " + driverAssigned.driverLastName,
    });
    functionopenpopup();
    console.log(`Edit row with ID ${editRide[0]}`);
    // navigate('/RidesEditPage',editRide[0]);
  };

  return (
    <>
      {/* <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleSnackbarClick}>
        Open success snackbar
      </Button>
      <Snackbar open={snackbaropen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
    </Stack> */}
      {/* <AdminSidebar items={["AppLogin","UpComingRides","FileUpload"]}></AdminSidebar> */}
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Assigned Rides
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
            Ride Details{" "}
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
                onChange={handleChange}
                disabled={isEditMode}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="Driver ID"
                name="Driver_ID"
                value={ride.Driver_ID}
                onChange={handleChange}
                disabled={isEditMode}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="Driver Name"
                name="Driver_Name"
                value={ride.Driver_Name}
                //onChange={handleChange}
                disabled={isEditMode}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <FormControl>
        <InputLabel>Assign Driver</InputLabel>
              <Select
                              label="Assign Driver"

                //value={params.value}
                onChange={(e) => handleStatusChange(ride.RideID, e.target.value)}
              >
                {drivers &&
                  drivers.map((driver) => (
                    <MenuItem key={driver.driverID} value={driver}>
                      {driver.driverFirstName + " " + driver.driverLastName}
                    </MenuItem>
                  ))}
              </Select>
              </FormControl>

              <TextField
                label="Ride Status"
                name="Ride_Status"
                value={ride.Ride_Status}
                onChange={handleChange}
              />
              <TextField
                label="Ride Date"
                name="Ride_Date"
                value={ride.Ride_Date}
                onChange={handleChange}
              />
              <TextField
                label="Customer First Name"
                name="Customer_FirstName"
                value={ride.Customer_FirstName}
                onChange={handleChange}
              />
              <TextField
                label="Customer Last Name"
                name="Customer_LastName"
                value={ride.Customer_LastName}
                onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name="Phone_Number"
                value={ride.Phone_Number}
                onChange={handleChange}
              />
              <TextField
                label="Transportation Type"
                name="Transportation_Type"
                value={ride.Transportation_Type}
                onChange={handleChange}
              />
              <TextField
                label="Pick Up Time"
                name="Pick_Up_Time"
                value={ride.Pick_Up_Time}
                onChange={handleChange}
              />
              <TextField
                label="Arrival Time"
                name="Arrival_Time"
                value={ride.Arrival_Time}
                onChange={handleChange}
              />
              <TextField
                label="Estimated Distance"
                name="Estimated_Distance"
                value={ride.Estimated_Distance}
                onChange={handleChange}
              />
              {/* <TextField
                label="Estimated cost"
                name="Estimated_Cost"
                value={ride.Estimated_Cost}
                onChange={handleChange}
              /> */}
              {/* <TextField
                label="Pickup Address"
                name="Pickup_Address"
                value={ride.Pickup_Address}
                onChange={handleChange}
              /> */}
              {/* <TextField
                label="Dropoff Address"
                name="Dropoff_Address"
                value={ride.Dropoff_Address}
                onChange={handleChange}
              /> */}
              <TextField
                label="Pickup Directions"
                name="Pickup_Directions"
                value={ride.Pickup_Directions}
                onChange={handleChange}
              />

              {/* <FormControl>
        <InputLabel>Driver</InputLabel>
        <Select
          name="Driver"
          value={ride.Driver}
          onChange={handleChange}
          label="Driver"
        >
          {drivers.map((driver) => (
            <MenuItem key={driver} value={driver}>
              {driver}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
              {/* <FormControl>
        <InputLabel>Ride Status</InputLabel>
        <Select
          name="Ride_Status"
          value={ride.Ride_Status}
          onChange={handleChange}
          label="Ride_Status"
        >
           {rideStatus && rideStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

              {/* <FormControlLabel
                control={<Checkbox defaultChecked color="primary"></Checkbox>}
                label="Please check the Ride ID"
              > </FormControlLabel> */}
              <Button
                color="primary"
                variant="contained"
                onClick={(event) => handleSubmit(event)}
              >
                Submit
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
          </DialogActions>
        </Dialog>
      </div>

      <div style={{ height: "80%", width: "100%" }}>
        <Container>
          <Toolbar />
          <Box
            m={1}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            // sx={boxDefault}
          >
            {/* <Button
              // onClick={functionopenpopup}
              onClick={(event) => handleAddRide(event)}

              color="primary"
              variant="contained"
              sx={{ height: 40 }}
              startIcon={<AirportShuttleIcon />}
            >
              Add Ride
            </Button> */}
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
        </Container>
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
            {alertMessage.alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default AssignedRides;
