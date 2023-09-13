import React, { useState } from "react";
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Tabs,
	Tab,
	Container,
	CssBaseline,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

interface AddJobProps {
	onAddJob: () => void;
}

const AddJob: React.FC<AddJobProps> = () => {
	const [open, setOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const jobInfoFields = [
		{ label: "Job Name", field: "jobName" },
		{ label: "Client Name", field: "clientName" },
		{ label: "Job Type", field: "jobType" },
		{ label: "Client Tier", field: "clientTier" },
		// Add more fields as needed
	];

	return (
		<>
			<Button size="small" variant="contained" onClick={handleOpen}>
				Add New Job
			</Button>

			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Add New Job
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Save
						</Button>
					</Toolbar>
				</AppBar>

				<Tabs value={tabValue} onChange={handleTabChange} aria-label="Add Job Tabs">
					<Tab label="Job Info" />
				</Tabs>

				<Container component="main" maxWidth="lg" sx={{ marginTop: "40px" }}>
					<CssBaseline />
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Typography component="h1" variant="h5">
							Job Information
						</Typography>
						<form>
							{jobInfoFields.map((field) => (
								<TextField
									key={field.field}
									margin="normal"
									fullWidth
									label={field.label}
									// Add your field value and onChange handling here
								/>
							))}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								sx={{ mt: 3 }}
							>
								Save Job
							</Button>
						</form>
					</Paper>
				</Container>
			</Dialog>
		</>
	);
};

export default AddJob;
