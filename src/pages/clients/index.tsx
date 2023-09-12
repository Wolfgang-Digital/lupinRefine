import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbar,
	GridRenderCellParams,
	GridCellParams,
} from "@mui/x-data-grid";

import { Typography, Button, styled } from "@mui/material";
import { getAllClients, ClientData } from "@api/client";
import ClientDetail from "./ClientDetail";

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
		{ field: "tier_name", headerName: "tier", width: 200 },
		{ field: "user_name", headerName: "team_lead", width: 200 },
		// ... Other columns
	];

	// const rows = clients.map((client) => ({
	//   id: client.id,
	//   name: client.name,
	//   legal_name: client.legal_name,
	//   tier_name: client.tier_name,
	//   user_name: client.user_name,
	//   address: client.address,
	// }));

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
				>
					Add New Client
				</Button>
				{/* ... Other buttons and filters */}
			</div>

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
		</div>
	);
};

export default ClientOverview;
// function handleClientInfoChange(field: string, value: string): void {
// 	throw new Error('Function not implemented.');
// }
