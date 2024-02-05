import React from "react";
import HomePageHeader from "../layouts/HomePageHeader";
import { Container, Typography, Box, Hidden } from "@mui/material";
import Footer from "../layouts/Footer";
import CardList from "../layouts/CardList";
import CorouselItem from "../layouts/Corousel";
import MyForm from "../layouts/MyForm";

const appStyles = {
  container: {
    background: 'linear-gradient(to bottom right, #ffdbc3 50%, #FFF3FF)',
    fontFamily: 'Georgia, serif',
    color: '#36013F'
  },
};
function Contact() {
  return (
    <Box style={appStyles.container}>
      <HomePageHeader />
      <Box>
        <Hidden mdDown>
          <CorouselItem />
        </Hidden>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent={"space-around"}
          padding={"12px 12px"}
        >
          <Container maxWidth="xs">
            <Typography
              variant="h4"
              textAlign={"left"}
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              textAlign={"left"}
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Phone No.
            </Typography>
            <Typography variant="h6" textAlign={"left"}>
              (320) 894-4265
            </Typography>
            <Typography
              variant="h5"
              textAlign={"left"}
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Email:
            </Typography>
            <Typography variant="h6" textAlign={"left"}>
            support@westcentraltransportation.com
            </Typography>
            <Typography
              variant="h5"
              textAlign={"left"}
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Address
            </Typography>
            <Typography variant="h6" textAlign={"left"}>
              West Central region, Minnesota
            </Typography>
            <Typography
              variant="h5"
              textAlign={"left"}
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Hours
            </Typography>
            <Typography variant="h6" textAlign={"left"}>
              5AM - 6PM (M-F) Weekends hours available as well. Additionally, we
              accommodate early morning and evening hours if needed. Please call
              to confirm.
            </Typography>
          </Container>
          <Container style={appStyles.container} maxWidth="md">
            <Typography
              variant="h3"
              gutterBottom
              style={{ color: "#808000", padding: "1rem 0 1rem 0" }}
            >
              Contact
            </Typography>
            <Container maxWidth="xs" style={{ padding: "1rem 0 1rem 0" }}>
              <MyForm />
            </Container>
          </Container>
        </Box>
        <CardList />
        <Footer />
      </Box>
    </Box>
  );
}

export default Contact;
