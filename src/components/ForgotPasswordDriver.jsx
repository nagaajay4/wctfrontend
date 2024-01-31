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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import AuthUser from "./AuthUser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

export default function ForgotPasswordDriver() {
  const { http, setToken } = AuthUser();
  const [errors, setErrors] = React.useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState({
    status: "",
    alert: "",
  });

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
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
    const data = new FormData(event.currentTarget);
    setEmail(data.get("email"));
    console.log({
      email: data.get("email"),
    });
    //http://localhost:8000/api/v1/driver/forgotPassword

    if (validateForm()) {
        axios({
          baseURL: "http://localhost:8000/api/v1",
          url: "/driver/forgotPassword",
          method: "post",
          data: {
            email: data.get("email"),
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
                alert: "Unable to send Password reset link..!",
              });
              setAlertOpen(true);
            }
          });
      }
      else {
          setAlertMessage({
            status: "warning",
            alert: "please enter correct email to send Password reset link..!",
          });
          setAlertOpen(true);
        }

    // if (validateForm()) {


    //     http
    //     .post("/driver/forgotPassword", {
    //         email: data.get("email"),
    //     })
    //     .then((res) => {
          
    //       setAlertMessage({
    //         status: "success",
    //         alert: "Password reset link is Successful sent to email..!",
    //       });
    //       setAlertOpen(true);
    //     })
    //     .catch((error) => {
    //       console.log("login api error", error);
    //       setAlertMessage({
    //         status: "error",
    //         alert: "Unable to send Password reset link..!",
    //       });
    //       setAlertOpen(true);
    //     });
    // }
    // else {
    //     setAlertMessage({
    //         status: "warning",
    //         alert: "please enter correct email to send Password reset link..!",
    //       });
    //       setAlertOpen(true);

    // }
   
  };

  return (
    <>
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
              Reset Password for Driver
            </Typography>
            <Box
              component="form"
              onSubmit={(event)=>{handleSubmit(event)}}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Send link
              </Button>
              <Grid container justifyContent={"space-around"}>
                <Grid item>
                  <Link href="http://localhost:3000/Contact" variant="body2">
                    {"Please Contact Admin"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
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
