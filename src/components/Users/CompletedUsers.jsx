import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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
import { Typography } from "@mui/material";
import AuthUser from "../AuthUser";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircularProgress from "@mui/material/CircularProgress";

function CompletedUsers() {
  const [usersRows, setUsersRows] = useState([]);
  const {  getToken,clearToken } = AuthUser();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
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
      field: "view",
      headerName: "View",
      sortable: false,
      width: 50,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },

    {
      field: "rideStatus",
      headerName: "Ride Status",
      minWidth: 120,
    },

    { field: "rideId", headerName: "Ride ID", width: 100 },
    { field: "driverId", headerName: "Driver", width: 100 },
    { field: "rideDate", headerName: "Ride Date" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "phoneNumber", headerName: "Phone_Number" },
    { field: "pickUpTime", headerName: "Pickup Time" },

    { field: "pickUpAddress", headerName: "Pickup Address" },
    { field: "dropOffAddress", headerName: "Dropoff Address" },
    { field: "instructions", headerName: "Pickup Instructions" },
    // { field: "createdAt", headerName: "Created At" },
    // { field: "updatedAt", headerName: "Updated At" },
  ];

  useEffect(() => {
    if(getToken()===null) {
      navigate('/AdminLogin');
    }
    fetchData();
   
  }, []);

  async function fetchData() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/getCompletedUserRides",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setUsersRows(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setLoading(false);
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.message);
          setLoading(false);
        }
      });
  }
  const handleEditRow = (id) => {
    // Implement your edit logic here
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
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };

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
    console.log();
    closepopup();
  };
  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Completed User Rides
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
            View User Completed Details{" "}
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
        </Dialog>
      </div>
      <div style={{ height: "80%", width: "100%" }}>
        <Container>
          <Toolbar />
          {loading ? (
          <Container sx={{ marginTop: "15rem" }}>
            <CircularProgress />
          </Container>
        ) : (<Paper component={Box} width={1} height={700}>
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
        </Paper>)}
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

export default CompletedUsers;
