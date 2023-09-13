import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbar,
	GridRenderCellParams,
	GridCellParams,
} from "@mui/x-data-grid";
import { Typography, styled, Button } from "@mui/material";
import { getAllClients, ClientData } from "@api/client";
import ClientDetail from "./ClientDetail";
import { ButtonContainer, ClientsContainer } from "@styled-components/clients";
import AddClientDialog from "./AddClient";

const ClientOverview: React.FC = () => {
	const [clients, setClients] = useState<ClientData[]>([]);
	const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
	const [openAddClientDialog, setOpenAddClientDialog] = useState(false);

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

	const handleCloseAddClientDialog = () => {
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
			headerName: "Name",
			width: 250,
			renderCell: (params: GridRenderCellParams) => (
				<HoverableCell onClick={() => handleClientClick(params)}>
					{params.value || ""}
				</HoverableCell>
			),
		},
		{
			field: "legal_name",
			headerName: "Legal Name",
			width: 250,
		},
		{ field: "tier_name", headerName: "Tier", width: 200 },
		{ field: "user_name", headerName: "Team Lead", width: 200 },
		// ... Other columns
	];

	return (
		<>
			<ClientsContainer>
				<Typography gutterBottom variant="h5" component="div">
					Client Overview
				</Typography>
				<ButtonContainer>
					{/* Use a button to open the AddClientDialog */}
					<Button size="small" variant="contained" onClick={handleAddClientClick}>
						Add New Client
					</Button>
					{/* ... Other buttons and filters */}
				</ButtonContainer>

				<DataGrid
					rows={clients}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					getRowId={(row) => row.id || 0}
					onCellClick={(params: GridCellParams) => {
						if (params.field === "name") {
							handleClientClick(params);
						}
					}}
				/>

				{selectedClient && (
					<ClientDetail client={selectedClient} onClose={handleCloseDialog} />
				)}

				{/* AddClientDialog for adding a new client */}
				<AddClientDialog
					open={openAddClientDialog}
					onClose={handleCloseAddClientDialog}
					tabValue={0} // You can set the initial tab value here
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					handleTabChange={(event: React.SyntheticEvent, newValue: number) => {
						// Handle tab changes if needed
					}}
					clientInfoFields={[
						{ label: "Client Name", field: "clientName" },
						{ label: "Legal Name", field: "legalName" },
						{ label: "Tier", field: "tier" },
						{ label: "Team Lead", field: "teamLead" },
						// Add more fields as needed
					]}
				/>
			</ClientsContainer>
		</>
	);
};

export default ClientOverview;
