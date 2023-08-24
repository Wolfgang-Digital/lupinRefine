import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Typography, Button, styled } from '@mui/material';
import { getAllClients, ClientData } from '../api/client';
import { ClientDetail } from './ClientDetail';

function generateRandom() {
	let length = 8,
		charset =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		retVal = '';
	for (let i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}

const ClientOverview: React.FC = () => {
	const [clients, setClients] = useState<ClientData[]>([]); // Use the Client type
	const [selectedClient, setSelectedClient] = useState<any | null>(null); // Use the Client type

	useEffect(() => {
		const fetchClients = async () => {
			const clientsResponse = await getAllClients();
			if (clientsResponse) {
				setClients(clientsResponse);
			}
		};
		fetchClients();
	}, []);

	const handleClientClick = (params: any) => {
		setSelectedClient(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedClient(null);
	};

	const HoverableCell = styled('div')({
		cursor: 'pointer',
		transition: 'all 0.2s ease-in-out', // Add a smooth transition
		'&:hover': {
			textDecoration: 'underline',
			fontWeight: 'bold',
		},
	});

	const columns = [
		{ field: 'id', headerName: 'id', width: 100 },
		{
			field: 'name',
			headerName: 'name',
			width: 250,
			renderCell: (params: any) => (
				<HoverableCell onClick={() => handleClientClick(params)}>
					{params.value || ''}
				</HoverableCell>
			),
		},
		{
			field: 'legal_name',
			headerName: 'legal_name',
			width: 250,
		},
		{ field: 'tier', headerName: 'tier', width: 200 },
		{ field: 'team_lead', headerName: 'team_lead', width: 200 },
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
		<div style={{ height: 750, width: '100%', marginBottom: '100px' }}>
			<Typography gutterBottom variant='h5' component='div'>
				Client Overview
			</Typography>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					paddingBottom: '10px',
				}}
			>
				<Button
					size='small'
					variant='contained'
					style={{
						fontSize: '12px',
						padding: '6px 12px',
						marginRight: '10px',
					}}
				>
					Add New Client
				</Button>
				{/* ... Other buttons and filters */}
			</div>

			<DataGrid
				rows={rows}
				columns={columns}
				slots={{ toolbar: GridToolbar }}
				getRowId={(row: any) => row.id} // Use the 'id' property as the id
				onCellClick={(params: any) => {
					if (params.field === 'name') {
						handleClientClick(params);
					}
				}}
			/>

			{selectedClient && (
				<ClientDetail
					client={selectedClient}
					onClose={handleCloseDialog}
				/>
			)}
		</div>
	);
};

export default ClientOverview;
function handleClientInfoChange(field: string, value: string): void {
	throw new Error('Function not implemented.');
}
