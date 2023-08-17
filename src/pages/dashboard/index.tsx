import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Paper } from '@mui/material';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const gridItemProps = {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
        xl: 2
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: 200
    };

    return (
        <Grid container spacing={2}>
            <Grid item {...gridItemProps}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200px"
                            src="https://www.wolfgangdigital.com/uploads/banners/time2_(3).png"
                            alt="Log Time"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Log Time
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item {...gridItemProps}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200px"
                            src="https://www.wolfgangdigital.com/uploads/banners/reports.png"
                            alt="Reports"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Reports
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item {...gridItemProps}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200px"
                            src="https://www.wolfgangdigital.com/uploads/banners/wg_(1).png"
                            alt="Clients"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Clients
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item {...gridItemProps}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200px"
                            src="https://www.wolfgangdigital.com/uploads/banners/pipeline_(1).png"
                            alt="Pipeline"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Pipeline
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item {...gridItemProps}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200px"
                            src="https://www.wolfgangdigital.com/uploads/banners/admin.png"
                            alt="Admin"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Admin
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
