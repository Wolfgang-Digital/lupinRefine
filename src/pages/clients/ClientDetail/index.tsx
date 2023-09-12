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
	Tab,
	Container,
	CssBaseline,
	Paper,
	// styled,
	Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { ClientData } from "@api/client";
import { ClientOverview } from "types";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface ClientDetailProps {
	client: ClientData; // Use the Client interface
	onClose: () => void; // Callback to close the dialog
}

const ClientDetail: React.FC<ClientDetailProps> = ({ client, onClose }) => {
	const [tabValue, setTabValue] = useState(0);

	// console.log(client);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const clientInfoFields: { label: string; field: keyof ClientOverview }[] = [
		{ label: "name", field: "name" },
		{ label: "legal_name", field: "legal_name" },
		{ label: "tier", field: "tier_name" },
		{ label: "Currency", field: "address" },
		{ label: "Team Lead", field: "user_name" },
	];

	return (
		<Dialog
			fullScreen
			open={true}
			onClose={onClose}
			TransitionComponent={Transition}
			PaperProps={{ style: { marginLeft: "10%", width: "90%" } }} // Adjust padding here
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
						{client?.name}
					</Typography>
					<Button autoFocus color="inherit" onClick={onClose}>
						Save
					</Button>
				</Toolbar>
			</AppBar>

			{/* Tabs */}
			<div style={{ width: "100%" }}>
				<Tabs
					value={tabValue || 0}
					onChange={handleTabChange}
					aria-label="Client Tabs"
				>
					<Tab label="Client Info" />
					<Tab label="Financials" />
					{/* ... Other tabs */}
				</Tabs>
			</div>

			{/* Tab Content */}
			<div style={{ width: "100%" }}>
				<div
					role="tabpanel"
					hidden={tabValue !== 0}
					id={`tabpanel-0`}
					aria-labelledby={`tab-0`}
					style={{ paddingTop: "40px", paddingBottom: "90px" }}
				>
					{/* Client Info Tab Content */}
					<Container component="main" maxWidth="lg">
						<CssBaseline />
						<Paper elevation={3} sx={{ padding: "20px" }}>
							<Typography component="h1" variant="h5">
								Edit Client Info
							</Typography>
							<form>
								{clientInfoFields.map((field) => (
									<TextField
										key={field?.field}
										margin="normal"
										fullWidth
										label={field.label}
										value={client?.[field?.field] || ""}
										// onChange={(e) => () => {}}
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

				<div
					role="tabpanel"
					hidden={tabValue !== 1}
					id={`tabpanel-1`}
					aria-labelledby={`tab-1`}
					style={{ paddingTop: "20px" }}
				>
					{/* Financials Tab Content */}
					<Container component="main" maxWidth="lg">
						<CssBaseline />
						<Paper elevation={3} sx={{ padding: "20px" }}>
							<Typography component="h1" variant="h5">
								Financial Details
							</Typography>
							{/* Additional financials content */}
						</Paper>
					</Container>
				</div>
				{/* ... Content for other tabs */}
			</div>
		</Dialog>
	);
};

export default ClientDetail;
