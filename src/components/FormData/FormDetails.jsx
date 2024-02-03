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
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../layouts/AdminSidebar";
import axios from "axios";
import AuthUser from "../AuthUser";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


function FormDetails() {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [errors, setErrors] = useState({});
  const { http, getToken } = AuthUser();
  const [formDetails, setFormDetails] = useState([]);
  const [viewDetail,setViewDetails]=useState({});

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

//   {
//     "message": "Form created Succefully",
//     "details": {
//         "contactID": "60be936b-893b-4405-b509-8af263a308b4",
//         "name": "asdasd",
//         "phoneNumber": "9821391324",
//         "email": "asdadz@domain.com",
//         "message": "asdasdsadsad",
//         "status": "NOT CHECKED",
//         "createdAt": "2024-02-03T05:38:35.836Z",
//         "updatedAt": "2024-02-03T05:38:35.836Z"
//     },
//     "err": {}
// }
const handleContactStatusChange = (id) => {
  console.log("id: ",id);
  axios({
    baseURL: "http://localhost:8000/api/v1",
    url: `/admin/updateFormContact/${id}`,
    method: "post",
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
        alert: "Marked user as contacted succesfully..!",
      });

      setAlertOpen(true);
      fetchData();
      // closepopup();
      // setApiCall(1);
    })
    .catch((error) => {
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out");
        setAlertMessage({
          status: "error",
          alert: "Unable to update the status, Server timeout.!",
        });
        setAlertOpen(true);
      } else {
        setAlertMessage({
          status: "error",
          alert: "Unable to update the status, Please try again.!",
        });
        setAlertOpen(true);
        console.log("error", error);
      }
    });

}

  const formColumns = [
    { field: "contactID", headerName: "Contact ID", width: 200 },
    { field: "name", headerName: "name", width: 150 },
    { field: "phoneNumber", headerName: "phoneNumber" },
    { field: "email", headerName: "email" },
    // { field: "password", headerName: "password" },
    { field: "message", headerName: "message" },
    { field: "status", headerName: "status" },
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
        <IconButton color="primary" onClick={() => handleEditRow(params.id)} >
          <RemoveRedEyeIcon />
        </IconButton>
      ),
    },
   
  ];
  const handleEditRow = (id) => {
    // Implement your edit logic here
    // setIsEditMode(true);
    const tempDetail=formDetails.filter((detail) => detail.contactID === id)[0];
    if(tempDetail===null) 
    {
      alert("Id is not found");
    }
    // console.log("editRide",editRide);
    setViewDetails({
      contactID: tempDetail.contactID,
        name: tempDetail.name,
        phoneNumber: tempDetail.phoneNumber,
        email: tempDetail.email,
        message: tempDetail.message,
        status: tempDetail.status,
        createdAt: tempDetail.createdAt,
        updatedAt: tempDetail.updatedAt
    });

    functionopenpopup();
    // console.log(`Edit row with ID ${editRide[0]}`);
    // // navigate('/RidesEditPage',editRide[0]);
   
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
        updatedAt: ""
    });
  };

  async function fetchData() {

    console.log("token", getToken());
    axios({
      //http://localhost:8000/api/v1/admin/getFormDetailsNotContacted
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/getFormDetailsNotContacted",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        setFormDetails(response.data.details);
        console.log("response.data", response.data.details);
        console.log("message", response.data.message);
        //setDriverDetails(response.data.data);
        //setRidesRows(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(ride);
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
          onClose={()=>closepopup()}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            From User Details{" "}
            <IconButton onClick={()=>closepopup()} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>

            {/* contactID: "",
        name: "",
        phoneNumber: "",
        email: "",
        message: "",
        status: "",
        createdAt: "",
        updatedAt: "" */}
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
             
    
        
              <Button color="primary" variant="contained" onClick={(event) => handleSubmit(event)}>
                Close
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            
          </DialogActions>
        </Dialog>
      </div>
      


      <div style={{ height: "80%", width: "100%" }}>
        <Container>
          <Toolbar />

          <Paper component={Box} width={1} height={700}>
            <DataGrid
              rows={formDetails}
              columns={formColumns}
              pageSize={5}
              getRowId={(formDetails) => formDetails.contactID}
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
}

export default FormDetails;
