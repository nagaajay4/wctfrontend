import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "date-fns";

const ActiveRides = () => {
  const [ridesRows, setRidesRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { getToken,clearToken } = AuthUser();
  const [drivers, setDrivers] = useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = React.useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const navigate = useNavigate();

  const filterData = () => {
    // Filter data based on the date range
   setLoading(true);
    if (startDate !== "" || endDate !== "") {
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
      fetchData();
      setLoading(false);
    }
  };
  const clearFilter = () => {
    // Reset the date filters to their default state
    setLoading(true);
    setStartDate("");
    setEndDate("");
    fetchData();
    setLoading(false);
  };
  async function fetchData() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/unAssignedRides",
      method: "get",
      headers: {
        Authorization: getToken(),
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
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } 
        else {
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    if (getToken() === null) {
      navigate("/AdminLogin");
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
        } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        }else {
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
  const handleDriverChange = (id, newStatus) => {
    axios({
      baseURL: BASE_URL,
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
          setAlertMessage({
            status: "error",
            alert: "Unable to Assign RIDE, Please try Again..!",
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
        }
      });
    closepopup();
  };

  const handleStatusChange = (id, newStatus) => {
    axios({
      baseURL: BASE_URL,
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
    })
      .then((response) => {
       
        fetchData();
        setAlertMessage({
          status: "success",
          alert: "RIde assigned successfully..!",
        });
        setAlertOpen(true);
        closepopup();
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to assign ride to driver",
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
      field: "Driver",
      headerName: "Assign Driver",
      minWidth: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleDriverChange(params.id, e.target.value)}
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
      field: "Ride_Status",
      headerName: "Ride Status",
      minWidth: 120,
    },
    { field: "RideID", headerName: "Ride ID", width: 100 },
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
  //Driver change
  const handleChange = (event) => {
    if (event.target.value !== null) {
      axios({
        baseURL: BASE_URL,
        url: "/admin/assignRide",
        method: "post",
        headers: {
          Authorization: getToken(),
        },
      })
        .then((response) => {
          setRide({ ...ride, [event.target.name]: event.target.value });
          const updatedRows = ridesRows.filter(
            (rides) => rides.RideID !== ride.RideID
          );
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
          } else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
            clearToken();
          }else {
            setAlertMessage({
              status: "error",
              alert: error.response.data.message,
            });
            setAlertOpen(true);
            console.log("error", error);
          }
        });
    }
  };
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
      Driver: editRide.Driver,
    });
    functionopenpopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Un-assigned Rides
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
              <FormControl>
                <InputLabel>Assign Driver</InputLabel>
                <Select
                  label="Assign Driver"
                  //value={params.value}
                  onChange={(e) =>
                    handleStatusChange(ride.RideID, e.target.value)
                  }
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
              <TextField
                label="Pickup Address"
                name="Pickup_Address"
                value={ride.Pickup_Address}
                onChange={handleChange}
              />
              <TextField
                label="Dropoff Address"
                name="Dropoff_Address"
                value={ride.Dropoff_Address}
                onChange={handleChange}
              />
              <TextField
                label="Pickup Directions"
                name="Pickup_Directions"
                value={ride.Pickup_Directions}
                onChange={handleChange}
              />

              <Button
                color="primary"
                variant="contained"
                onClick={(event) => handleSubmit(event)}
              >
                Submit
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
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

          {loading ? (
            <Container sx={{ marginTop: "15rem" }}>
              <CircularProgress />
            </Container>
          ) : (
            <Paper component={Box} width={1} height={700}>
              {ridesRows && (
                <DataGrid
                  rows={ridesRows}
                  columns={rideColumns}
                  pageSize={5}
                  getRowId={(ridesRows) => ridesRows.RideID}
                  onEditCellChangeCommitted={handleEditCellChange}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />
              )}
            </Paper>
          )}
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
};

export default ActiveRides;
