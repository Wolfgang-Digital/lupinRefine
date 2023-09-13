// Wolfgangers.tsx
import React, { useState, useEffect } from "react";
import { Typography, styled } from "@mui/material";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import UserDetail from "./WolfgangerDetail";
import {
	AddNewUserButton,
	ButtonContainer,
	WolfgangerContainer,
} from "@styled-components/wolfgangers";
import AddUserDialog from "./AddUserDialog"; // Assuming you have an AddUserDialog component in a separate file
import { getAllUsers, UserData } from "@pages/api/users";

const Wolfgangers: React.FC = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersResponse = await getAllUsers();
			if (usersResponse) {
				setUsers(usersResponse);
			}
		};
		fetchUsers();
	}, []);

	const handleUserClick = (params: GridCellParams) => {
		setSelectedUser(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedUser(null);
	};

	const HoverableCell = styled("div")({
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			textDecoration: "underline",
			fontWeight: "bold",
		},
	});

	const columns: (GridColDef & { field: keyof UserData })[] = [
		{
			field: "user_name",
			headerName: "User Name",
			width: 200,
			renderCell: (params: GridRenderCellParams) => (
				<HoverableCell onClick={() => handleUserClick(params)}>
					{params.value || ""}
				</HoverableCell>
			),
		},
		{ field: "department_name", headerName: "User Department", width: 200 },
		{ field: "user_email", headerName: "User Email", width: 300 },
		{ field: "user_job_rate_1", headerName: "Job Rate #1", width: 150 },
		{ field: "user_job_rate_2", headerName: "Job Rate #2", width: 150 },
		{ field: "user_job_rate_3", headerName: "Job Rate #3", width: 150 },
		{ field: "user_job_rate_4", headerName: "Job Rate #4", width: 150 },
		{ field: "user_job_rate_5", headerName: "Job Rate #5", width: 150 },
	];

	const rows = users.map((user) => ({
		user_id: user.user_id,
		user_name: user.user_name,
		user_email: user.user_email,
		department_name: user.department_name,
		user_job_rate_1: `€` + user.user_job_rate_1,
		user_job_rate_2: `€` + user.user_job_rate_2,
		user_job_rate_3: `€` + user.user_job_rate_3,
		user_job_rate_4: `€` + user.user_job_rate_4,
		user_job_rate_5: `€` + user.user_job_rate_5,
	}));

	const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	const handleOpenAddUserDialog = () => {
		setOpenAddUserDialog(true);
	};

	const handleCloseAddUserDialog = () => {
		setOpenAddUserDialog(false);
	};

	const userInfoFields = [
		{ label: "First Name", field: "firstName" },
		{ label: "Last Name", field: "lastName" },
		{ label: "Email", field: "email" },
		{ label: "Phone Number", field: "phoneNumber" },
		{ label: "Address", field: "address" },
	];

	return (
		<>
			<WolfgangerContainer>
				<Typography gutterBottom variant="h5" component="div">
					Wolfgangers
				</Typography>
				<ButtonContainer>
					<AddNewUserButton variant="contained" onClick={handleOpenAddUserDialog}>
						Add New User
					</AddNewUserButton>
				</ButtonContainer>
				<DataGrid
					rows={rows}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					getRowId={(row) => row.user_id}
					onCellClick={(params: GridCellParams) => {
						if (params.field == "name") {
							handleUserClick(params);
						}
					}}
				/>
				{selectedUser && (
					<UserDetail user={selectedUser} onClose={handleCloseDialog} />
				)}
			</WolfgangerContainer>

			{/* Add New User Dialog */}
			<AddUserDialog
				open={openAddUserDialog}
				onClose={handleCloseAddUserDialog}
				tabValue={tabValue}
				handleTabChange={(event: React.SyntheticEvent, newValue: number) => {
					setTabValue(newValue);
				}}
				userInfoFields={userInfoFields}
			/>
		</>
	);
};

export default Wolfgangers;
