import React, { useState, useEffect } from "react";
import Header from '../../layouts/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


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
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from 'react-router-dom';
import DriverSidebar from '../../layouts/DriverSidebar'
import AuthUser from "../AuthUser";
import axios from 'axios';



function DriverPayments() {
  const [payments, setPayments]=useState([]);
 
  const {http,getToken} =AuthUser();
  const navigate = useNavigate();
 
  const [newPayemnt,setNewpayment]=useState({
    "paymentID": "",
    "amount": 0,
    "driverID": "",
    "paymentDate": "",
    "createdAt": "",
    "updatedAt": ""
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
    { field: "paymentID", headerName: "paymentID", width: 150 },
    { field: "amount", headerName: "amount", width: 150 },
    { field: "driverID", headerName: "driverID",width: 150 },
    { field: "paymentDate", headerName: "paymentDate",width: 150 },
    // { field: "createdAt", headerName: "createdAt",width: 200 },
    // { field: "updatedAt", headerName: "updatedAt",width: 200 },
    
   
    
  ];
  useEffect(() => {
    if(getToken()===null) {
      navigate('/DriverLogin');
    }
  
    axios({
      baseURL: "http://localhost:8000/api/v1",
      url: "/driver/payments",
      method: "get",
      headers: {
        Authorization: getToken()
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data",response.data);
        setPayments(response.data.data);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out");
        } else {
          console.log(error.message);
        }
      });
    }, []);
 

  const [isEditMode,setIsEditMode]=useState(false);
 
  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);


  };
  const [open, openchange] = useState(false);
  const handleChange = (event) => {
    console.log(event);
    setNewpayment({ ...newPayemnt, [event.target.name]: event.target.value });
    console.log(newPayemnt);
  };
  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(newPayemnt);
    closepopup();
  };
  const handleEditRow = (id) => {
    // Implement your edit logic here
    setIsEditMode(true);
    const pays=payments.filter((pay) => pay.paymentID === id)[0];
    if(pays===null) 
    {
      alert("Id is not found");
    }
    console.log(pays);
    setNewpayment({
      "paymentID": pays.paymentID,
      "amount": pays.amount,
      "driverID": pays.driverID,
      "paymentDate": pays.paymentDate,
      "createdAt": pays.createdAt,
      "updatedAt": pays.updatedAt
    });
    functionopenpopup();
    console.log(`Edit row with ID ${pays}`);
   
  };


  return (
    <>
      <Box display={'flex'}>
        <DriverSidebar />
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="h3" sx={{marginTop: '70px' ,color:'#004080'}}>
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
                    label="paymentID"
                    name="paymentID"
                    value={newPayemnt.paymentID}
                    onChange={(event)=>handleChange(event)}
                    disabled={isEditMode}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  <TextField
                    label="amount"
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
                    label="driverID"
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
                  {/* <TextField
                    label="createdAt"
                    name="createdAt"
                    value={newPayemnt.createdAt}
                    disabled={isEditMode}
                    onChange={handleChange}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  /> */}
                  <TextField
                    label="updatedAt"
                    name="updatedAt"
                    value={newPayemnt.updatedAt}
                    disabled={isEditMode}
                    onChange={handleChange}
                    
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  />
                  
                
                  <Button color="primary" variant="contained" onClick={(event) => handleSubmit(event)}>
                    close
                  </Button>
                </Stack>
              </DialogContent>
              <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                        <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
              </DialogActions>
            </Dialog>
          </div>


          
          <div style={{ height: "80%", width: "100%", marginBottom: '16px' }}>
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
    </>
   
  )
}

export default DriverPayments




