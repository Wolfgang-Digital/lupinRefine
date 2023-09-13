import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbar,
	GridRenderCellParams,
	GridCellParams,
} from "@mui/x-data-grid";

import { Typography, styled } from "@mui/material";
import { getAllClients, ClientData } from "@api/client";
import ClientDetail from "./ClientDetail";
import {
	AddNewClientButton,
	ButtonContainer,
	ClientsContainer,
} from "@styled-components/clients";

const ClientOverview: React.FC = () => {
	const [clients, setClients] = useState<ClientData[]>([]); // Use the Client type
	const [selectedClient, setSelectedClient] = useState<ClientData | null>(null); // Use the Client type

	useEffect(() => {
		const fetchClients = async () => {
			const clientsResponse = await getAllClients();
			if (clientsResponse) {
				setClients(clientsResponse);
			}
		};
		console.log(clients);
		fetchClients();
	}, []);

	const handleClientClick = (params: GridCellParams) => {
		setSelectedClient(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedClient(null);
	};

	const HoverableCell = styled("div")({
		cursor: "pointer",
		transition: "all 0.2s ease-in-out", // Add a smooth transition
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
					<AddNewClientButton size="small" variant="contained">
						Add New Client
					</AddNewClientButton>
					{/* ... Other buttons and filters */}
				</ButtonContainer>

				<DataGrid
					rows={clients}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					getRowId={(row) => row.id || 0} // Use the 'id' property as the id
					onCellClick={(params: GridCellParams) => {
						if (params.field === "name") {
							handleClientClick(params);
						}
					}}
				/>

				{selectedClient && (
					<ClientDetail client={selectedClient} onClose={handleCloseDialog} />
				)}
			</ClientsContainer>
		</>
	);
};

export default ClientOverview;
