import React from "react";

import Header from "../layouts/Header";
import AdminSidebar from "../layouts/AdminSidebar";

import FileUpload from "../components/FileUpload";

import { Route, Routes } from "react-router-dom";
import AdminLogin from "../components/AdminLogin";
import ActiveRides from '../components/Rides/ActiveRides'
import AssignedRides from '../components/Rides/AssignedRides'
import CompletedRides from '../components/Rides/CompletedRides'
import DriverPayments from "../components/Drivers/DriverPayments";
import DriverDetails from "../components/Drivers/DriverDetails";
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
import jwt from 'jsonwebtoken';



function Routings() {
  return (
    <>
      <div>
        <Routes>
        <Route path="/Header" element={<Header />} />
          
          //Admin Routes
          <Route path="/AdminLogin" element={<AdminLogin />}></Route>
          <Route path="/FileUpload" element={<FileUpload />}></Route>
          <Route path="/ActiveRides" element={<ActiveRides />}></Route>
          <Route path="/AssignedRides" element={<AssignedRides />}></Route>
          <Route path="/CompletedRides" element={<CompletedRides />}></Route>
          <Route path="/AdminSidebar" element={<AdminSidebar />}></Route>
          <Route path="/Payments" element={<Payments /> }></Route>
          <Route path="/DriverProfiles" element={<DriverProfiles />}></Route>
          <Route path="/AdminDetails" element={<AdminDetails />}></Route>
          <Route path="/ForgotPasswordAdmin" element={<ForgotPasswordAdmin />}></Route>

          //Driver Routes
          <Route path="/DriverLogin" element={<DriverLogin />}></Route>
          <Route path="/DriverDetails" element={<DriverDetails />}></Route>
          <Route path="/DriverPayments" element={<DriverPayments />}></Route>
          <Route path="/DriverPastRides" element={<DriverPastRides />}></Route>
          <Route path="/DriverActiveRides" element={<DriverActiveRides />}></Route>
          <Route path="/ForgotPasswordDriver" element={<ForgotPasswordDriver />}></Route>

          //Home website routes
          <Route path="/" element={<Home />}></Route>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
          <Route path="/TermsOfUse" element={<TermsOfUse />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>  
          <Route path="/AboutUs" element={<AboutUs />}></Route>  
          <Route path="/Mission" element={<Mission />}></Route> 

        </Routes>
      </div>
    </>
  );
}

export default Routings;
