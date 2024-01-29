import React from 'react';
import Carousel from 'react-material-ui-carousel';
import items from './Items';
import Item from '../layouts/Item';
import { Box } from '@mui/material';

function CorouselItem()
{

    return (
        <Box>
            <Carousel>
                {
                    items.map( (item) => <Item key={item.id} item={item} /> )
                }
            </Carousel>
        </Box>
    )
}

export default CorouselItem