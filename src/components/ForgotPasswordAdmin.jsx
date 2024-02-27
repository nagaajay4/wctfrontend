import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../layouts/Header";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        West Central Transportation, Inc (WCTI)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPasswordAdmin() {
  const [errors, setErrors] = React.useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    status: "",
    alert: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = React.useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!email) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios({
        baseURL: BASE_URL,
        url: "/admin/forgotPassword",
        method: "post",
        data: {
          email: email,
        },

        headers: {
          "Content-Type": "application/json",
        },

        timeout: 5000,
      })
        .then((response) => {
          setAlertMessage({
            status: "success",
            alert: "Password reset link is Successful sent to email..!",
          });
          setAlertOpen(true);
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
            setAlertMessage({
              status: "error",
              alert: "Unable to send Password reset link server error..!",
            });

            setAlertOpen(true);
          } else {
            console.log("login api error", error);
            setAlertMessage({
              status: "error",
              alert: error.response.data.message,
            });
            setAlertOpen(true);
          }
        });
    } else {
      setAlertMessage({
        status: "warning",
        alert: "please enter correct email to send Password reset link..!",
      });
      setAlertOpen(true);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Header></Header>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f0f0f0", // Background color
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: "#333", // Text color
              textAlign: "center", // Center align text
            }}
          >
            Page is Coming Soon......!
          </Typography>
        </Box>

        {/* <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password for Admin
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              {loading ? (
                <Container sx={{ marginTop: "15rem" }}>
                  {" "}
                  <CircularProgress />{" "}
                </Container>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                  sx={{ mt: 2, mb: 2 }}
                >
                  Send link
                </Button>
              )}

              <Grid container justifyContent={"space-around"}>
                <Grid item>
                  <Link href="/Contact" variant="body2">
                    {"Please Contact Admin"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container> */}
      </ThemeProvider>
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
            {alertMessage.alert}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
