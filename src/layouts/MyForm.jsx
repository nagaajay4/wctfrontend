import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const MyForm = () => {
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
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

    // ... (other validation code)
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

    // Checkbox validation
    if (!customer.agreeToTerms) {
      valid = false;
      newErrors.agreeToTerms = "Please agree to the terms";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    setCustomer((prevState) => ({
      ...prevState,
      [name]: event.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", customer);
      setAlertMessage({
        status: "success",
        alert: "Form Submitted Successfully, We will contact you soon..!",
      });
      setAlertOpen(true);
    } else {
      console.log("Form validation failed");
      setAlertMessage({
        status: "error",
        alert: "Unable to Submit Form, Please try Again..!",
      });
      setAlertOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          margin="normal"
          required
          id="name"
          label="Your Name"
          name="name"
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

        {/* Checkbox */}
        <span>
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.agreeToTerms}
                onChange={handleChange}
                name="agreeToTerms"
              />
            }
            label="you affirm your agreement to receive communications from us in accordance with our"
          />

          {/* Anchor tags */}
          <a href="/#/PrivacyPolicy" target="_blank" rel="noopener noreferrer">
            Privacy policy
          </a>
          {" and "}
          <a href="/#/TermsOfUse" target="_blank" rel="noopener noreferrer">
            Terms of use
          </a>
        </span>

        {/* Error message for checkbox */}
        {errors.agreeToTerms && (
          <div style={{ color: "red" }}>{errors.agreeToTerms}</div>
        )}

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Stack>

      <div>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            severity={alertMessage.status}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage.alert}
          </MuiAlert>
        </Snackbar>
      </div>
    </Box>
  );
};

export default MyForm;
