import React from 'react'
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const appStyles = {
    footer: {
        padding: "5rem 0 5rem 0",
        background: "linear-gradient(to bottom right, #2B3856 50%, #36454F)",
        color: "#ffffff"
    },
    terms: {
        padding: "1rem 0 1rem 0",
        background: 'black',
        color: "#ffffff"
    }
}
function Footer() {
    const navigate = useNavigate();
  return (
    <Box>
        <Box style={appStyles.footer}>
            <Box className="container grid grid-four-column">
                <Typography variant='h4'>
                    West Central Transportation, Inc (WCTI)
                </Typography>
                <Typography color={'#E5E4E2'} variant="h6" gutterBottom>
                    We Care about your safety.
                </Typography>
                <Typography color={'#E5E4E2'} variant="body1" gutterBottom>
                    West Central region, Minnesota | Phone: (320) 894-4265
                </Typography>
                <Container>
                <Typography color={'#E5E4E2'} variant="h6" gutterBottom>
                    Hours: 5AM - 6PM (M-F) || Weekends hours available as well. Additionally, we accommodate early morning and evening hours if needed. Please call (320) 894-4265 to confirm.
                </Typography>
                </Container>
            </Box>
        </Box>
        <Box style={appStyles.terms}>
            <Typography>
                © 2024 All Rights Reserved | West Central Transportation, Inc (WCTI) <Typography variant='body3' onClick={()=>navigate('/PrivacyPolicy')}><Button color='error'>Privacy Policy</Button></Typography> | <Typography variant='body3' color={'red'} onClick={()=>navigate('/TermsOfUse')}><Button color='error'>Terms of Use</Button></Typography>
            </Typography>
        </Box>
    </Box>
  )
}

export default Footer