import React from "react";
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	Grid,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";

const icons = [
	AccessTimeIcon,
	WorkOutlineIcon,
	HourglassEmptyIcon,
	TaskAltOutlinedIcon,
];

const Dashboard = () => {
	const gridItemProps = {
		xs: 12,
		sm: 6,
		md: 4,
		lg: 3,
		xl: 2,
	};

	const cardStyle = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
		minHeight: 200,
	};

	const cards = [
		{
			title: "% of time logged",
			content: "-",
			color: "#3a2563",
		},
		{
			title: "Jobs Assigned",
			content: "-",
			color: "#3a2563",
		},
		{
			title: "Hrs left to complete timesheet",
			content: "-",
			color: "#3a2563",
		},
		{
			title: "Tasks Left to Complete",
			content: "-",
			color: "#3a2563",
		},
		{
			title: "Clients Over serviced",
			content: "-",
			color: "#3a2563",
		},
	];

	const getColorBasedOnPercentage = (percentage: string) => {
		const percentageValue = parseInt(percentage);
		return percentageValue >= 100 ? "#02786D" : "#3A2363";
	};

	const router = useRouter();

	const navigateToPage = (pagePath: Url) => {
		router.push(pagePath);
	};

	return (
		<>
			<div style={{ paddingBottom: "20px" }}>
				<Typography
					style={{ paddingBottom: "5px", fontSize: "26px", fontWeight: "bold" }}
				>
					Welcome, Liam
				</Typography>
				<Typography
					style={{
						paddingBottom: "10px",
						fontSize: "18px",
					}}
				>
					Your Weekly Overview:
				</Typography>
				<Grid container spacing={2}>
					{cards.map((card, index) => (
						<Grid item key={index} xs={12} sm={6} md={4}>
							<Card
								style={{
									backgroundColor: card.color || getColorBasedOnPercentage(card.content),
									color: "white",
								}}
							>
								<CardContent>
									{React.createElement(icons[index % icons.length])}
									<Typography variant="h6" fontSize="16px" component="div">
										{card.title}
									</Typography>
									<Typography variant="h3" color="white">
										{card.content}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
			<Typography style={{ paddingBottom: "20px", fontSize: "18px" }}>
				Navigate:
			</Typography>
			<Grid container spacing={2}>
				<Grid
					item
					{...gridItemProps}
					onClick={() => navigateToPage("/timesheet")}
					style={{ cursor: "pointer" }}
				>
					<Card sx={cardStyle}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200px"
								src="https://www.wolfgangdigital.com/uploads/banners/time2_(3).png"
								alt="Log Time"
							/>
							<CardContent>
								<Typography gutterBottom variant="h6" fontSize="16px">
									Log Time
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				{/*<Grid item {...gridItemProps}>
					<Card sx={cardStyle}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200px"
								src="https://www.wolfgangdigital.com/uploads/banners/reports.png"
								alt="Reports"
							/>
							<CardContent>
								<Typography gutterBottom variant="h6" fontSize="16px">
									Reports
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>*/}
				<Grid
					item
					{...gridItemProps}
					onClick={() => navigateToPage("/clients")}
					style={{ cursor: "pointer" }}
				>
					<Card sx={cardStyle}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200px"
								src="https://www.wolfgangdigital.com/uploads/banners/wg_(1).png"
								alt="Clients"
							/>
							<CardContent>
								<Typography gutterBottom variant="h6" fontSize="16px">
									Clients
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>

				<Grid item {...gridItemProps}>
					<a
						href="https://analytics.wolfgangdigital.com/"
						target="_blank"
						style={{ textDecoration: "none" }}
					>
						<Card sx={cardStyle}>
							<CardActionArea>
								<CardMedia
									component="img"
									height="200px"
									src="https://www.wolfgangdigital.com/uploads/banners/pipeline_(1).png"
									alt="Pipeline"
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h6"
										fontSize="16px"
										style={{ textDecoration: "none" }}
									>
										Pipeline
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</a>
				</Grid>
			</Grid>
		</>
	);
};

export default Dashboard;
