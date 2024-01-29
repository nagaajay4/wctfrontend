import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Header from '../layouts/Header';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../layouts/AdminSidebar';
import AuthUser from "./AuthUser";



const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const {http,getToken} =AuthUser();

  const navigate = useNavigate();
  if(getToken()===null) {
    navigate('/AdminLogin');
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log("files",files);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    navigate('/ActiveRides');

    //window.location.href = "/new-page"; // replace with your page route
  };

  const handleUpload = async () => {
    setOpen(true);
  
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("csvFile", selectedFiles[0]);
  
      try {
        const response = await http.post("/admin/fileUpload", formData, {
          headers: {
            'Authorization': getToken(),
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log(response.data);
        navigate('/ActiveRides');
      } catch (error) {
        console.error(error);
        navigate('/ActiveRides');
      }
    } else {
      console.error('No files upladed');
      navigate('/ActiveRides');
    }
  };

  return (
    <>
    <AdminSidebar />
    <Typography variant="h3" sx={{marginBottom:'12px',color:'#004080'}}>
            File Upload
    </Typography>
    <Box p={3} ml={8} mr={8} mt={8} border="2px dashed #ccc" borderRadius={8} textAlign="center">
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        // multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
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
          <Button variant="contained" color="primary" onClick={handleUpload} mt={2}>
            Upload
          </Button>
        </div>
      )}
    </Box>
    </>
  );
};

export default FileUpload;