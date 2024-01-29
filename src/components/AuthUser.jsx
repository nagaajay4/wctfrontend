import axios from 'axios';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function AuthUser() {
    const navigate = useNavigate()
    
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
    const getUser=()=> {
        const userString = sessionStorage.getItem('user');
        const userData = JSON.parse(userString);
        return userData;
    }

    const [token, setToken] = useState(getToken());
    const [user,setUser]= useState(getUser());

    
    
    const saveToken = (user,token,userRole)=> {
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        setToken(token);
        setUser(user);
       if(userRole==="admin" && token!='' && user!='') {
        navigate('/FileUpload');
       }
       else if(userRole==="driver" && token!='' && user!='') {
        navigate('/DriverActiveRides')
       }
       else {
        navigate('/AdminLogin');
       }
       
    }

    const logout=(userrole)=> {
        sessionStorage.clear();
        if(userrole==="admin") {
            navigate('/AdminLogin');
        }
        else {
            navigate('/DriverLogin');
        }
       
    }

    const http = axios.create({
        //http://localhost:8000/api/v1/admin/signIn
        baseURL: "http://localhost:8000/api/v1"  
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }

}