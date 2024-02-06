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

function Mission() {
  return (
    <Box style={appStyles.container}>
        <HomePageHeader />
        <Box>
          <Hidden mdDown>
            <CorouselItem />
          </Hidden>
            <Box display={'flex'}  flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'space-around'} padding={'12px 12px'}>
                <Container maxWidth="xs">
                    <Typography variant="h4" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        Contact Us
                    </Typography>
                    <Typography variant="h5" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        Address
                    </Typography>
                    <Typography variant='h6' textAlign={'left'}>
                        West Central region, Minnesota            
                    </Typography>
                    <Typography variant="h5" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        Hours
                    </Typography>
                    <Typography variant='h6' textAlign={'left'}>
                        5AM - 6PM (M-F)
                        Weekends hours available as well.
                        Additionally, we accommodate early morning and evening hours if needed. Please call to confirm.            
                    </Typography>
                </Container>
                <Container style={appStyles.container}>
                    <Typography variant="h3" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        Mission and Vision
                    </Typography>
                    <Typography variant="h4" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        MISSION
                    </Typography>
                    <Typography variant='h6' textAlign={'left'}>
                        To provide affordable transportation with compassionate driver companions, with whom you can trust and feel safe. To treat our clientele like family while providing unmatched assistance and care. Our mission is to give seniors the ability to remain independent, healthy, and socially active.            
                    </Typography>
                    <Typography variant="h4" textAlign={'left'} gutterBottom style={{color: "#B80000", padding: "1rem 0 1rem 0",}}>
                        VISION
                    </Typography>
                    <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 3rem 0"}}>
                        To go above and beyond than just providing safe and reliable transportation. We will make sure each and every senior feels heard and cared for when riding with us. We have a passion for the elderly and believe our work is fulfilling a higher calling.            
                    </Typography>
                </Container>
            </Box>
          <CardList />
          <Footer />
        </Box>
    </Box>    
    )
}

export default Mission