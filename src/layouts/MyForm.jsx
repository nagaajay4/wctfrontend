import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from "@mui/material/Stack";

const MyForm = () => {
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage,setAlertMessage]=useState({status:"",alert:""});

  // const handleClick = () => {
  //   setAlertOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!customer.email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      valid = false;
      newErrors.email = "Invalid email address";
    }

    // validation
    if (!customer.name) {
      valid = false;
      newErrors.name = "Name is required";
    }
    if (!customer.address) {
      valid = false;
      newErrors.address = "Address is required";
    }
    if (!customer.phoneNumber) {
      valid = false;
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!customer.message) {
      valid = false;
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return valid;
  };
  const handleChange = (event) => {
    console.log(event);
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform your form submission logic here
      // axios({
      //   baseURL: "http://localhost:8000/api/v1",
      //   url: "/admin/assignRide",
      //   method: "post",
      //  data:{
        
      //     "rideId":id,
      //     "driverId":newStatus.driverID
      
        
      // },
        
      //   headers:  {
      //     'Content-Type': 'application/json',
      //     //'Authorization': getToken()
      //   },
        
      //   timeout: 5000,
      // })
      //   .then((response) => {
      //     console.log(response);
      //     console.log("response.data",response.data.data);
      //     console.log("message",response.data.message);
      //     setRidesRows(updatedRows);


      //   })
      //   .catch((error) => {
      //     if (error.code === "ECONNABORTED") {
      //       console.log("Request timed out");
      //     } else {
      //       console.log("error",error);
      //     }
      //   });

      console.log("Form submitted:", customer);
      setAlertMessage({status:"success",alert:"Form Sumbitted Successfully, We will contact you soon..!"})
      
      setAlertOpen(true);
    } else {
      console.log("Form validation failed");
      setAlertMessage({status:"error",alert:"Unable to Submit Form, Please try Again..!"})
     
      setAlertOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          margin="normal"
          required
          // fullWidth
          id="name"
          label="Your Name"
          name="name"
          // autoComplete="name"
          autoFocus
          value={customer.name}
          onChange={(e) => handleChange(e)}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          margin="normal"
          required
          // fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={customer.email}
          onChange={(e) => handleChange(e)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          // fullWidth
          id="phoneNumber"
          label="phoneNumber"
          name="phoneNumber"
          // autoComplete="email"
          autoFocus
          value={customer.phoneNumber}
          onChange={(e) => handleChange(e)}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
        />
        <TextField
          margin="normal"
          required
          // fullWidth
          id="address"
          label="Address"
          name="address"
          // autoComplete="email"
          autoFocus
          value={customer.address}
          onChange={(e) => handleChange(e)}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        
        <TextField
          margin="normal"
          required
          // fullWidth
          multiline
          rows={5}
          maxRows={10}
          id="message"
          label="message"
          name="message"
          // autoComplete="email"
          autoFocus
          value={customer.message}
          onChange={(e) => handleChange(e)}
          error={Boolean(errors.message)}
          helperText={errors.message}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Stack>

      <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertMessage.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage.alert}
        </Alert>
      </Snackbar>
    </div>
    </Box>
    
  );
};

export default MyForm;
