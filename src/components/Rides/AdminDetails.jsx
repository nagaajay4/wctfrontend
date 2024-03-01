import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  FormControl,
  InputLabel,
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

function AdminDetails() {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState([]);
  const { clearToken, getToken } = AuthUser();
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });
  const [loading, setLoading] = React.useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const roles = ["ADMIN", "SUPER_ADMIN"];

  const [addAdmin, setAddAdmin] = useState({
    adminId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  const adminColumns = [
    { field: "adminId", headerName: "Admin Id", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    // { field: "password", headerName: "password" },
    { field: "role", headerName: "Role", width: 200 },
    // { field: "createdAt", headerName: "createdAt" },
    // { field: "updatedAt", headerName: "updatedAt" },

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
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   sortable: false,
    //   width: 80,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => {
    //     const currentUser = getUser();
    //     const isCurrentUser = toString(sessionStorage.getItem("user")) === toString(params.row.email);
    //     console.log("params.id", params.row.email);
    //     return (
    //       <IconButton
    //         color="secondary"
    //         disabled={isCurrentUser}
    //         onClick={() => {
    //           if (!isCurrentUser) {
    //             console.log(params);
    //             handleDeleteRow(params.id);
    //           }
    //         }}
    //       >
    //         <DeleteIcon />
    //       </IconButton>
    //     );
    //   },
    // },
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
            handleDeleteRow(params.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  async function fetchData() {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/admins",
      method: "get",
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setAdminDetails(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
          setLoading(false);
        } else if (
          error.response.data.error === "Unauthorized" &&
          error.response.data.message === "Invalid token"
        ) {
          clearToken();
        } else {
          console.log(error.message);
          setLoading(false);
        }
      });
  }
  useEffect(() => {
    if (getToken() === null) {
      navigate("/AdminLogin");
    }
    fetchData();
  }, []);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleDeleteRow = (id) => {
    setLoading(true);
    axios({
      baseURL: BASE_URL,
      url: "/admin/removeAdmin",
      method: "post",
      data: {
        adminId: id,
      },
      headers: {
        Authorization: getToken(),
      },
    })
      .then((response) => {
        setAlertMessage({
          status: "success",
          alert: "Admin Deleted succesfully..!",
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
            alert: "Unable to Delete, server time out..!",
          });
          setAlertOpen(true);
          setLoading(false);
        } else if (
          error.response.data.error === "Unauthorized" &&
          error.response.data.message === "Invalid token"
        ) {
          clearToken();
        } else {
          console.log(error.response.data);
          setAlertMessage({
            status: "error",
            alert: error.response.data.message,
          });
          setAlertOpen(true);
          setLoading(false);
        }
      });
  };
  const handleAddAdmin = () => {
    setIsEditMode(false);
    setAddAdmin({
      adminId: "",
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
    setAddAdmin({ ...addAdmin, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!addAdmin.email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(addAdmin.email)) {
      valid = false;
      newErrors.email = "Invalid email address";
    }
    // validation
    if (!addAdmin.name) {
      valid = false;
      newErrors.name = "Name is required";
    }
    if (!addAdmin.password) {
      valid = false;
      newErrors.password = "password is required";
    } else if (addAdmin.password.length < 8) {
      valid = false;
      newErrors.password = "password is less than 8 characters";
    }
    if (!addAdmin.role) {
      valid = false;
      newErrors.role = "role is required";
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
          url: "/admin/updateAdmin",
          method: "post",
          data: {
            adminId: addAdmin.adminId,
            name: addAdmin.name,
            email: addAdmin.email,
            role: addAdmin.role,
            password: addAdmin.password,

          },
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken(),
          },
        })
          .then((response) => {
            setAlertMessage({
              status: "success",
              alert: "Admin Updated succesfully..!",
            });
            setAlertOpen(true);
            closepopup();
            fetchData();
            setLoading(false);
          })
          .catch((error) => {
            if (error.code === "ECONNABORTED") {
              console.log("Request timed out");
              setAlertMessage({
                status: "error",
                alert: "Error with server, timeout..!",
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
          alert: "Please fill correct details, and  try Again..!",
        });
        setAlertOpen(true);
        setLoading(false);
      }
    } else {
      if (validateForm()) {
        setLoading(true);
        axios({
          baseURL: BASE_URL,
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
            setAlertMessage({
              status: "success",
              alert: "Admin Added succesfully..!",
            });
            setAlertOpen(true);
            closepopup();
            fetchData();
            setLoading(false);
          })
          .catch((error) => {
            if (error.code === "ECONNABORTED") {
              console.log("Request timed out");
              setAlertMessage({
                status: "success",
                alert: "Error with server, timeout..!",
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
          alert: "Please fill correct details, and  try Again..!",
        });
        setAlertOpen(true);
        setLoading(false);
      }
    }
  };
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const editAdmin = adminDetails.filter((admin) => admin.adminId === id)[0];
    if (editAdmin === null) {
      alert("Id is not found");
    }
    setAddAdmin(editAdmin);
    setErrors({});
    functionopenpopup();
  };

  return (
    <>
      <AdminSidebar />
      <Typography variant="h3" sx={{ marginBottom: "12px", color: "#004080" }}>
        Admin Details
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
            Admin Details{" "}
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              {isEditMode === true ? (
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
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <TextField
                    label="Admin role"
                    name="role"
                    value={addAdmin.role}
                    disabled={true}
                    onChange={(event) => handleChange(event)}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                    helperText={
                      "You cannnot change role, please create new user"
                    }
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
                </>
              ) : (
                <>
                  <TextField
                    label="Admin Name"
                    name="name"
                    value={addAdmin.name}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Admin email"
                    name="email"
                    value={addAdmin.email}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />

                  <TextField
                    label="Admin password"
                    name="password"
                    value={addAdmin.password}
                    onChange={(event) => handleChange(event)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />

                  <FormControl>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={addAdmin.role}
                      onChange={(event) => handleChange(event)}
                      label="Admin role"
                      error={Boolean(errors.role)}
                      helperText={errors.role}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                </>
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

export default AdminDetails;
