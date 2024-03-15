import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import axios from "axios";
import AuthUser from "../AuthUser";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function DriverProfiles() {
  const navigate = useNavigate();
  const [driverDetails, setDriverDetails] = useState([]);
  const { getToken, clearToken } = AuthUser();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [errors, setErrors] = useState({});
  const [countnewdriver, setCountnewdriver] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = React.useState(false);

  const [newdriver, setNewdriver] = useState({
    driverID: "",
    driverFirstName: "",
    driverLastName: "",
    email: "",
    password: "",
    driverAddress: "",
    driverPhoneNumber1: "",
    driverPhoneNumber2: "",
    vehicleColor: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleLicense: "",
    driverLicense: "",
    driverSSN: "",
  });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    if (getToken() === null) {
      navigate("/AdminLogin");
    }
    axios({
      baseURL: BASE_URL,
      url: "/admin/drivers",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setDriverDetails(response.data.data);
        //setRidesRows(response.data.data);
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
          console.log(error.message);
        }
      });
  }, [countnewdriver]);

  const driverColumns = [
    { field: "driverID", headerName: "ID", width: 100 },
    { field: "driverFirstName", headerName: "FirstName", width: 150 },
    { field: "driverLastName", headerName: "LastName" },
    { field: "email", headerName: "email" },
    // { field: "password", headerName: "password" },
    { field: "driverAddress", headerName: "Address" },
    { field: "driverPhoneNumber1", headerName: "PhoneNumber1" },
    // { field: "driverPhoneNumber2", headerName: "driverPhoneNumber2" },
    { field: "vehicleColor", headerName: "Vehicle Color" },
    { field: "vehicleMake", headerName: "Vehicle Make" },
    { field: "vehicleModel", headerName: "Vehicle Model" },
    { field: "vehicleLicense", headerName: "Vehicle License" },
    { field: "driverLicense", headerName: "Driver License" },
    { field: "driverSSN", headerName: "SSN" },
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
  ];

  const handleAddDriver = () => {
    setIsEditMode(false);
    setNewdriver({
      driverID: "",
      driverFirstName: "",
      driverLastName: "",
      email: "",
      password: "",
      driverAddress: "",
      driverPhoneNumber1: "",
      driverPhoneNumber2: "",
      vehicleColor: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleLicense: "",
      driverLicense: "",
      driverSSN: "",
    });
    setErrors({});
    functionopenpopup();
  };
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
    setNewdriver({
      driverID: "",
      driverFirstName: "",
      driverLastName: "",
      email: "",
      password: "",
      driverAddress: "",
      driverPhoneNumber1: "",
      driverPhoneNumber2: "",
      vehicleColor: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleLicense: "",
      driverLicense: "",
      driverSSN: "",
    });
  };
  const handleChange = (event) => {
    setNewdriver({ ...newdriver, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    if (!newdriver.driverFirstName) {
      valid = false;
      newErrors.driverFirstName = "First Name is required";
    }
    if (!newdriver.driverLastName) {
      valid = false;
      newErrors.driverLastName = "Last Name is required";
    }
    if (!newdriver.email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newdriver.email)) {
      valid = false;
      newErrors.email = "Invalid email address";
    }
    if (!newdriver.password) {
      valid = false;
      newErrors.password = "password is required";
    } else if (newdriver.password.length < 8) {
      valid = false;
      newErrors.password = "password is less than 8 characters";
    }
    if (!newdriver.driverAddress) {
      valid = false;
      newErrors.driverAddress = "driver Address is required";
    }
    if (!newdriver.driverPhoneNumber1) {
      valid = false;
      newErrors.driverPhoneNumber1 = "driver PhoneNumber is required";
    }
    if (!newdriver.vehicleColor) {
      valid = false;
      newErrors.vehicleColor = "vehicle Color is required";
    }
    if (!newdriver.vehicleMake) {
      valid = false;
      newErrors.vehicleMake = "vehicle Make is required";
    }
    if (!newdriver.vehicleModel) {
      valid = false;
      newErrors.vehicleModel = "vehicle Model is required";
    }
    if (!newdriver.vehicleLicense) {
      valid = false;
      newErrors.vehicleLicense = "vehicle License is required";
    }
    if (!newdriver.driverLicense) {
      valid = false;
      newErrors.driverLicense = "driver License is required";
    }
    if (!newdriver.driverSSN) {
      valid = false;
      newErrors.driverSSN = "driver SSN is required";
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditMode) {
      if (validateForm()) {
        setLoading(true);
        axios({
          baseURL: BASE_URL,
          url: `/admin/updateDriverDetails/${newdriver.driverID}`,
          method: "post",

          data: {
            //driverId:newdriver.driverID,
            driverFirstName: newdriver.driverFirstName,
            driverLastName: newdriver.driverLastName,
            email: newdriver.email,
            password: newdriver.password,
            driverAddress: newdriver.driverAddress,
            driverPhoneNumber1: newdriver.driverPhoneNumber1,
            driverPhoneNumber2: newdriver.driverPhoneNumber2,
            vehicleColor: newdriver.vehicleColor,
            vehicleMake: newdriver.vehicleMake,
            vehicleModel: newdriver.vehicleModel,
            vehicleLicense: newdriver.vehicleLicense,
            driverLicense: newdriver.driverLicense,
            driverSSN: newdriver.driverSSN,
          },

          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        })
          .then((response) => {
            setCountnewdriver((prevCount) => prevCount + 1);
            closepopup();
            setAlertMessage({
              status: "success",
              alert: "Driver updated successfully!",
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
            } else if (
              error.response.data.error === "Unauthorized" &&
              error.response.data.message === "Invalid token"
            ) {
              clearToken();
            } else {
              console.log("error", error);
              setAlertMessage({
                status: "error",
                alert: error.response.data.message,
              });
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
    } else {
      if (validateForm()) {
        setLoading(true);
        axios({
          baseURL: BASE_URL,
          url: "/admin/addDriver",
          method: "post",
          data: {
            driverFirstName: newdriver.driverFirstName,
            driverLastName: newdriver.driverLastName,
            email: newdriver.email,
            password: newdriver.password,
            driverAddress: newdriver.driverAddress,
            driverPhoneNumber1: newdriver.driverPhoneNumber1,
            driverPhoneNumber2: newdriver.driverPhoneNumber2,
            vehicleColor: newdriver.vehicleColor,
            vehicleMake: newdriver.vehicleMake,
            vehicleModel: newdriver.vehicleModel,
            vehicleLicense: newdriver.vehicleLicense,
            driverLicense: newdriver.driverLicense,
            driverSSN: newdriver.driverSSN,
          },

          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        })
          .then((response) => {
            closepopup();
            setAlertMessage({
              status: "success",
              alert: "Driver added successfully!",
            });
            setAlertOpen(true);
            setCountnewdriver((prevCount) => prevCount + 1);
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
            } else if (
              error.response.data.error === "Unauthorized" &&
              error.response.data.message === "Invalid token"
            ) {
              clearToken();
            } else {
              console.log("error", error.response.data.message);
              setAlertMessage({
                status: "error",
                alert: error.response.data.message,
              });
              setAlertOpen(true);
              setLoading(false);
            }
          });
      } else {
        console.log("validation failed");
        setAlertMessage({
          status: "error",
          alert: "Please fill all the details, and  try Again..!",
        });
        setAlertOpen(true);
        setLoading(false);
      }
    }
  };
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editDriver = driverDetails.filter(
      (driver) => driver.driverID === id
    )[0];
    if (editDriver === null) {
      alert("Id is not found");
    }
    setNewdriver({
      driverID: editDriver.driverID,
      driverFirstName: editDriver.driverFirstName,
      driverLastName: editDriver.driverLastName,
      email: editDriver.email,
      password: editDriver.password,
      driverAddress: editDriver.driverAddress,
      driverPhoneNumber1: editDriver.driverPhoneNumber1,
      driverPhoneNumber2: editDriver.driverPhoneNumber2,
      vehicleColor: editDriver.vehicleColor,
      vehicleMake: editDriver.vehicleMake,
      vehicleModel: editDriver.vehicleModel,
      vehicleLicense: editDriver.vehicleLicense,
      driverLicense: editDriver.driverLicense,
      driverSSN: editDriver.driverSSN,
    });
    setErrors({});
    functionopenpopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Drivers Details
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
            Driver Details{" "}
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              {isEditMode && (
                <TextField
                  label="Driver ID"
                  name="driverID"
                  value={newdriver.driverID}
                  onChange={(event) => handleChange(event)}
                  disabled={true}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "black",
                    },
                  }}
                  autoFocus
                  // error={Boolean(errors.driverID)}
                  // helperText={errors.driverID}
                />
              )}
              <TextField
                label="Driver FirstName"
                name="driverFirstName"
                value={newdriver.driverFirstName}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverFirstName)}
                helperText={errors.driverFirstName}
              />
              <TextField
                label="Driver LastName"
                name="driverLastName"
                value={newdriver.driverLastName}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverLastName)}
                helperText={errors.driverLastName}
              />
              <TextField
                label="Driver Email"
                name="email"
                value={newdriver.email}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              {/* {!isEditMode && ( */}
                <TextField
                  label="Driver password"
                  name="password"
                  value={newdriver.password}
                  onChange={(event) => handleChange(event)}
                  autoFocus
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              
              <TextField
                label="Driver Address"
                name="driverAddress"
                value={newdriver.driverAddress}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverAddress)}
                helperText={errors.driverAddress}
              />
              <TextField
                label="Driver Phone number1"
                name="driverPhoneNumber1"
                value={newdriver.driverPhoneNumber1}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverPhoneNumber1)}
                helperText={errors.driverPhoneNumber1}
              />
              <TextField
                label="Driver Phone number2"
                name="driverPhoneNumber2"
                value={newdriver.driverPhoneNumber2}
                onChange={(event) => handleChange(event)}
              />

              <TextField
                label="Driver License Number"
                name="driverLicense"
                value={newdriver.driverLicense}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverLicense)}
                helperText={errors.driverLicense}
              />

              <TextField
                label="Driver SSN"
                name="driverSSN"
                value={newdriver.driverSSN}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.driverSSN)}
                helperText={errors.driverSSN}
              />

              <TextField
                label="Vehicle Color"
                name="vehicleColor"
                value={newdriver.vehicleColor}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.vehicleColor)}
                helperText={errors.vehicleColor}
              />
              <TextField
                label="Vehicle Make"
                name="vehicleMake"
                value={newdriver.vehicleMake}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.vehicleMake)}
                helperText={errors.vehicleMake}
              />
              <TextField
                label="Vehicle Model"
                name="vehicleModel"
                value={newdriver.vehicleModel}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.vehicleModel)}
                helperText={errors.vehicleModel}
              />
              <TextField
                label="Vehicle License"
                name="vehicleLicense"
                value={newdriver.vehicleLicense}
                onChange={(event) => handleChange(event)}
                autoFocus
                error={Boolean(errors.vehicleLicense)}
                helperText={errors.vehicleLicense}
              />
              {loading ? (
                <Container sx={{ marginTop: "15rem" }}>
                  <CircularProgress />
                </Container>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => handleSubmit(event)}
                >
                  Submit
                </Button>
              )}
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      <div style={{ height: "80%", width: "100%" }}>
        {loading ? (
          <Container sx={{ marginTop: "15rem" }}>
            <CircularProgress />
          </Container>
        ) : (
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
              <Button
                // onClick={functionopenpopup}
                onClick={(event) => handleAddDriver(event)}
                color="primary"
                variant="contained"
                sx={{ height: 40 }}
                startIcon={<AirlineSeatReclineNormalIcon />}
              >
                Add Driver
              </Button>
            </Box>

            <Paper component={Box} width={1} height={700}>
              <DataGrid
                rows={driverDetails}
                columns={driverColumns}
                pageSize={5}
                getRowId={(driverDetails) => driverDetails.driverID}
                // checkboxSelection
                // onEditCellChangeCommitted={handleEditCellChange}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Paper>
          </Container>
        )}
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

export default DriverProfiles;
