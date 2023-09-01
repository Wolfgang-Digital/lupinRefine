import React, { useState } from "react";
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Tabs,
	Tab,
	Container,
	CssBaseline,
	Paper,
	Slide,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Wolfgangers } from "types";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface WolfgangerDetailProps {
	user: Wolfgangers; // Define the correct type for user data
	onClose: () => void;
}

export const WolfgangerDetail: React.FC<WolfgangerDetailProps> = ({
	user,
	onClose,
}) => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const wolfgangerInfoFields: { label: string; field: keyof Wolfgangers }[] = [
		{ label: "user_name", field: "user_name" },
		{ label: "user_department", field: "user_department" },
		// ... Other fields
	];

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
						{user.user_name}
					</Typography>
					<Button autoFocus color="inherit" onClick={onClose}>
						Save
					</Button>
				</Toolbar>
			</AppBar>

			{/* Tab Content */}
			<div style={{ width: "100%" }}>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					aria-label="Wolfganger Tabs"
				>
					<Tab label="Wolfganger Info" />
					<Tab label="Teams" />
					<Tab label="Time" />
					<Tab label="Expenses" />
					<Tab label="Activity" />
				</Tabs>
			</div>

			<div style={{ width: "100%" }}>
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
								{wolfgangerInfoFields.map((field) => (
									<TextField
										key={field.field}
										margin="normal"
										fullWidth
										label={field.label}
										value={user[field.field] || ""}
										// Add onChange or other logic
									/>
								))}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									sx={{ mt: 3 }}
								>
									Save Changes
								</Button>
							</form>
						</Paper>
					</Container>
				</div>
				{/* ... Content for other tabs */}
			</div>
		</Dialog>
	);
};
