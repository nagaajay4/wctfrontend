import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Paper, Box } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
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
  const { getToken,clearToken } = AuthUser();
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    // { field: "createdAt", headerName: "Created At" },
    // { field: "updatedAt", headerName: "Updated At" },
  ];
  const handleRideStatusChange = (id, newStatus) => {
    
    axios({
      baseURL: BASE_URL,
      url: "/admin/updateUserRideAsCompleted",
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
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
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

  const handleRideStatusCancel = (id, newStatus) => {  
    axios({
      baseURL: BASE_URL,
      url: "/admin/updateUserRideAsCancelled",
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
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
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

  useEffect(() => {
    if(getToken()===null) {
      navigate('/AdminLogin');
    }
    fetchData();
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
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.message);
        }
      });
  }, []);

  async function fetchData() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/getUserAssignedRides",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        setUsersRows(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setLoading(false);
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.response.data.message);
          setLoading(false);
        }
      });
  }

  const handleStatusChange = (id, newStatus) => {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
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
    })
      .then((response) => {
        fetchData();
        setAlertMessage({
          status: "success",
          alert: "Ride Assigned succesfully..!",
        });
        setAlertOpen(true);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE time out, Please try Again..!",
          });
          setAlertOpen(true);
          setLoading(false);
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          setAlertMessage({
            status: "error",
            alert: error.response.data.message,
          });
          setAlertOpen(true);
          fetchData();
          setLoading(false);
        }
      });
  };
  const handleDriverChange = (id, newStatus) => {
    axios({
      baseURL: BASE_URL,
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
    })
      .then((response) => {
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
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          setAlertMessage({
            status: "error",
            alert: error.response.data.message,
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
    if (validateForm()) {
      setLoading(true);
      axios({
        baseURL: BASE_URL,
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
      })
        .then((response) => {
          
          fetchData();
          closepopup();
          setAlertMessage({
            status: "success",
            alert: "User Added successfully!",
          });
          setAlertOpen(true);
          setLoading(false);
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
            setAlertMessage({
              status: "error",
              alert: "server timeout request",
            });
            setAlertOpen(true);
            setLoading(false);
          }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
            clearToken();
          } else {
            console.log("error", error);
            setAlertMessage({ status: "error", alert: error.response.data.message });
            setAlertOpen(true);
            setLoading(false);
          }
        });
    } else {
      console.log("validation failed");
      setAlertMessage({
        status: "error",
        alert: "Please Check all the details, and  try Again..!",
      });
      setAlertOpen(true);
      setLoading(false);
    }
    // /closepopup();
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
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
  

  const handleClose = (event) => {
    event.preventDefault();
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

                  {/* <TextField
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
                  /> */}

                  {/* <TextField
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
                  /> */}

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
                      type="date"
                      value={user.rideDate}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.rideDate)}
                      helperText={errors.rideDate}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Pick-Up Time"
                      name="pickUpTime"
                      type="time"
                      value={user.pickUpTime}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      autoFocus
                      error={Boolean(errors.pickUpTime)}
                      helperText={errors.pickUpTime}
                      InputLabelProps={{ shrink: true }}
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
      {loading ? (
          <Container sx={{ marginTop: "15rem" }}>
            <CircularProgress />
          </Container>
        ) : ( <Container>
          <Toolbar />
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
}

export default AssignedUsers;
