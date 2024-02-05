import React from 'react';
import Carousel from 'react-material-ui-carousel';
import items from './Items';
import Item from '../layouts/Item';
import { Container } from '@mui/material';

function CorouselItem()
{

    return (
        <Container>
            <Carousel animation="fade"       
            autoPlay={true}
      interval={4000}
      timeout={3000}
      indicatorIconButtonProps={{
        style: {
          padding: '10px',
          color: 'Orange',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: 'FFF3CF',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '50px',
          textAlign: 'center',
        },
      }}>
                {
                    items.map( (item) => <Item key={item.id} item={item} /> )
                }
            </Carousel>
        </Container>
    )
}

export default CorouselItem