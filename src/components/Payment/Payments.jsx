import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import { Typography } from "@mui/material";
import AuthUser from "../AuthUser";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { format } from 'date-fns';

const Payements = () => {
  const [payments, setPayments] = useState([]);
  const { http, getToken } = AuthUser();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [errors, setErrors] = useState({});
  const [Apicall, setApiCall] = useState();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const navigate = useNavigate();
  const [newPayemnt, setNewpayment] = useState({
    paymentID: "",
    amount: "",
    driverID: "",
    paymentDate: "",
    createdAt: "",
    updatedAt: "",
    remarks: "",
  });

  const paymentColumns = [
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
    { field: "paymentID", headerName: "Payment ID", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "driverID", headerName: "Driver ID", width: 150 },
    { field: "paymentDate", headerName: "Payment Date", width: 250,valueFormatter: (params) => format(new Date(params.value), 'MMMM d, yyyy hh:mm a'), },
    // { field: "createdAt", headerName: "createdAt",width: 200 },
    // { field: "updatedAt", headerName: "Updated At", width: 200 },
    { field: "remarks", headerName: "Remarks", width: 200 },
  ];

  useEffect(() => {
    axios({
      //http://localhost:8000/api/v1/admin/getAllPayments
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/getAllPayments",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data", response.data);
        //setRidesRows(response.data.data);
        setPayments(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  }, [Apicall]);

  const [isEditMode, setIsEditMode] = useState(false);
  const handleAddPayment = () => {
    setIsEditMode(false);
    setNewpayment({
      paymentID: "",
      amount: "",
      driverID: "",
      paymentDate: "",
      createdAt: "",
      updatedAt: "",
      remarks: "",
    });
    functionopenpopup();
  };
  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };
  const [open, openchange] = useState(false);
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
    setNewpayment({ ...newPayemnt, [event.target.name]: event.target.value });
    console.log(newPayemnt);
  };
  function isValidPositiveDecimal(str) {
    const numericValue = parseFloat(str);
    return !isNaN(numericValue) && isFinite(numericValue) && numericValue > 0;
}
  const validateForm = () => {
    let valid = true;
    const newErrors = {};
   
    if (!newPayemnt.driverID) {
      valid = false;
      newErrors.driverID = "driverID is required";
    }
    if (newPayemnt.amount === "") {
      valid = false;
      newErrors.amount = "Amount is required";
    } else if (!isValidPositiveDecimal(newPayemnt.amount)) {
      valid = false;
      newErrors.amount = "Amount should be valid and greater than zero";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

    if (isEditMode) {
      console.log("newPayemnt", newPayemnt);
      console.log("getToken",getToken());
      //http://localhost:8000/api/v1/admin/payments/:paymentId
      if (validateForm()) {
        axios({
          baseURL: "http://localhost:8000/api/v1",
          url: `/admin/payments/${newPayemnt.paymentID}`,
          method: "post",
          // params: {
          //   paymentId: newPayemnt.paymentID,
          // },
          data: {
            driverId: newPayemnt.driverID,
            amount: newPayemnt.amount,
            remarks: newPayemnt.remarks,
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
            setAlertMessage({
              status: "success",
              alert: "Payment Editted succesfully..!",
            });

            setAlertOpen(true);
            closepopup();
            setApiCall(1);
          })
          .catch((error) => {
            if (error.code === "ECONNABORTED") {
              console.log("Request timed out");
              setAlertMessage({
                status: "error",
                alert: "Payment Editted unsuccesfully, Server timeout.!",
              });
              setAlertOpen(true);
            } else {
              setAlertMessage({
                status: "error",
                alert: "Payment Editted Unsuccesfully, Please try again.!",
              });
              setAlertOpen(true);
              console.log("error", error);
            }
          });
      } else {
        console.log("validation failed");
        setAlertMessage({
          status: "error",
          alert: "Please fill correct details, and  try Again..!",
        });
        setAlertOpen(true);
      }
    } else {
      if (validateForm()) {
        console.log("newPayemnt",newPayemnt);
        console.log("getToken",getToken());
        axios({
          baseURL: "http://localhost:8000/api/v1",
          url: "/admin/createPayment",
          method: "post",
          data: {
            driverId: newPayemnt.driverID,
            amount: newPayemnt.amount,
            remarks: newPayemnt.remarks,
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
            setAlertMessage({
              status: "success",
              alert: "Payment submitted succesfully..!",
            });
            setAlertOpen(true);

            closepopup();
            setApiCall(1);
          })
          .catch((error) => {
            if (error.code === "ECONNABORTED") {
              console.log("Request timed out");
              setAlertMessage({
                status: "error",
                alert: "Unable to edit Payment, Server timeout.!",
              });
              setAlertOpen(true);
            } else {
              console.log("error", error);
              console.log("error.data", error.response);
              setAlertMessage({
                status: "error",
                alert: error.response.data.error,
              });
              setAlertOpen(true);
            }
          });
      } else {
        console.log("validation failed");
        setAlertMessage({
          status: "error",
          alert: "Please fill correct details, and  try Again..!",
        });
        setAlertOpen(true);
      }
    }

    //window.location.reload();
  };

  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const pays = payments.filter((pay) => pay.paymentID === id)[0];
    if (pays === null) {
      alert("Id is not found");
    }
    console.log(pays);
    setNewpayment({
      paymentID: pays.paymentID,
      amount: pays.amount,
      driverID: pays.driverID,
      paymentDate: pays.paymentDate,
      createdAt: pays.createdAt,
      updatedAt: pays.updatedAt,
      remarks:pays.remarks

    });
    functionopenpopup();
    console.log(`Edit row with ID ${pays}`);
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Payment Details
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
            Payement Details{" "}
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              {isEditMode == true ? (
                <>
                  <TextField
                    label="Payment ID"
                    name="paymentID"
                    value={newPayemnt.paymentID}
                    onChange={(event) => handleChange(event)}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                    error={Boolean(errors.paymentID)}
                    helperText={errors.paymentID}
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    value={newPayemnt.amount}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.amount)}
                    helperText={errors.amount}
                  />
                  <TextField
                    label="Driver ID"
                    name="driverID"
                    value={newPayemnt.driverID}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.driverID)}
                    helperText={errors.driverID}
                  />
                  {/* <TextField
                    label="Created At"
                    name="createdAt"
                    value={newPayemnt.createdAt}
                    disabled={true}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.createdAt)}
                    helperText={errors.createdAt}
                  /> */}
                  {/* <TextField
                    label="Updated At"
                    name="updatedAt"
                    value={newPayemnt.updatedAt}
                    disabled={true}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.updatedAt)}
                    helperText={errors.updatedAt}
                  /> */}
                  <TextField
                    label="Remarks"
                    name="remarks"
                    value={newPayemnt.remarks}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.remarks)}
                    helperText={errors.remarks}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => handleSubmit(event)}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="Driver ID"
                    name="driverID"
                    value={newPayemnt.driverID}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.driverID)}
                    helperText={errors.driverID}
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    value={newPayemnt.amount}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.amount)}
                    helperText={errors.amount}
                  />
                  <TextField
                    label="Remarks"
                    name="remarks"
                    value={newPayemnt.remarks}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.remarks)}
                    helperText={errors.remarks}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => handleSubmit(event)}
                  >
                    Submit
                  </Button>
                </>
              )}
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
            <Button
              // onClick={functionopenpopup}
              onClick={(event) => handleAddPayment(event)}
              color="primary"
              variant="contained"
              sx={{ height: 40 }}
              startIcon={<MonetizationOnIcon />}
            >
              Add Payment
            </Button>
          </Box>

          <Paper component={Box} width={1} height={700}>
            <DataGrid
              rows={payments}
              columns={paymentColumns}
              pageSize={5}
              getRowId={(payments) => payments.paymentID}
              // checkboxSelection
              // onEditCellChangeCommitted={handleEditCellChange}
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
            {typeof alertMessage.alert === "object"
              ? JSON.stringify(alertMessage.alert)
              : alertMessage.alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Payements;

//Payment ID
//
