import React from 'react';
import { Paper, Typography } from '@mui/material';

function Item({item})
{
    return (
        <Paper elevation={3} sx={{background: "#FFE6E8"}}>
            <img src={item.src} alt={item.title} style={{width: "100%", height: "500px"}} />
            <Typography variant='h3' padding={'12px 12px'} style={{fontSize: "1.5rem", fontFamily: 'Garamond', fontWeight: "600", color: "#808000", margin: "14px 14px"}}>{item.caption}</Typography>
        </Paper>
    )
}

export default Item