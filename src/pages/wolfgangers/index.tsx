import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid /* GridColDef */ } from '@mui/x-data-grid';
import { Wolfgangers } from 'types';
import { useState, useEffect } from 'react';
import { getAllUsers } from 'src/pages/api/users';

const wolfgangers = () => {
	const [users, setUsers] = useState<Wolfgangers[]>([]);
	useEffect(() => {
		async function fetchUsers() {
			const usersResponse = await getAllUsers();
			if (usersResponse) {
				setUsers(usersResponse);
			}
		}
		console.log(users);
		fetchUsers();
	}, []);

	const columns = [
		{ field: 'user_name', headerName: 'user name ', width: 200 },
		{
			field: 'user_department',
			headerName: 'user department ',
			width: 200,
		},
		{
			field: 'user_role',
			headerName: 'user role ',
			width: 200,
		},
	];

	const rows = users.map((user) => ({
		id: user.user_id,
		user_name: user.user_name,
		user_department: user.user_department,
		user_role: user.user_role,
	}));
	console.log(rows);

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<Typography gutterBottom variant='h4' component='div'>
				Wolfgangers
			</Typography>
			<DataGrid
				rows={rows}
				columns={columns}
				getRowId={(row) => row.id}
				checkboxSelection
			/>
		</div>
	);
};

export default wolfgangers;
