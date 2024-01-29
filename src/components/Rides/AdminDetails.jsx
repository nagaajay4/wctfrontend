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

function AdminDetails() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState([]);
  const { http, getToken } = AuthUser();
  const roles=["ADMIN","SUPER ADMIN"]
  if(getToken()===null) {
    navigate('/AdminLogin');
  }

  const [addAdmin, setAddAdmin] = useState({
    adminId:"",
    name: "",
    email: "",
    password: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const [editAdmin, setEditAdmin] = useState({});

  const adminColumns = [
    { field: "adminId", headerName: "adminId", width: 100 },
    { field: "name", headerName: "name", width: 150 },
    { field: "email", headerName: "email" },
    { field: "password", headerName: "password" },
    { field: "role", headerName: "role" },
    { field: "createdAt", headerName: "createdAt" },
    { field: "updatedAt", headerName: "updatedAt" },

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
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => {
            console.log(params);
            handleDeleteRow(params.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    console.log("token", getToken());
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/admins",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data", response.data.data);
        console.log("message", response.data.message);
        setAdminDetails(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
  }, []);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleDeleteRow = (id) => {
    console.log(id);
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/removeAdmin",
      method: "post",
      data: {
        adminId: id,
      },
      headers: {
        Authorization: getToken(),
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data", response.data.data);
        console.log("message", response.data.message);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
      window.location.reload();
  };
  const handleAddAdmin = () => {
    setIsEditMode(false);
    setAddAdmin({
        adminId:"",
      name: "",
      email: "",
      password: "",
      role: "",
      createdAt: "",
      updatedAt: "",
    });

    functionopenpopup();
  };

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
    setAddAdmin({ ...addAdmin, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("new admin", addAdmin);
    if(isEditMode) {
        axios({
            //http://localhost:PORT/api/v1/admin/updateAdmin
            baseURL: "http://localhost:8000/api/v1",
            url: "/admin/updateAdmin",
            method: "post",
            data: {
                adminId:addAdmin.adminId,
              name: addAdmin.name,
              email: addAdmin.email,
              role: addAdmin.role
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
            })
            .catch((error) => {
              if (error.code === "ECONNABORTED") {
                console.log("Request timed out");
              } else {
                console.log("error", error);
              }
            });

    }
    else {
        axios({
            baseURL: "http://localhost:8000/api/v1",
            url: "/admin/addAdmin",
            method: "post",
            data: {
              name: addAdmin.name,
              email: addAdmin.email,
              password: addAdmin.password,
              role: addAdmin.role,
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
            })
            .catch((error) => {
              if (error.code === "ECONNABORTED") {
                console.log("Request timed out");
              } else {
                console.log("error", error);
              }
            });

    }
    
    
    window.location.reload();
    closepopup();
  };
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editAdmin = adminDetails.filter((admin) => admin.adminId === id)[0];
    if (editAdmin === null) {
      alert("Id is not found");
    }
    setAddAdmin(editAdmin);
 
    console.log(`Edit row with ID ${editAdmin}`);
    functionopenpopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Admin Details
      </Typography>
      <div>
        {/* <div>DriversDetail</div> */}
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
              {/* {
            "adminId": "48dd19f0-dcd1-4b2d-8b6f-837c238fd34f",
            "name": "Seshi",
            "email": "iamojey@seshi.com",
            "password": "$2a$10$JBSilVHRG1WiTvwssHQQLODuPxtRnWL6kLBFIvRT7J.PTnGaZKQrS",
            "role": "SUPER ADMIN",
            "createdAt": "2024-01-20T12:11:27.881Z",
            "updatedAt": "2024-01-20T12:11:27.881Z"
        } */}
              {isEditMode == true ? (
                <>
                  <TextField
                    label="Admin ID"
                    name="adminId"
                    value={addAdmin.adminId}
                    onChange={(event) => handleChange(event)}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="Admin Name"
                    name="name"
                    value={addAdmin.name}
                    onChange={(event) => handleChange(event)}
                  />
                  <TextField
                    label="Admin email"
                    name="email"
                    value={addAdmin.email}
                    onChange={(event) => handleChange(event)}
                  />
                  
                  <TextField
                    label="Admin password"
                    name="password"
                    value={addAdmin.password}
                    onChange={(event) => handleChange(event)}
                  />
                  <TextField
                    label="Admin role"
                    name="role"
                    value={addAdmin.role}
                    onChange={(event) => handleChange(event)}
                  />
                  <TextField
                    label="createdAt"
                    name="createdAt"
                    value={addAdmin.createdAt}
                    disabled={true}
                    onChange={(event) => handleChange(event)}
                  />
                  <TextField
                    label="updatedAt"
                    name="updatedAt"
                    value={addAdmin.updatedAt}
                    disabled={true}
                    onChange={(event) => handleChange(event)}
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
                    label="Admin Name"
                    name="name"
                    value={addAdmin.name}
                    onChange={(event) => handleChange(event)}
                  />
                  <TextField
                    label="Admin email"
                    name="email"
                    value={addAdmin.email}
                    onChange={(event) => handleChange(event)}
                  />

                  <TextField
                    label="Admin password"
                    name="password"
                    value={addAdmin.password}
                    onChange={(event) => handleChange(event)}
                  />
                  {/* <TextField
                    label="Admin role"
                    name="role"
                    value={addAdmin.role}
                    onChange={(event) => handleChange(event)}
                  /> */}
                  <FormControl>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={addAdmin.role}
                      onChange={(event) => handleChange(event)}
                      label="Admin role"
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              onClick={(event) => handleAddAdmin(event)}
              color="primary"
              variant="contained"
              sx={{ height: 40 }}
              startIcon={<AirlineSeatReclineNormalIcon />}
            >
              Add Admin
            </Button>
          </Box>

          <Paper component={Box} width={1} height={700}>
            <DataGrid
              rows={adminDetails}
              columns={adminColumns}
              pageSize={5}
              getRowId={(adminDetails) => adminDetails.adminId}
              // checkboxSelection
              // onEditCellChangeCommitted={handleEditCellChange}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default AdminDetails;
