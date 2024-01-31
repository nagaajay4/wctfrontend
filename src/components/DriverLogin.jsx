import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../layouts/Header'
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import AuthUser from "./AuthUser";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

 

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function DriverLogin() {

  const {http,setToken} =AuthUser();

  const navigate = useNavigate();
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [errors, setErrors] = React.useState({});


  const [showPassword, setShowPassword] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage,setAlertMessage]=React.useState({status:"",alert:""});

   const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validateForm = (getemail,getpassword) => {
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
    }

    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmail(data.get("email"));
    setPassword(data.get("password"));
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    if (validateForm(data.get("email"),data.get("password"))) {

      axios({
        baseURL: "http://localhost:8000/api/v1",
        url: "/driver/signIn",
        method: "post",
        data: {
          email: data.get("email"),
          password: data.get("password"),
        },

        headers: {
          "Content-Type": "application/json",
        },

        timeout: 5000,
      })
        .then((response) => {
          setToken(data.get("email"), response.data.token, "driver");
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
            alert: "Unable to Login Successfully..!",
          });
          setAlertOpen(true);
          }
        });
    }
    else {
        setAlertMessage({
          status: "warning",
          alert: "please enter correct email and Password..!",
        });
        setAlertOpen(true);
      }
  

  //http://localhost:8000/api/v1/driver/signIn
//     http.post("/driver/signIn",{
//       email: data.get('email'),
//       password: data.get('password'),
//     })
//     .then((res)=>{setToken(data.get('email'),res.data.token,"driver");
//     setAlertMessage({status:"success",alert:"Driver Login Successful..!"});
//     setAlertOpen(true);
//  }).catch(error=>{console.log("login api error",error);
//  setAlertMessage({status:"error",alert:"Unable to Login Successfully..!"});
//     setAlertOpen(true);

// });

    // const response=await axios.post('http://localhost:8000/api/v1/admin/signIn', {
    //   email: data.get('email'),
    //   password: data.get('password')
    // },{
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },})
    // .then((response) => {
    //   console.log(response.data);
    // }, (error) => {
    //   console.log(error);
    //   alert("Unable to login");
    // });
    // console.log("from applogin",response);

    //navigate('/FileUpload');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header></Header>
      {/* <Box sx={{ display: "flex", }}>
        <CssBaseline />
        <AppBar  sx = {{ background: "white",fontFamily: 'Apple Color Emoji',fontWeight: 100, }}component="nav">
          
          <Toolbar
            sx={{justifyContent: "center",}}
          >
            <Typography  sx={{color: 'yellow',}} variant="h3" component="div">
              West Central Transportation
            </Typography>
          </Toolbar>
        </AppBar>
      </Box> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Driver Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
             {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
                <Link href="http://localhost:3000/Contact" variant="body2">
                  {"Please Contact Zak"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
      <div>
      
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity={alertMessage.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage.alert}
        </Alert>
      </Snackbar>
    </div>
    </ThemeProvider>
  );
}