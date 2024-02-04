import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Container, Paper, Box } from "@mui/material";
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
import AdminSidebar from "../../layouts/AdminSidebar";
import { Typography } from "@mui/material";
import AuthUser from "../AuthUser";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NoCrashSharpIcon from "@mui/icons-material/NoCrashSharp";
import CancelIcon from '@mui/icons-material/Cancel';



function AssignedUsers() {
  const [usersRows, setUsersRows] = useState([]);
  const { http, getToken } = AuthUser();
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({});

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      setAlertOpen(false);
      return;
    }
  };
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    rideDate: "",
    pickUpTime: "",
    pickUpAddress: "",
    dropOffAddress: "",
    phoneNumber: "",
    instructions: "",
  });
  const [viewUser, setViewUser] = useState({
    rideId: "",
    rideStatus: "",
    firstName: "",
    lastName: "",
    rideDate: "",
    pickUpTime: "",
    pickUpAddress: "",
    dropOffAddress: "",
    phoneNumber: "",
    instructions: "",
    driverId: "",
    createdAt: "",
    updatedAt: "",
  });

  const userColumns = [
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 50,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "Driver",
      headerName: "Assign Driver",
      minWidth: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleDriverChange(String(params.id), e.target.value)
          }
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
    {
      field: "rideStatus",
      headerName: "Ride Status",
      minWidth: 120,
    },
    {
      field: "Ride_Status",
      headerName: "Complete Ride",
      width: 80,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(e) => handleRideStatusChange(String(params.id), e.target.value)}
        >
          <NoCrashSharpIcon />
        </IconButton>
       
      ),
      width: 80,
    },
    {
      field: "Ride_Statuss",
      headerName: "Cancel Ride",
      width: 80,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(e) => handleRideStatusCancel(String(params.id), e.target.value)}
        >
          <CancelIcon />
        </IconButton>
       
      ),
      width: 80,
    },

    { field: "rideId", headerName: "Ride ID", width: 100 },
    {field:"driverId", headerName:"Driver",width:100},
    { field: "rideDate", headerName: "Ride Date" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "Transportation_Type", headerName: "T Type" },
    { field: "pickUpTime", headerName: "Pickup Time" },

    { field: "pickUpAddress", headerName: "Pickup Address" },
    { field: "dropOffAddress", headerName: "Dropoff Address" },
    { field: "instructions", headerName: "Pickup Instructions" },
    { field: "createdAt", headerName: "Created At" },
    { field: "updatedAt", headerName: "Updated At" },
  ];
  const handleRideStatusChange = (id, newStatus) => {
    
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/updateUserRideAsCompleted",
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
        fetchData();
        setAlertMessage({
          status: "success",
          alert: "Ride marked completed successfully..!",
        });

        setAlertOpen(true);
        fetchData();
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

  const handleRideStatusCancel = (id, newStatus) => {
    
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/updateUserRideAsCancelled",
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
        fetchData();
        setAlertMessage({
          status: "success",
          alert: "Ride marked Cancelled successfully..!",
        });

        setAlertOpen(true);
        fetchData();
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to mark ride as Cancelled..!",
          });

          setAlertOpen(true);
        } else {
          console.log("error", error);
          setAlertMessage({
            status: "error",
            alert: "Unable to mark ride as Cancelled..!",
          });

          setAlertOpen(true);
        }
      });
    console.log("Ride id: ", id);
    console.log("Status Selected: ", newStatus);
  };

  useEffect(() => {
    fetchData();
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
  }, []);

  async function fetchData() {
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/getUserAssignedRides",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data", response.data);
        setUsersRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  }

  const handleStatusChange = (id, newStatus) => {
    console.log("id", id);
    console.log("newStatus", newStatus);
    // const updatedRows = usersRows.map((usersRows) =>
    // usersRows.rideId === id
    //     ? { ...usersRows, Driver: newStatus.driverFirstName }
    //     : usersRows
    // );
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/updateUserRides",
      method: "post",
      data: {
        rideId: id,
        driverId: newStatus.driverID,
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

        fetchData();
        setAlertMessage({
          status: "success",
          alert: "Ride Assigned succesfully..!",
        });
        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE time out, Please try Again..!",
          });
          setAlertOpen(true);
        } else {
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE, Please try Again..!",
          });
          setAlertOpen(true);
          fetchData();
          console.log("error", error);
        }
      });
    //closepopup();
  };
  const handleDriverChange = (id, newStatus) => {
    //console.log("id", id);
    console.log("newStatus", newStatus);
    //const rideID=""+id;
    console.log("id", id);
    console.log("type of id", typeof id);

    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/assignUserRideToDriver",
      method: "post",
      data: {
        rideId: id,
        driverId: newStatus.driverID,
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

        fetchData();
        setAlertMessage({
          status: "success",
          alert: "Ride Assigned succesfully..!",
        });
        setAlertOpen(true);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE time out, Please try Again..!",
          });
          setAlertOpen(true);
        } else {
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE, Please try Again..!",
          });
          setAlertOpen(true);
          fetchData();
          console.log("error", error);
        }
      });
    //closepopup();
  };

  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const tempView = usersRows.filter((user) => user.rideId === id)[0];
    if (tempView === null) {
      alert("Id is not found");
    }
    console.log(tempView);
    setViewUser({
      rideId: tempView.rideId,
      rideStatus: tempView.rideStatus,
      firstName: tempView.firstName,
      lastName: tempView.lastName,
      rideDate: tempView.rideDate,
      pickUpTime: tempView.pickUpTime,
      pickUpAddress: tempView.pickUpAddress,
      dropOffAddress: tempView.dropOffAddress,
      phoneNumber: tempView.phoneNumber,
      instructions: tempView.instructions,
      driverId: tempView.driverId,
      createdAt: tempView.createdAt,
      updatedAt: tempView.updatedAt,
    });
    functionopenpopup();
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!user.firstName) {
      valid = false;
      newErrors.firstName = "First Name is required";
    }
    if (!user.lastName) {
      valid = false;
      newErrors.lastName = "Last Name is required";
    }
    if (!user.rideDate) {
      valid = false;
      newErrors.rideDate = "Ride Date is required";
    }
    if (!user.pickUpTime) {
      valid = false;
      newErrors.pickUpTime = "Pick Up Time is required";
    }

    if (!user.pickUpAddress) {
      valid = false;
      newErrors.pickUpAddress = "PickUp Address is required";
    }
    if (!user.dropOffAddress) {
      valid = false;
      newErrors.dropOffAddress = "Drop Off Address is required";
    }

    if (!user.phoneNumber) {
      valid = false;
      newErrors.phoneNumber = "Phone number is required";
    } else if (user.phoneNumber.length !== 10) {
      valid = false;
      newErrors.phoneNumber = "phoneNumber must be 10 digits";
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmitNewUser = (event) => {
    event.preventDefault();
    console.log("user", user.firstName);
    if (validateForm()) {
      axios({
        baseURL: "http://localhost:8000/api/v1",
        url: "/admin/addUserRide",
        method: "post",

        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          rideDate: user.rideDate,
          pickUpTime: user.pickUpTime,
          pickUpAddress: user.pickUpAddress,
          dropOffAddress: user.dropOffAddress,
          phoneNumber: user.phoneNumber,
          instructions: user.instructions,
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },

        timeout: 5000,
      })
        .then((response) => {
          console.log(response);
          console.log("response.data", response.data.details);
          console.log("message", response.data.message);
          fetchData();
          closepopup();
          setAlertMessage({
            status: "success",
            alert: "User Added successfully!",
          });
          setAlertOpen(true);
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
            setAlertMessage({
              status: "error",
              alert: "server timeout request",
            });
            setAlertOpen(true);
          } else {
            console.log("error", error);
            setAlertMessage({ status: "error", alert: error });
            setAlertOpen(true);
          }
        });
    } else {
      console.log("validation failed");
      setAlertMessage({
        status: "error",
        alert: "Please Check all the details, and  try Again..!",
      });
      setAlertOpen(true);
    }
    // /closepopup();
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setUser({
      ...user,
      rideDate: newDate,
    });
  };

  const handleTimeChange = (newTime) => {
    setUser({
      ...user,
      pickUpTime: newTime,
    });
  };
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const [isEditMode, setIsEditMode] = useState(false);

  const closepopup = () => {
    openchange(false);
    setUser({
      firstName: "",
      lastName: "",
      rideDate: "",
      pickUpTime: "",
      pickUpAddress: "",
      dropOffAddress: "",
      phoneNumber: "",
      instructions: "",
    });
  };
  const handleAddRide = () => {
    setIsEditMode(false);
    setUser({
      firstName: "",
      lastName: "",
      rideDate: "",
      pickUpTime: "",
      pickUpAddress: "",
      dropOffAddress: "",
      phoneNumber: "",
      instructions: "",
    });
    functionopenpopup();
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log();
    closepopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Assigned User Rides
      </Typography>
      <div>
        <Dialog
          // fullScreen
          open={open}
          onClose={closepopup}
          fullWidth
          maxWidth="sm"
        >
          {isEditMode ? (
            <>
              <DialogTitle>
                View User Details{" "}
                <IconButton onClick={closepopup} style={{ float: "right" }}>
                  <CloseIcon color="primary"></CloseIcon>
                </IconButton>{" "}
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  <TextField
                    label="Ride ID"
                    name="rideId"
                    value={viewUser.rideId}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                   <TextField
                    label="Driver ID"
                    name="driverId"
                    value={viewUser.driverId}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Ride Status"
                    name="rideStatus"
                    value={viewUser.rideStatus}
                    fullWidth
                    margin="normal"
                    disabled
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
                      onChange={(e) =>
                        handleStatusChange(String(viewUser.rideId), e.target.value)
                      }
                    >
                      {drivers &&
                        drivers.map((driver) => (
                          <MenuItem key={driver.driverID} value={driver}>
                            {driver.driverFirstName +
                              " " +
                              driver.driverLastName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="First Name"
                    name="firstName"
                    value={viewUser.firstName}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={viewUser.lastName}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Ride Date"
                    name="rideDate"
                    value={viewUser.rideDate}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Pick-Up Time"
                    name="pickUpTime"
                    value={viewUser.pickUpTime}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Pick-Up Address"
                    name="pickUpAddress"
                    value={viewUser.pickUpAddress}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Drop-Off Address"
                    name="dropOffAddress"
                    value={viewUser.dropOffAddress}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={viewUser.phoneNumber}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Instructions"
                    name="instructions"
                    value={viewUser.instructions}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Driver ID"
                    name="driverId"
                    value={viewUser.driverId}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Created At"
                    name="createdAt"
                    value={viewUser.createdAt}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <TextField
                    label="Updated At"
                    name="updatedAt"
                    value={viewUser.updatedAt}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => handleClose(event)}
                  >
                    Close
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions></DialogActions>{" "}
            </>
          ) : (
            <>
              <DialogTitle>
                Add User Details{" "}
                <IconButton onClick={closepopup} style={{ float: "right" }}>
                  <CloseIcon color="primary"></CloseIcon>
                </IconButton>{" "}
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  <div>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />

                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />

                    <TextField
                      label="Ride Date"
                      name="rideDate"
                      value={user.rideDate}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.rideDate)}
                      helperText={errors.rideDate}
                    />

                    <TextField
                      label="Pick-Up Time"
                      name="pickUpTime"
                      value={user.pickUpTime}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.pickUpTime)}
                      helperText={errors.pickUpTime}
                    />

                    <TextField
                      label="Pick-Up Address"
                      name="pickUpAddress"
                      value={user.pickUpAddress}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.pickUpAddress)}
                      helperText={errors.pickUpAddress}
                    />

                    <TextField
                      label="Drop-Off Address"
                      name="dropOffAddress"
                      value={user.dropOffAddress}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.dropOffAddress)}
                      helperText={errors.dropOffAddress}
                    />

                    <TextField
                      label="Phone Number"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.phoneNumber)}
                      helperText={errors.phoneNumber}
                    />

                    <TextField
                      label="Instructions"
                      name="instructions"
                      value={user.instructions}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => handleSubmitNewUser(event)}
                  >
                    Submit
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions></DialogActions>
            </>
          )}
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
              Add User Ride
            </Button> */}
          </Box>

          <Paper component={Box} width={1} height={700}>
            {usersRows && (
              <DataGrid
                rows={usersRows}
                columns={userColumns}
                pageSize={5}
                getRowId={(usersRows) => usersRows.rideId}
                // checkboxSelection
                //onEditCellChangeCommitted={handleEditCellChange}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            )}
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
            {typeof alertMessage.alert === "object"
              ? JSON.stringify(alertMessage.alert)
              : alertMessage.alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default AssignedUsers;
