import React, { useState, useEffect } from "react";
import Header from '../../layouts/Header'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

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
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../layouts/AdminSidebar';
import { Typography } from '@mui/material';
import AuthUser from "../AuthUser";
import axios from 'axios';



const Payements = () => {
  const [payments, setPayments]=useState([]);
  const {http,getToken} =AuthUser();

  const navigate = useNavigate();
  const [newPayemnt,setNewpayment]=useState({
    "paymentID": "",
    "amount": 0,
    "driverID": "",
    "paymentDate": "",
    "createdAt": "",
    "updatedAt": "",
    "remarks":""
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
    { field: "paymentID", headerName: "paymentID", width: 150 },
    { field: "amount", headerName: "amount", width: 150 },
    { field: "driverID", headerName: "driverID",width: 200 },
    { field: "paymentDate", headerName: "paymentDate",width: 200 },
    // { field: "createdAt", headerName: "createdAt",width: 200 },
    { field: "updatedAt", headerName: "updatedAt",width: 200 },
    {field:"remarks",headerName:"Remarks",width:200},
    
   
  ];

  useEffect(() => {
    axios({
      //http://localhost:8000/api/v1/admin/getAllPayments
      baseURL: "http://localhost:8000/api/v1",
      url: "/admin/getAllPayments",
      method: "get",
      headers: {
        Authorization: getToken()
      },
      timeout: 2000,
    })
      .then((response) => {
        console.log("response.data",response.data);
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
    
   
  },[]);

  const [isEditMode,setIsEditMode]=useState(false);
  const handleAddPayment=()=> {
    setIsEditMode(false);
    setNewpayment({
      "paymentID": "",
    "amount": "",
    "driverID": "",
    "paymentDate": "",
    "createdAt": "",
    "updatedAt": "",
    "remarks":""
    });
    functionopenpopup();
  }
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


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("newPayemnt",newPayemnt);
    
    if(isEditMode) {

    }
    else {
      axios({
        baseURL: "http://localhost:8000/api/v1",
        url: "/admin/createPayment",
        method: "post",
       data:{
        driverId:newPayemnt.driverID, 
        amount:newPayemnt.amount, 
        remarks:newPayemnt.remarks
      },
        
        headers:  {
          'Content-Type': 'application/json',
          'Authorization': getToken()
        },
        
        timeout: 5000,
      })
        .then((response) => {
          console.log(response);
          console.log("response.data",response.data.data);
          console.log("message",response.data.message);
          
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
          } else {
            console.log("error",error);
          }
        });

    }
    
    window.location.reload();
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
      <AdminSidebar />
      <Typography variant="h3" sx={{marginBottom:'12px',color:'#004080'}}>
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
                  label="paymentID"
                  name="paymentID"
                  value={newPayemnt.paymentID}
                  onChange={(event)=>handleChange(event)}
                  disabled={true}
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
                  onChange={(event)=>handleChange(event)}
                />
                <TextField
                  label="driverID"
                  name="driverID"
                  value={newPayemnt.driverID}
                  onChange={(event)=>handleChange(event)}
                />
                <TextField
                  label="createdAt"
                  name="createdAt"
                  value={newPayemnt.createdAt}
                  disabled={true}
                  onChange={(event)=>handleChange(event)}
                />
                <TextField
                  label="updatedAt"
                  name="updatedAt"
                  value={newPayemnt.updatedAt}
                  disabled={true}
                  onChange={(event)=>handleChange(event)}
                />   
                <Button color="primary" variant="contained" onClick={(event) => handleSubmit(event)}>
                  Submit
                </Button>
              
              </>):(        
             <>
             <TextField
                  label="driverID"
                  name="driverID"
                  value={newPayemnt.driverID}
                  onChange={(event)=>handleChange(event)}
                />
              <TextField
                  label="amount"
                  name="amount"
                  value={newPayemnt.amount}
                  onChange={(event)=>handleChange(event)}
                />
                <TextField
                  label="remarks"
                  name="remarks"
                  value={newPayemnt.remarks}
                  onChange={(event)=>handleChange(event)}
                />
                <Button color="primary" variant="contained" onClick={(event) => handleSubmit(event)}>
                  Submit
                </Button>
                
             
             </>)}
               
              </Stack>
            </DialogContent>
            <DialogActions>
              
            </DialogActions>
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
    </>

    
  );
};

export default Payements;


//Payment ID
//