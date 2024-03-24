import React from "react";
import Header from "../layouts/Header";
import AdminSidebar from "../layouts/AdminSidebar";
import FileUpload from "../components/FileUpload";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import ActiveRides from '../components/Rides/ActiveRides'
import AssignedRides from '../components/Rides/AssignedRides'
import CompletedRides from '../components/Rides/CompletedRides';
import CancelledRides from '../components/Rides/CancelledRides';
import DriverPayments from "../components/Drivers/DriverPayments";
import DriverDetails from "../components/Drivers/DriverDetails";
import DriverPastUsers from "../components/Drivers/DriverPastUsers"
import DriverActiveRides from "../components/Drivers/DriverActiveRides";
import DriverProfiles from '../components/Rides/DriverProfiles';
import AdminDetails from '../components/Rides/AdminDetails';

import DriverPastRides from "../components/Drivers/DriverPastRides";
import Payments from '../components/Payment/Payments'
import DriverLogin from "../components/DriverLogin";

import Home from '../components/Home';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfUse from "../components/TermsOfUse";
import AboutUs from "../components/AboutUs";
import Mission from "../components/Mission";
import Contact from "../components/Contact";

import ForgotPasswordAdmin from "../components/ForgotPasswordAdmin"
import ForgotPasswordDriver from "../components/ForgotPasswordDriver"

import AssignedUsers from "../components/Users/AssignedUsers";
import CompletedUsers from "../components/Users/CompletedUsers";
import UnAssignedUsers from "../components/Users/UnAssignedUsers";
import CancelledUsers from "../components/Users/CancelledUsers"

import ContactedForms from "../components/FormData/ContactedForms";
import FormDetails from "../components/FormData/FormDetails";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
}

function Routings() {
  return (
    <>
      <div>
        <Routes>
        <Route path="/Header" element={<Header />} />
          
          {/* //Admin Routes */}
          <Route exact path="/AdminLogin" element={<AdminLogin />}></Route>
          <Route exact path="/FileUpload" element={<FileUpload />}></Route>
          <Route exact path="/ActiveRides" element={<ActiveRides />}></Route>
          <Route exact path="/AssignedRides" element={<AssignedRides />}></Route>
          <Route exact path="/CompletedRides" element={<CompletedRides />}></Route>
          <Route exact path="/CancelledRides" element={<CancelledRides />}></Route>
          <Route exactpath="/AdminSidebar" element={<AdminSidebar />}></Route>
          <Route exact path="/Payments" element={<Payments /> }></Route>
          <Route exact path="/DriverProfiles" element={<DriverProfiles />}></Route>
          <Route exact path="/AdminDetails" element={<AdminDetails />}></Route>
          <Route exact path="/ForgotPasswordAdmin" element={<ForgotPasswordAdmin />}></Route>

          {/* //Driver Routes */}
          <Route exact path="/DriverLogin" element={<DriverLogin />}></Route>
          <Route exact path="/DriverDetails" element={<DriverDetails />}></Route>
          <Route exact path="/DriverPayments" element={<DriverPayments />}></Route>
          <Route exact path="/DriverPastRides" element={<DriverPastRides />}></Route>
          <Route exact path="/DriverPastUsers" element={<DriverPastUsers />}></Route>
          <Route exact path="/DriverActiveRides" element={<DriverActiveRides />}></Route>
          <Route exact path="/ForgotPasswordDriver" element={<ForgotPasswordDriver />}></Route>

          {/* //Home website routes */}
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
          <Route exact path="/TermsOfUse" element={<TermsOfUse />}></Route>
          <Route exact path="/Contact" element={<Contact />}></Route>  
          <Route exact path="/AboutUs" element={<AboutUs />}></Route>  
          <Route exact path="/Mission" element={<Mission />}></Route> 

          {/* //From Data */}
          <Route exact path="/ContactedForms" element={<ContactedForms />}></Route>
          <Route exact path="/FormDetails" element={<FormDetails />}></Route>


          {/* //User Routes */}
          <Route exact path="/AssignedUsers" element={<AssignedUsers />}></Route>
          <Route exact path="/CompletedUsers" element={<CompletedUsers />}></Route>
          <Route exact path="/UnAssignedUsers" element={<UnAssignedUsers />}></Route>
          <Route exact path="/CancelledUsers" element={<CancelledUsers />}></Route>


        </Routes>
      </div>
    </>
  );
}

export default Routings;
