import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbar,
	GridRenderCellParams,
	GridCellParams,
} from "@mui/x-data-grid";
import {
	Typography,
	Button,
	styled,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	AppBar,
	Toolbar,
	IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { getAllClients, ClientData } from '@api/client';
import ClientDetail from './ClientDetail';

const ClientOverview: React.FC = () => {
	const [clients, setClients] = useState<ClientData[]>([]);
	const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
	const [openAddClientDialog, setOpenAddClientDialog] = useState(false);
	const [newClientName, setNewClientName] = useState("");

	useEffect(() => {
		const fetchClients = async () => {
			const clientsResponse = await getAllClients();
			if (clientsResponse) {
				setClients(clientsResponse);
			}
		};
		fetchClients();
	}, []);

	const handleClientClick = (params: GridCellParams) => {
		setSelectedClient(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedClient(null);
	};

	const handleAddClientClick = () => {
		setOpenAddClientDialog(true);
	};

	const handleAddClientDialogClose = () => {
		setOpenAddClientDialog(false);
	};

	const handleSaveClient = async () => {
		// Handle saving the new client data here, e.g., by making an API call
		// You can use newClientName state and any other required data
		// After successfully adding the client, you can close the dialog
		setOpenAddClientDialog(false);
	};

	const HoverableCell = styled("div")({
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			textDecoration: "underline",
			fontWeight: "bold",
		},
	});

	const columns = [
		{ field: "id", headerName: "id", width: 100 },
		{
			field: "name",
			headerName: "name",
			width: 250,
			renderCell: (params: GridRenderCellParams) => (
				<HoverableCell onClick={() => handleClientClick(params)}>
					{params.value || ""}
				</HoverableCell>
			),
		},
		{
			field: "legal_name",
			headerName: "legal_name",
			width: 250,
		},
		{ field: "tier", headerName: "tier", width: 200 },
		{ field: "team_lead", headerName: "team_lead", width: 200 },
		// ... Other columns
	];

	const rows = clients.map((client) => ({
		id: client.id,
		name: client.name,
		legal_name: client.legal_name,
		tier: client.tier_name,
		team_lead: client.user_name,
	}));

	return (
		<div style={{ height: 750, width: "100%", marginBottom: "100px" }}>
			<Typography gutterBottom variant="h5" component="div">
				Client Overview
			</Typography>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					paddingBottom: "10px",
				}}
			>
				<Button
					size="small"
					variant="contained"
					style={{
						fontSize: "12px",
						padding: "6px 12px",
						marginRight: "10px",
					}}
					onClick={handleAddClientClick}
				>
					Add New Client
				</Button>
				{/* ... Other buttons and filters */}
			</div>

			<DataGrid
				rows={rows}
				columns={columns}
				slots={{ toolbar: GridToolbar }}
				getRowId={(row) => row.id}
				onCellClick={(params: GridCellParams) => {
					if (params.field === "name") {
						handleClientClick(params);
					}
				}}
			/>

			{selectedClient && (
				<ClientDetail client={selectedClient} onClose={handleCloseDialog} />
			)}

			{
				/* Dialog for adding a new client */
				<Dialog
					fullScreen
					open={openAddClientDialog}
					onClose={handleAddClientDialogClose}
					PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
				>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleAddClientDialogClose}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
								Add New User
							</Typography>
							<Button autoFocus color="inherit" onClick={handleAddClientDialogClose}>
								Save
							</Button>
						</Toolbar>
					</AppBar>
					<DialogTitle>Add New Client</DialogTitle>
					<DialogContent>
						<TextField
							label="Client Name"
							fullWidth
							value={newClientName}
							onChange={(e) => setNewClientName(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleAddClientDialogClose}>Cancel</Button>
						<Button onClick={handleSaveClient} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			}
		</div>
	);
};

export default ClientOverview;
