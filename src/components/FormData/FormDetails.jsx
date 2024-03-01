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
import AdminSidebar from "../../layouts/AdminSidebar";
import axios from "axios";
import AuthUser from "../AuthUser";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircularProgress from "@mui/material/CircularProgress";

function FormDetails() {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { getToken,clearToken  } = AuthUser();
  const [formDetails, setFormDetails] = useState([]);
  const [viewDetail, setViewDetails] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleContactStatusChange = (id) => {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: `/admin/updateFormContact/${id}`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((response) => {
       
        setAlertMessage({
          status: "success",
          alert: "Marked user as contacted succesfully..!",
        });
        setAlertOpen(true);
        fetchData();
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({
            status: "error",
            alert: "Unable to update the status, Server timeout.!",
          });
          setAlertOpen(true);
          setLoading(false);
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          setAlertMessage({
            status: "error",
            alert: error.response.data.message,
          });
          setAlertOpen(true);
          setLoading(false);
        }
      });
  };

  const formColumns = [
    { field: "contactID", headerName: "Contact ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "email", headerName: "Email" },
    // { field: "password", headerName: "password" },
    { field: "message", headerName: "Message" },
    { field: "status", headerName: "Status" },
    // { field: "createdAt", headerName: "createdAt" },
    {
      field: "Contact_Status",
      headerName: "Checked",
      width: 80,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={(e) => handleContactStatusChange(params.id)}
        >
          <ContactPhoneIcon />
        </IconButton>
      ),
      width: 80,
    },

    {
      field: "edit",
      headerName: "View",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        //
        <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
  ];
  const handleEditRow = (id) => {
    // Implement your edit logic here
    // setIsEditMode(true);
    const tempDetail = formDetails.filter(
      (detail) => detail.contactID === id
    )[0];
    if (tempDetail === null) {
      alert("Id is not found");
    }
    setViewDetails({
      contactID: tempDetail.contactID,
      name: tempDetail.name,
      phoneNumber: tempDetail.phoneNumber,
      email: tempDetail.email,
      message: tempDetail.message,
      status: tempDetail.status,
      createdAt: tempDetail.createdAt,
      updatedAt: tempDetail.updatedAt,
    });

    functionopenpopup();
    
  };
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
    setViewDetails({
      contactID: "",
      name: "",
      phoneNumber: "",
      email: "",
      message: "",
      status: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  async function fetchData() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/getFormDetailsNotContacted",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        setFormDetails(response.data.details);
        
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setAlertMessage({ status: "error", alert: "server timeout request" });
          setAlertOpen(true);
          setLoading(false);
        }else if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        } else {
          console.log(error.message);
          setAlertMessage({ status: "error", alert: error.message });
          setAlertOpen(true);
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    closepopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        User Form Details
      </Typography>

      <div>
        <Dialog
          // fullScreen
          open={open}
          onClose={() => closepopup()}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            From User Details{" "}
            <IconButton onClick={() => closepopup()} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                label="contact ID"
                name="contactID"
                value={viewDetail.contactID}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="User Name"
                name="name"
                value={viewDetail.name}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="User PhoneNumber"
                name="phoneNumber"
                value={viewDetail.phoneNumber}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="Customer email"
                name="email"
                value={viewDetail.email}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="Customer message"
                name="message"
                value={viewDetail.message}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="status"
                name="status"
                value={viewDetail.status}
                // onChange={handleChange}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="createdAt"
                name="createdAt"
                value={new Date(viewDetail.createdAt).toLocaleString()}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
              <TextField
                label="updatedAt"
                name="updatedAt"
                value={new Date(viewDetail.updatedAt).toLocaleString()}
                disabled={true}
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
                Close
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      <div style={{ height: "80%", width: "100%" }}>
        {loading ? (
          <Container sx={{ marginTop: "15rem" }}>
            {" "}
            <CircularProgress />{" "}
          </Container>
        ) : (
          <Container>
            <Toolbar />

            <Paper component={Box} width={1} height={700}>
              <DataGrid
                rows={formDetails}
                columns={formColumns}
                pageSize={5}
                getRowId={(formDetails) => formDetails.contactID}
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

export default FormDetails;
