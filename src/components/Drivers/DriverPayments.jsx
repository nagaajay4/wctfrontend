import React, { useState, useEffect } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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
  Typography,

} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import DriverSidebar from "../../layouts/DriverSidebar";
import AuthUser from "../AuthUser";
import axios from "axios";
import { format } from "date-fns";
// import dotenv from 'dotenv';
// dotenv.config();


function DriverPayments() {
  const [payments, setPayments] = useState([]);

  const { getToken,clearToken  } = AuthUser();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const [newPayemnt, setNewpayment] = useState({
    paymentID: "",
    amount: 0,
    driverID: "",
    paymentDate: "",
    createdAt: "",
    updatedAt: "",
  });

  const paymentColumns = [
    {
      field: "view",
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
    { field: "paymentID", headerName: "Payment ID", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "driverID", headerName: "Driver ID", width: 200 },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      width: 250,
      valueFormatter: (params) =>
        format(new Date(params.value), "MMMM d, yyyy hh:mm a"),
    },
    // { field: "createdAt", headerName: "createdAt",width: 200 },
    // { field: "updatedAt", headerName: "updatedAt",width: 200 },
  ];
  useEffect(() => {
    if (getToken() === null) {
      navigate("/DriverLogin");
    }
    axios({
      baseURL: BASE_URL,
      url: "/driver/payments",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        console.log("response.data", response.data);
        setPayments(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.response.data.message);
        }
      });
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };
  const [open, openchange] = useState(false);
  const handleChange = (event) => {
    setNewpayment({ ...newPayemnt, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    closepopup();
  };
  const handleEditRow = (id) => {
    setIsEditMode(true);
    const pays = payments.filter((pay) => pay.paymentID === id)[0];
    if (pays === null) {
      alert("Id is not found");
    }
    setNewpayment({
      paymentID: pays.paymentID,
      amount: pays.amount,
      driverID: pays.driverID,
      paymentDate: pays.paymentDate,
      createdAt: pays.createdAt,
      updatedAt: pays.updatedAt,
    });
    functionopenpopup();
  };

  return (
    <>
    {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}> */}
      <Box display={"flex"} sx={{ marginTop: "16px"}} >
        <DriverSidebar />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} flexGrow={"1"}>
          <Typography variant="h3" sx={{ marginTop: "70px", color: "#004080" }}>
            Drivers Payments
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
                  <TextField
                    label="Payment ID"
                    name="paymentID"
                    value={newPayemnt.paymentID}
                    onChange={(event) => handleChange(event)}
                    disabled={isEditMode}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Amount"
                    name="amount"
                    value={newPayemnt.amount}
                    disabled={isEditMode}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Driver ID"
                    name="driverID"
                    value={newPayemnt.driverID}
                    disabled={isEditMode}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                
                  <TextField
                    label="Updated At"
                    name="updatedAt"
                    value={newPayemnt.updatedAt ? new Date(newPayemnt.updatedAt).toLocaleDateString() : ""}
                    disabled={isEditMode}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />

                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => handleSubmit(event)}
                  >
                    close
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions>
               
              </DialogActions>
            </Dialog>
          </div>

          <div style={{ height: "80%", width: "100%", marginBottom: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <Container>
              <Toolbar />

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
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}

export default DriverPayments;
