import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Safety from '../assests/CardImages/Safety.jpg';
import Service from '../assests/CardImages/Service.jpg';
import OnTime from '../assests/CardImages/OnTime.jpg';
import Comfort from '../assests/CardImages/Comfort.jpg';

 function CardList() {
  return (
//     <Box
//     display="flex"
//     flexDirection={{ xs: 'column', md: 'row' }}  // Change to column layout on small screens, row on medium and larger screens
//     justifyContent="space-around"
//     padding="16px 16px"
//     sx={{ background: '#B6B6B4', overflow: 'auto' }}  // Add overflow:auto to allow horizontal scrolling on small screens
//   >
//     <Card sx={{ maxWidth: 345,maxHeight: 500, marginBottom: { xs: 2, md: 0 } }}> {/* Add margin-bottom only on small screens */}
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height={{ xs: 200, md: 300 }}  // Adjust height based on screen size
//           image={Safety}
//         />
//         <CardContent sx={{ background: "#E5E4E2" }}>
//           <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
//             Safety
//           </Typography>
//           <Typography variant="h6">
//             Safety is our top priority for all of our clients to make sure they arrive safely at their destinations.
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     <Card sx={{ maxWidth: 345, marginBottom: { xs: 2, md: 0 } }}> {/* Add margin-bottom only on small screens */}
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height={{ xs: 200, md: 300 }}  // Adjust height based on screen size
//           image={Service}
//         />
//         <CardContent sx={{ background: "#E5E4E2" }}>
//           <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
//           Service
//           </Typography>
//           <Typography variant="h6">
//           We care about providing only the best service at an affordable price to all our customers.
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     <Card sx={{ maxWidth: 345 ,marginBottom: { xs: 2, md: 0 } }}> {/* Add margin-bottom only on small screens */}
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height={{ xs: 200, md: 300 }}  // Adjust height based on screen size
//           image={Comfort}
//         />
//         <CardContent sx={{ background: "#E5E4E2" }}>
//           <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
//           Comfort
//           </Typography>
//           <Typography variant="h6">
//           Our new vehicles are equiped to take our customers as far as they need.
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     <Card sx={{ maxWidth: 345,marginBottom: { xs: 2, md: 0 } }}> {/* Add margin-bottom only on small screens */}
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height={{ xs: 200, md: 300 }}  // Adjust height based on screen size
//           image={OnTime}
//         />
//         <CardContent sx={{ background: "#E5E4E2" }}>
//           <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
//           OnTime
//           </Typography>
//           <Typography variant="h6">
//           We value our customers and their needs to arrive on time to their appointmnts.
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     {/* Repeat similar structure for other cards */}
//   </Box>

//Orginal
    // <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} justifyContent={'space-around'} padding={'16px 16px'} sx={{ background: '#B6B6B4', overflow: 'auto' }}>
    //     <Card sx={{ maxWidth: 345, maxHeight: 500,marginBottom: { xs: 2, md: 0 } }}>
    //         <CardActionArea>
    //             <CardMedia
    //             component="img"
    //             height="300"
    //             image={Safety}
    //             />
    //             <CardContent sx={{background: "#E5E4E2"}}>
    //                 <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
    //                     Safety
    //                 </Typography>
    //                 <Typography variant="h6">
    //                     Safety is our top priority for all of our clients to make sure they arrive safely at their destinations.
    //                 </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     <Card sx={{ maxWidth: 345 ,marginBottom: { xs: 2, md: 0 }}}>
    //         <CardActionArea>
    //             <CardMedia
    //             component="img"
    //             height="300"
    //             image={Service}
    //             />
    //             <CardContent sx={{background: "#E5E4E2"}}>
    //             <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
    //                 Service
    //             </Typography>
    //             <Typography variant="h6">
    //                 We care about providing only the best service at an affordable price to all our customers.
    //             </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     <Card sx={{ maxWidth: 345,marginBottom: { xs: 2, md: 0 } }}>
    //         <CardActionArea>
    //             <CardMedia
    //             component="img"
    //             height="300"
    //             image={Comfort}
    //             />
    //             <CardContent sx={{background: "#E5E4E2"}}>
    //             <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
    //                 Comfort
    //             </Typography>
    //             <Typography variant="h6">
    //                 Our new vehicles are equiped to take our customers as far as they need.
    //             </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     <Card sx={{ maxWidth: 345,marginBottom: { xs: 2, md: 0 } }}>
    //         <CardActionArea>
    //             <CardMedia
    //             component="img"
    //             height="300"
    //             image={OnTime}
    //             />
    //             <CardContent sx={{background: "#E5E4E2"}}>
    //             <Typography gutterBottom variant="h4" component="div" fontWeight={'700'}>
    //                 On Time
    //             </Typography>
    //             <Typography variant="h6">
    //                 We value our customers and their needs to arrive on time to their appointmnts.
    //             </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    // </Box>

    <Box
      display={'flex'}
      md={6}
      alignItems={{ xs: 'center' }}
      justifyContent={'space-around'}
      padding={'16px 16px'}
      sx={{ background: '#FF6500', overflow: 'auto' }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={3}>
          {/* Card 1 */}
          <Card sx={{ maxWidth: 345, maxHeight: 500, margin:'auto auto' }}  >
            <CardActionArea>
              <CardMedia component="img" height="300" image={Safety} />
              <CardContent sx={{ background: '#ffdbc3' }}>
                <Typography gutterBottom variant="h4" component="div" fontWeight={'700'} color={'#B80000'}>
                  Safety
                </Typography>
                <Typography variant="h6">
                  Safety is our top priority for all of our clients to make sure they arrive safely at their destinations.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          {/* Card 2 */}
          <Card md={6} sx={{ maxWidth: 345, margin:'auto auto' }}>
            <CardActionArea>
              <CardMedia component="img" height="300" image={Service} />
              <CardContent sx={{ background: '#ffdbc3' }}>
                <Typography gutterBottom variant="h4" component="div" fontWeight={'700'} color={'#B80000'}>
                  Service
                </Typography>
                <Typography variant="h6">
                  We care about providing only the best service at an affordable price to all our customers.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          {/* Card 3 */}
          <Card md={6} sx={{ maxWidth: 345, margin:'auto auto' }}>
            <CardActionArea>
              <CardMedia component="img" height="300" image={Comfort} />
              <CardContent sx={{ background: '#ffdbc3' }}>
                <Typography gutterBottom variant="h4" component="div" fontWeight={'700'} color={'#B80000'}>
                  Comfort
                </Typography>
                <Typography variant="h6">
                  Our new vehicles are equipped to take our customers as far as they need.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          {/* Card 4 */}
          <Card md={6} sx={{ maxWidth: 345, margin:'auto auto' }}>
            <CardActionArea>
              <CardMedia component="img" height="300" image={OnTime} />
              <CardContent sx={{ background: '#ffdbc3' }}>
                <Typography gutterBottom variant="h4" component="div" fontWeight={'700'} color={'#B80000'}>
                  On Time
                </Typography>
                <Typography variant="h6">
                  We value our customers and their needs to arrive on time to their appointments.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CardList