import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

const CardComponent = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                title="image title"
                alt="card-image"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div"> Collection </Typography>
                <Typography variant="body2" color="text.secondary">
                    A Collection from NFTs collections
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>

        </Card>
    )
}

export default CardComponent;