import React from 'react'
import HomePageHeader from '../layouts/HomePageHeader'
import {Container, Typography, Box} from '@mui/material'
import Footer from '../layouts/Footer'
import CardList from '../layouts/CardList'

const appStyles = {
  container : {
    background: 'linear-gradient(to bottom right, #ffdbc3 50%, #FFF3FF)',
    fontFamily: 'Georgia, serif',
    color: '#36013F'
  }
}
function PrivacyPolicy() {
  return (
    <Box style={appStyles.container}>
      <HomePageHeader />
      <Container style={appStyles.container}>
        <Typography variant="h3" gutterBottom style={{color: "#B80000", padding: "3rem 0 3rem 0",}}>
          Privacy Policy
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
          We respect and are committed to protecting your privacy. That is why we have adopted this privacy policy. This privacy policy lets you know how your personal information is processed and explains our data collection and use practices. The “westcentraltransportation.com” includes all web pages, newsletters, and opt-in announcement lists owned and operated by us. By accessing our website, you are consenting to the information collection and use practices described in this privacy policy. We promise that we will use your personal information only in ways that are compatible with this privacy policy as follows:
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#B80000", padding: "3rem 0 3rem 0",}}>
          What information we are collecting and how are we collecting it?
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name, last name, Phone number, Address, State, Province, ZIP/Postal code, City, Usage Data. The Company may use Personal Data for the following purposes, to provide and maintain our Service, including to monitor the usage of our Service and contact you for offering our service.
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#B80000", padding: "3rem 0 3rem 0",}}>
          What personal information do you collect?
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
          Wherever we collect personal information, we make an effort to include a link to this privacy policy. We will ask you when we need information that personally identifies you (personal information) or allows us to contact you. The personal information we collect may include your name, title, company or organization name, e-mail address, phone number, work or home address, Email address, First name, last name, Phone number, Address, State, Province, ZIP/Postal code, City, Usage Data information. We may request your e-mail address or mailing address for the purposes of sending details and offers. 
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          We will not use your personal details for any other prurpose rather than providing our services to you. If you choose to supply your postal address or home address in an online form, we won't use them after completing our service.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          We maintain a strict “No-Spam” policy that means that we do not sell, rent, or otherwise give your e-mail address to a third-party, without your consent or as permitted by this privacy policy.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          Your consent to this agreement by using the westcentraltransportation.com, you consent to the collection and use of information by us as specified above. We reserve the right to modify this privacy policy. If we decide to change our privacy policy, we will post those changes on this page so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 1rem 0"}}>
          Please send any questions about our privacy policy to : support@westcentraltransportation.com        
        </Typography>
      </Container>
      <CardList />
      <Footer />
    </Box>
  )
}

export default PrivacyPolicy