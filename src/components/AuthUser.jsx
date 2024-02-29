import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  // const getToken = () => {
  //   const tokenString = sessionStorage.getItem("token");
  //   const userToken = JSON.parse(tokenString);
  //   if (userToken !== null) {
  //     const decodedToken = jwt.decode(userToken);
  //     const dateNow = new Date();

  //     if (decodedToken.exp < dateNow.getTime() / 1000) {
  //       console.log("Token expired.");
  //       return null;
  //     } else {
  //       return userToken;
  //     }
  //   } else {
  //     return null;
  //   }
  // };
  const getToken=()=> {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      if(userToken!==null) {
          return userToken;
      }
      else {
          return null;
      }

  }
  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const userData = JSON.parse(userString);
    return userData;
  };
  const getRole = () => {
    const userString = sessionStorage.getItem("role");
    const userData = JSON.parse(userString);
    return userData;
  };
  const clearToken = () => {
    sessionStorage.setItem("token", JSON.stringify(null));
    const userRole=getRole();
    if (userRole === "ADMIN") {
      navigate("/AdminLogin");
    } else if (userRole === "SUPER_ADMIN") {
      navigate("/AdminLogin");
    } else if (userRole === "driver") {
      navigate("/DriverLogin");
    } else {
      navigate("/AdminLogin");
    }
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [role, setRole] = useState(getRole());

  const saveToken = (user, token, userRole) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("role", JSON.stringify(userRole));
    setToken(token);
    setUser(user);
    setRole(role);
    if (userRole === "ADMIN" && token !== "" && user !== "") {
      navigate("/FileUpload");
    } else if (userRole === "SUPER_ADMIN" && token !== "" && user !== "") {
      navigate("/FileUpload");
    } else if (userRole === "driver" && token !== "" && user !== "") {
      navigate("/DriverActiveRides");
    } else {
      navigate("/AdminLogin");
    }
  };

  const logout = (userrole) => {
    sessionStorage.clear();
    if (userrole === "admin") {
      navigate("/AdminLogin");
    } else {
      navigate("/DriverLogin");
    }
  };

  const http = axios.create({
    baseURL: BASE_URL,
  });
  return {
    setToken: saveToken,
    token,
    getRole,
    user,
    getToken,
    http,
    logout,
    getUser,
    clearToken,
  };
}
