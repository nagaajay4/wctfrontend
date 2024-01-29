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

function TermsOfUse() {
  return (
    <Box style={appStyles.container}>
        <HomePageHeader />
        <Container style={appStyles.container}>
            <Typography variant="h3" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                Terms of Use
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                Use of this website signifies your agreement to the Terms of Use.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THIS WEBSITE
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                By using this site, you signify your consent to these terms of use. If you do not agree to these terms of use, please do not use the site. The following legal restrictions and terms of use apply to westcentraltransportation.com, that states that it is governed by these Terms of Use and/or links to these Terms of Use (the sites and entities collectively referred to herein as “westcentraltransportation.com” and “CCT” and/or “we” respectively).            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                USE OF MATERIAL
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                CCT website content and its third-party service provider’s information are the property of Welcome to West Central Transportation, Inc (WCTI) and are protected, without limitation, pursuant to U.S. and foreign copyright and trademark laws. No material from This site may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way, except that you may download one copy of the materials on any single computer for your personal non-commercial use only, provided you keep intact all copyright and other proprietary notices. Modification of the materials or use of the materials for any other purpose is a violation of westcentraltransportation.com’s copyright, trademark, and trade secret rights and others’ proprietary rights. For purposes of this Agreement, the use of any such material on any other web site or networked computer environment is prohibited.            
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                You hereby grant CCT and its agents and licensees a worldwide, royalty-free, fully-paid, perpetual, non-exclusive license to use, including without limitation the right to copy, publish, perform, display and distribute and/or adapt, any material you upload to, distribute through or post on westcentraltransportation.com, including without limitation via message boards, chat rooms and/or blogs or any other features, in whole or in part, alone or in combination with other material, in any and all media, now known or hereafter devised.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                THIRD PARTIES
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                Your correspondence and dealings with third parties including without limitation job seekers, employers, and/or advertisers that you encounter via westcentraltransportation.com are solely between you and such entity. You agree that we shall not be responsible or liable for any dispute, loss, or damage of any sort incurred as a result of any such dealings. In addition, you acknowledge that we do not endorse, verify, or make any representations regarding any third party advertisements, products, or services and does not confirm that each user of Bpsiowa.com is who the user claims to be. It is your sole responsibility to research and verify the legitimacy of any organization, individual, or prospective employer advertising on Bpsiowa.com, and you are solely responsible for your decision to submit personal information to any third party, whether in connection with potential employment or otherwise.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                CHANGES TO SITE
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                We reserve the right, at our sole discretion, to change, modify, add or delete portions of these terms of use at any time. The current terms of use may be viewed at https://www.westcentraltransportation.com/terms-of-use/ along with the date of the most recent update.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                PERMISSION FOR REPRINTS
            </Typography>
            <Typography variant='h6' textAlign={'left'}>
                All material on westcentraltransportation.com without limitation, is protected by U.S. and foreign copyright and trademark laws. In order to request permission to reprint any material on westcentraltransportation.com( outside of personal, non-commercial use), please email: webmaster@westcentraltransportation.com.            
            </Typography>
            <Typography variant="h4" gutterBottom style={{color: "#808000", padding: "1rem 0 1rem 0",}}>
                DISCLAIMER
            </Typography>
            <Typography variant='h6' textAlign={'left'} style={{padding: "1rem 0 1rem 0"}}>
                We assume no liability whatsoever for the use or interpretation of any information contained herein. We cannot be held accountable for any offers or products you receive and on your own volition choose to use. We do not endorse any of the third-party products or services that may be listed on the site. All subsequent liability from any and all damages incurred from ordering, using, or returning any offer referred to on this site is the responsibility of the company or person(s) making the offer and not us. We shall not be liable and assumes no responsibility for any dispute or disagreement arising between you and the vendor, for any thing which is in any way related to this site or the use of information contained in this site.            
            </Typography>
        </Container>
        <CardList />
        <Footer />
    </Box>
  )
}

export default TermsOfUse