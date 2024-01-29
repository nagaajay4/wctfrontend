import React from 'react'
import HomePageHeader from '../layouts/HomePageHeader'
import {Container, Typography, Box} from '@mui/material'
import Footer from '../layouts/Footer'
import CardList from '../layouts/CardList'

const appStyles = {
  container : {
    background: 'linear-gradient(to bottom right, #EAEEE9 50%, #FFFFF0)',
    fontFamily: 'sansSerif'
  }
}
function PrivacyPolicy() {
  return (
    <Box style={appStyles.container}>
      <HomePageHeader />
      <Container style={appStyles.container}>
        <Typography variant="h3" gutterBottom style={{color: "#808000", padding: "3rem 0 3rem 0",}}>
          Privacy Policy
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
          We respect and are committed to protecting your privacy. That is why we have adopted this privacy policy. This privacy policy lets you know how your personal information is processed and explains our data collection and use practices. The “westcentraltransportation.com” includes all web pages, newsletters, and opt-in announcement lists owned and operated by us. By accessing our website, you are consenting to the information collection and use practices described in this privacy policy. We promise that we will use your personal information only in ways that are compatible with this privacy policy as follows:
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "3rem 0 3rem 0",}}>
          What information are you collecting and how are you collecting it?
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
          Every computer connected to the Internet is given a domain name and a set of numbers, that serve as that computer’s “Internet Protocol” IP address. When a visitor requests a page from any website within westcentraltransportation.com, our web servers automatically recognize that visitor’s domain name and IP address. The domain name and IP address reveal nothing personal about you other than the IP address from which you have accessed our websites. We use this information to examine our traffic in aggregate, and to investigate misuse of the our network, users, or to cooperate with law enforcement. We do not collect and evaluate this information for specific individuals. Our web servers do not automatically record e-mail addresses of the visitors.        
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "3rem 0 3rem 0",}}>
          What personal information do you collect?
        </Typography>
        <Typography variant='h6' textAlign={'left'}>
          Wherever we collect personal information, we make an effort to include a link to this privacy policy. We will ask you when we need information that personally identifies you (personal information) or allows us to contact you. The personal information we collect may include your name, title, company or organization name, e-mail address, phone number, work or home address, information about your job function, information about your company, and credit card information. We may request your e-mail address or mailing address for the purposes of conducting a contest or to provide additional services (for example, subscriptions to announcement lists or information about conferences and trade shows). Participation in contests or other promotions at westcentraltransportation.com is completely voluntary and you have a choice whether or not to disclose personal information.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          We may from time to time send e-mail announcing new products and services. If you choose to supply your postal address in an online form, you may receive postal mailings from us and our third party affiliates.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          We maintain a strict “No-Spam” policy that means that we do not sell, rent, or otherwise give your e-mail address to a third-party, without your consent or as permitted by this privacy policy.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 0 0"}}>
          Your consent to this agreement by using the Amplimark.com, you consent to the collection and use of information by us as specified above. We reserve the right to modify this privacy policy. If we decide to change our privacy policy, we will post those changes on this page so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.        
        </Typography>
        <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 1rem 0"}}>
          Please send any questions about our privacy policy to : privacy@WestCentralTransportation.com        
        </Typography>
      </Container>
      <CardList />
      <Footer />
    </Box>
  )
}

export default PrivacyPolicy