import React from 'react'
import HomePageHeader from '../layouts/HomePageHeader'
import {Container, Typography, Box, Hidden} from '@mui/material'
import Footer from '../layouts/Footer'
import CardList from '../layouts/CardList'
import CorouselItem from '../layouts/Corousel'

const appStyles = {
  container : {
    background: 'linear-gradient(to bottom right, #ffdbc3 50%, #FFF3FF)',
    fontFamily: 'Georgia, serif',
    color: '#36013F'
  }
}
  
function AboutUs() {
  return (
    <Box style={appStyles.container}>
        <HomePageHeader />
        <Box>
          <Hidden mdDown>
            <CorouselItem />
          </Hidden>
          <Container style={appStyles.container}>
            <Typography variant="h3" gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                About Us
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
              West Central Transportation, Inc (WCTI) is a private Non-Emergency Medical Transportation (NEMT) company specializing in serving ambulatory clients, patrons who need extra mobility assistance to and from their designated medical facility. We are ideal for patients who need reliable, first-class non-emergency transport services within the Des Moines Metroplex and the surrounding counties.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
              Offering the best non-emergency medical transport
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
              We are committed to helping seniors, vets, and passengers with disabilities get wherever they need to go; we care about every single client and their needs. Our friendly, caring drivers will provide the best non-emergency medical transportation service in the Central Iowa area. At WCT, we have decades of experience and certified by the State of Iowa.
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
              We help you get to medical appointments
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
              Perhaps you need to visit your doctor or have a non-emergency appointment at the hospital. Maybe you need to go to physical therapy, the lab, or an out-of-town specialist. A driver can come to your house, picky you up, and bring your safely where you need to go.
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
              Get to any place you need or want
            </Typography>
            <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 1rem 0"}}>
            Or perhaps you need some help getting around for everyday life tasks. We can help you get out of the house for social outings, to pick up groceries, or attend special events. Our service comes with a smile and the utmost concern for your safety.            
            </Typography>
          </Container>
          <CardList />
          <Footer />
        </Box>
    </Box>
  )
}

export default AboutUs