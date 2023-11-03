import React, { useState, useEffect } from "react";
import { Typography, styled } from "@mui/material";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Tabs,
	Tab,
	Container,
	CssBaseline,
	Paper,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserDetail from "./WolfgangerDetail";
import {
	AddNewUserButton,
	ButtonContainer,
	WolfgangerContainer,
} from "@styled-components/wolfgangers";
import { getAllUsers, UserData } from "@pages/api/users";

const Wolfgangers: React.FC = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
	const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersResponse = await getAllUsers();
			console.log({ usersResponse });
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
					getRowId={(row) => row.department_name + row.user_id}
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
			<Dialog
				fullScreen
				open={openAddUserDialog}
				onClose={handleCloseAddUserDialog}
				PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
			>
				<AppBar position="relative">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleCloseAddUserDialog}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Add New User
						</Typography>
						<Button autoFocus color="inherit" onClick={handleCloseAddUserDialog}>
							Save
						</Button>
					</Toolbar>
				</AppBar>

				{/* Tabs */}
				<Tabs
					value={tabValue}
					onChange={(event, newValue) => {
						setTabValue(newValue);
					}}
					aria-label="Add User Tabs"
				>
					<Tab label="User Info" />
				</Tabs>

				{/* Tab Content */}
				<Container component="main" maxWidth="lg" sx={{ marginTop: "40px" }}>
					<CssBaseline />
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Typography component="h1" variant="h5">
							User Information
						</Typography>
						<form>
							{userInfoFields.map((field) => (
								<TextField
									key={field?.field}
									margin="normal"
									fullWidth
									label={field?.label}
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
								Save User
							</Button>
						</form>
					</Paper>
				</Container>
			</Dialog>
		</>
	);
};

export default Wolfgangers;
