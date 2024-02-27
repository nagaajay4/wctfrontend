import { useEffect, useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../layouts/AdminSidebar";
import AuthUser from "./AuthUser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const { clearToken, getToken } = AuthUser();
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ status: "", alert: "" });

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };
 
  useEffect(() => {
    if (getToken() === null) {
      navigate("/AdminLogin");
    }
  }, []);

  

  const handleUpload = async () => {
    setOpen(true);
    setLoading(true);

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("csvFile", selectedFiles[0]);

      try {
        const response = await axios.post(
          BASE_URL + "/admin/fileUpload",
          formData,
          {
            headers: {
              Authorization: getToken(),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setAlertMessage({
          status: "success",
          alert: "File submitted successfully..!",
        });
        setAlertOpen(true);
        navigate("/ActiveRides");
      } catch (error) {
        console.error(error);
       if(error.response.data.error==="Unauthorized" && error.response.data.message==="Invalid token"){
          clearToken();
        }
        setAlertMessage({
          status: "error",
          alert: error.response.data.message,
        });
        setLoading(false);
        setAlertOpen(true);
        // navigate('/ActiveRides');
      }
    } else {
      setLoading(false);
      console.error("No files upladed");
      setAlertMessage({
        status: "warning",
        alert: "No files upladed, Please try Again..!",
      });
      setAlertOpen(true);
      //navigate('/ActiveRides');
    }
  };

  return (
    <>
      <AdminSidebar />
      {loading ? (
        <Container sx={{ marginTop: "15rem" }}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ marginBottom: "12px", color: "#004080" }}
          >
            File Upload
          </Typography>
          <Box
            p={3}
            ml={8}
            mr={8}
            mt={8}
            border="2px dashed #ccc"
            borderRadius={8}
            textAlign="center"
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              // multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="multiple-file-input"
            />
            <label htmlFor="multiple-file-input">
              <Button variant="outlined" component="span">
                Select Files
              </Button>
            </label>
            {selectedFiles.length > 0 && (
              <div>
                <Typography variant="subtitle1" mt={2}>
                  Selected Files:
                </Typography>
                {/* <ul> */}
                {selectedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
                {/* </ul> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  mt={2}
                >
                  Upload
                </Button>
              </div>
            )}
          </Box>
        </>
      )}
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
};

export default FileUpload;
