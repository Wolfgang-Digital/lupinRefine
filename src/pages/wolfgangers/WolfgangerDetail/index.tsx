import React, { useState } from "react";
import {
	TextField,
	Typography,
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Tabs,
	Container,
	CssBaseline,
	Paper,
	Slide,
	Tab,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { UserData } from "@api/users";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface UserDetailProps {
	user: UserData;
	onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const userInfoFields: { label: string; field: keyof UserData }[] = [
		{ label: "User Name", field: "user_name" },
		{ label: "Department", field: "department_name" },
		{ label: "Email", field: "user_email" },
		{ label: "Job Rate #1", field: "user_job_rate_1" },
		{ label: "Job Rate #2", field: "user_job_rate_2" },
		{ label: "Job Rate #3", field: "user_job_rate_3" },
		{ label: "Job Rate #4", field: "user_job_rate_4" },
		{ label: "Job Rate #5", field: "user_job_rate_5" },
	];

	const infoContent = (
		<div
			role="tabpanel"
			hidden={tabValue !== 0}
			id={`tabpanel-0`}
			aria-labelledby={`tab-0`}
			style={{ paddingTop: "40px", paddingBottom: "90px" }}
		>
			<Container component="main" maxWidth="lg">
				<CssBaseline />
				<Paper elevation={3} sx={{ padding: "20px" }}>
					<Typography component="h1" variant="h5">
						Edit Wolfganger Info
					</Typography>
					<form>
						{userInfoFields.map((field) => (
							<TextField
								key={field?.field}
								margin="normal"
								fullWidth
								label={field?.label}
								value={user?.[field?.field] || ""}
								// Add onChange or other logic
							/>
						))}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							sx={{ mt: 3 }}
							style={{ backgroundColor: "#3A2462" }}
						>
							Save Changes
						</Button>
					</form>
				</Paper>
			</Container>
		</div>
	);

	const permissionsContent = (
		<div
			role="tabpanel"
			hidden={tabValue !== 1}
			id={`tabpanel-1`}
			aria-labelledby={`tab-1`}
			style={{ paddingTop: "40px", paddingBottom: "90px" }}
		>
			<Container component="main" maxWidth="lg">
				<CssBaseline />
				<Paper elevation={3}>
					<Typography
						component="h1"
						variant="h6" // Smaller variant for headings
						style={{
							paddingLeft: "20px",
							paddingBottom: "5px",
							paddingTop: "5px",
							background: "#3A2462", // Background color for the heading
							color: "#fff", // Text color for the heading
						}}
					>
						User Rights
					</Typography>
					<Typography
						paragraph
						style={{
							paddingTop: "20px",
							paddingLeft: "20px",
							paddingRight: "90px",
						}}
					>
						Security in Lupin is managed with the set of user groups listed below.
						Check off the groups you would like this user to have from the list below.
					</Typography>
					<div
						style={{
							paddingLeft: "20px",
							paddingBottom: "20px",
							paddingRight: "90px",
						}}
					>
						<FormControlLabel control={<Checkbox />} label="Admin" />
						<FormControlLabel control={<Checkbox />} label="Finance Admin" />
						<FormControlLabel control={<Checkbox />} label="Team Lead" />
						<FormControlLabel control={<Checkbox />} label="User" />
					</div>
					{/* Add more checkboxes as needed */}

					{/* Management Authority */}
					<Typography
						component="h1"
						variant="h6" // Smaller variant for headings
						style={{
							paddingLeft: "20px",
							paddingBottom: "5px",
							paddingTop: "5px",
							background: "#3A2462", // Background color for the heading
							color: "#fff", // Text color for the heading
						}}
					>
						Management Authority
					</Typography>
					<Typography
						paragraph
						style={{
							paddingTop: "20px",
							paddingLeft: "20px",
							paddingRight: "90px",
						}}
					>
						Below is a list of the departments <strong>{user?.user_name}</strong>{" "}
						manages (giving this manager authority to view/edit or approve
						time/expenses logged by users in those departments).
					</Typography>
					<div
						style={{
							paddingLeft: "20px",
							paddingBottom: "20px",
							paddingRight: "90px",
						}}
					>
						<FormControlLabel control={<Checkbox />} label="Vis Comms" />
						<FormControlLabel control={<Checkbox />} label="Office Management" />
						<FormControlLabel control={<Checkbox />} label="Google Ads" />
						<FormControlLabel control={<Checkbox />} label="Social" />
						<FormControlLabel control={<Checkbox />} label="SEO / Content" />
						<FormControlLabel control={<Checkbox />} label="Email" />
						<FormControlLabel control={<Checkbox />} label="Finance" />
						<FormControlLabel control={<Checkbox />} label="Client Services" />
						<FormControlLabel control={<Checkbox />} label="Dev" />
					</div>
				</Paper>
			</Container>
		</div>
	);

	return (
		<Dialog
			fullScreen
			open={true}
			onClose={onClose}
			TransitionComponent={Transition}
			PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={onClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{user?.user_name}
					</Typography>
					<Button autoFocus color="inherit" onClick={onClose}>
						Save
					</Button>
				</Toolbar>
			</AppBar>

			<div style={{ width: "100%" }}>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					aria-label="Wolfganger Tabs"
				>
					<Tab label="Wolfganger Info" />
					<Tab label="Permissions" />
					<Tab label="Time" />
					<Tab label="Expenses" />
					<Tab label="Team" />
				</Tabs>
			</div>

			<div style={{ width: "100%" }}>
				{infoContent}
				{permissionsContent}
				{/* ... Content for other tabs */}
			</div>
		</Dialog>
	);
};

export default UserDetail;
