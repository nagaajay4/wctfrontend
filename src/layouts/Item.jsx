import React from 'react';
import { Paper, Typography } from '@mui/material';

function Item({item})
{
    return (
        <Paper elevation={3} sx={{background: 'linear-gradient(to bottom right, #FFF3CF 50%, #FFF3FF)'}}>
            <img src={item.src} alt={item.title} style={{width: "700px", height: "500px", marginTop:'1rem'}} />
            <Typography variant='h3' padding={'12px 12px'} style={{fontSize: "1.5rem", fontFamily: 'Georgia, serif', fontWeight: "600", margin: "14px 14px"}}>{item.caption}</Typography>
        </Paper>
    )
}

export default Item