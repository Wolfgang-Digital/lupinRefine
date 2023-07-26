
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";

const dashboard = () => {
    return (
        <Grid container columns={24} spacing={2}>
            <Grid item xs={12} md={12} lg={8} xl={8}>
                <Card sx={{ height: "100%", minHeight: "200px"  }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="300px"
                        src= "https://www.wolfgangdigital.com/uploads/banners/time2_(3).png"// Use the 'logo' variable here with 'src' prop
                        alt="Log Time"
                        />
                        <CardContent sx={{ height: "100%", minHeight: "100px" }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ padding:"20px" }}>
                            Log Time
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={8}>
            <Card sx={{ height: "100%", minHeight: "200px" }}>
                <CardActionArea>
                <CardMedia
                        component="img"
                        height="300px"
                        src="https://www.wolfgangdigital.com/uploads/banners/reports.png" // Use the 'logo' variable here
                        alt="Reports"
                        />
                    <CardContent sx={{ height: "100%", minHeight: "100px" }} >
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding:"20px" }}>
                        Reports
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Example Text
                    </Typography> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={8}>
            <Card sx={{ height: "100%", minHeight: "200px" }}>
                <CardActionArea>
                <CardMedia
                        component="img"
                        height="300px"
                        src="https://www.wolfgangdigital.com/uploads/banners/wg_(1).png" // Use the 'logo' variable here
                        alt="Clients"
                        />
                    <CardContent sx={{ height: "100%", minHeight: "80px" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding:"20px" }}>
                        Clients
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Example Text
                    </Typography> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={8}>
            <Card sx={{ height: "100%", minHeight: "200px" }}>
                <CardActionArea>
                <CardMedia
                        component="img"
                        height="300px"
                        src="https://www.wolfgangdigital.com/uploads/banners/pipeline_(1).png" // Use the 'logo' variable here
                        alt="Wolfgangers"
                        />
                    <CardContent sx={{ height: "100%", minHeight: "100px" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding:"20px" }}>
                        Pipeline
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Example Text
                    </Typography> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
            
            <Grid item xs={12} md={12} lg={8} xl={8}>
            <Card sx={{ height: "100%", minHeight: "200px" }}>
                <CardActionArea>
                <CardMedia
                        component="img"
                        height="300px"
                        src="https://www.wolfgangdigital.com/uploads/banners/admin.png" // Use the 'logo' variable here
                        alt="Clients"
                        />
                    <CardContent sx={{ height: "100%", minHeight: "100px" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding:"20px" }}>
                        Admin
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Example Text
                    </Typography> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
        </Grid>

    )
}

export default dashboard

