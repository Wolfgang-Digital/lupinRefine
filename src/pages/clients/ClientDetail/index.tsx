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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClientData } from "@api/client";

import { ClientOverview } from "types";
import {
	TabContainer,
	TabContentContainer,
	TabPanelContainer,
} from "@styled-components/clients";
import JobsInfoGrid from "@components/ClientJobInfoTab";

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
		{ label: "Name", field: "name" },
		{ label: "Legal Name", field: "legal_name" },
		{ label: "Tier", field: "tier_name" },
		{ label: "Address", field: "address" },
		{ label: "Team Lead", field: "user_name" },
	];

	return (
		<Dialog
			fullScreen
			open={true}
			onClose={onClose}
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
			<TabContainer>
				<Tabs
					value={tabValue || 0}
					onChange={handleTabChange}
					aria-label="Client Tabs"
				>
					<Tab label="Client Info" />
					<Tab label="Job Details" />
					{/* ... Other tabs */}
				</Tabs>
			</TabContainer>

			{/* Tab Content */}
			<TabContentContainer>
				<TabPanelContainer
					role="tabpanel"
					hidden={tabValue !== 0}
					id={`tabpanel-0`}
					aria-labelledby={`tab-0`}
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
										label={field?.label}
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
				</TabPanelContainer>

				<TabPanelContainer
					role="tabpanel"
					hidden={tabValue !== 1}
					id={`tabpanel-1`}
					aria-labelledby={`tab-1`}
				>
					{/* Financials Tab Content */}
					<Container
						style={{ height: 350, width: "100%" }}
						component="main"
						maxWidth="lg"
					>
						<CssBaseline />
						<Paper elevation={3} sx={{ padding: "20px" }}>
							<Typography component="h1" variant="h5">
								Projects Overview: <strong>{client?.name}</strong>
							</Typography>

							<JobsInfoGrid clientId={client?.id || 0} />
						</Paper>
					</Container>
				</TabPanelContainer>
				{/* ... Content for other tabs */}
			</TabContentContainer>
		</Dialog>
	);
};

export default ClientDetail;
