import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import AuthUser from "./AuthUser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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

export default function DriverLogin() {
  const { setToken } = AuthUser();

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [agreeToCommunications, setAgreeToCommunications] =
    React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    status: "",
    alert: "",
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validateForm = (getemail, getpassword) => {
    let valid = true;
    const newErrors = {};

    // Email validation
    if (!getemail) {
      valid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(getemail)) {
      valid = false;
      newErrors.email = "Invalid email address";
    }

    // validation
    if (!getpassword) {
      valid = false;
      newErrors.password = "password is required";
    } else if (getpassword.length < 8) {
      valid = false;
      newErrors.password = "password is less than 8 characters";
    }
    if (!agreeToCommunications) {
      valid = false;
      newErrors.agreeToCommunications = "Please agree to the terms";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleAgreeToCommunicationsChange = (event) => {
    setAgreeToCommunications(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm(email, password)) {
      axios({
        baseURL: BASE_URL,
        url: "/driver/signIn",
        method: "post",
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      })
        .then((response) => {
          setToken(email, response.data.token, "driver");
          setAlertMessage({
            status: "success",
            alert: "Driver Login Successful..!",
          });
          setAlertOpen(true);
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            console.log("Request timed out");
            setAlertMessage({
              status: "error",
              alert: "Unable to Login server error..!",
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
        alert: "please enter correct email and Password..!",
      });
      setAlertOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header></Header>

      <Container component="main" maxWidth="xs">
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
            Driver Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            /> */}

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToCommunications}
                  onChange={handleAgreeToCommunicationsChange}
                  name="agreeToCommunications"
                />
              }
              label={
                <Typography>
                  By selecting this checkbox, You affirm your agreement to
                  receive communications from us in accordance with our{" "}
                  <Link
                    href="/PrivacyPolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/TermsOfUse"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of use
                  </Link>
                </Typography>
              }
            />
            {errors.agreeToCommunications && (
              <div style={{ color: "red" }}>{errors.agreeToCommunications}</div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(event) => handleSubmit(event)}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/ForgotPasswordDriver" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Contact" variant="body2">
                  {"Please Contact Zak"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
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
    </ThemeProvider>
  );
}
