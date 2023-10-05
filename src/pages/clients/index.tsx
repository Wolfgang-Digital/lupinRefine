import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbar,
	GridRenderCellParams,
	GridCellParams,
} from "@mui/x-data-grid";
import {
	Typography,
	styled,
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Container,
	CssBaseline,
	Paper,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllClients, ClientData } from "@api/client";
import ClientDetail from "./ClientDetail";
import { ButtonContainer, ClientsContainer } from "@styled-components/clients";

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
		/* { field: "id", headerName: "id", width: 100 }, */
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

	const clientInfoFields = [
		{ label: "Client Name", field: "clientName" },
		{ label: "Legal Name", field: "legalName" },
		{ label: "Tier", field: "tier" },
		{ label: "Team Lead", field: "teamLead" },
		// Add more fields as needed
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
				<Dialog
					fullScreen
					open={openAddClientDialog}
					onClose={handleCloseAddClientDialog}
					PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
				>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleCloseAddClientDialog}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
								Add New Client
							</Typography>
							<Button autoFocus color="inherit" onClick={handleCloseAddClientDialog}>
								Save
							</Button>
						</Toolbar>
					</AppBar>

					<Container component="main" maxWidth="lg" sx={{ marginTop: "40px" }}>
						<CssBaseline />
						<Paper elevation={3} sx={{ padding: "20px" }}>
							<Typography component="h1" variant="h5">
								Client Information
							</Typography>
							<form>
								{clientInfoFields.map((field) => (
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
									Save Client
								</Button>
							</form>
						</Paper>
					</Container>
				</Dialog>
			</ClientsContainer>
		</>
	);
};

export default ClientOverview;
