import React, { useState, useEffect } from "react";
import {
	DataGrid,
	GridCellParams,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import {
	AppBar,
	Button,
	Dialog,
	DialogContent,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	styled,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { WolfgangerDetail } from "src/pages/wolfgangers/WolfgangersDetail/index"; // Create WolfgangerDetail similarly to ClientDetail
import { getAllUsers } from "@pages/api/users";
import { Users } from "types";
import supabase from "src/config/supaBaseClient";

const Users = () => {
	const [users, setUsers] = useState<Users[]>([]); // Explicitly specify the type
	const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
	const [newUserId, setNewUserId] = useState<number | string>(""); // Example type
	// ... rest of the code

	const [newUserName, setNewUserName] = useState("");
	const [newUserEmail, setNewUserEmail] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [newUserRate, setNewUserRate] = useState("");

	const departments = ["Department 1", "Department 2", "Department 3"];

	useEffect(() => {
		// Mock function for fetching users
		const fetchUsers = async () => {
			try {
				// Replace this with your actual API call
				const usersResponse = await getAllUsers(); // Import this function
				if (usersResponse) {
					setUsers(usersResponse);
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		fetchUsers();
	}, []);

	const [selectedUser, setSelectedUser] = useState(null);

	const handleUserClick = (params: GridCellParams) => {
		setSelectedUser(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedUser(null);
	};

	const handleAddUserClick = () => {
		setOpenAddUserDialog(true);
	};

	const handleAddUserDialogClose = () => {
		setOpenAddUserDialog(false);
	};

	const handleSaveUser = async () => {
		const { data, error } = await supabase.from("users").insert([
			{
				user_id: 1,
				user_name: newUserName,
				user_email: newUserEmail,
				user_department: 1,
				// user_job_rate: newUserRate,
				// ... Other fields
			},
		]);

		if (error) {
			console.error("Error saving user:", error);
			// Handle error state or show a notification to the user
		} else {
			if (data) {
				// Check if data is not null
				// Update the users state with the new user
				setUsers((prevUsers) => [...prevUsers, data[0]]);
			}

			// Close the dialog
			setOpenAddUserDialog(false);
			// Reset the form fields
			setNewUserId("");
			setNewUserName("");
			setNewUserEmail("");
			setSelectedDepartment("");
			setNewUserRate("");
		}
	};

	const HoverableCell = styled("div")({
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			textDecoration: "underline",
			fontWeight: "bold",
		},
	});

	const filteredUsers = users.filter((user) => user.user_id !== 0);

	const columns = [
		{ field: "user_id", headerName: "User ID", width: 100 },
		{
			field: "user_name",
			headerName: "User Name",
			width: 250,
			renderCell: (params: GridRenderCellParams) => (
				<HoverableCell onClick={() => handleUserClick(params)}>
					{params.value || ""}
				</HoverableCell>
			),
		},
		{
			field: "user_department",
			headerName: "User Department",
			width: 250,
		},
		// ... Other columns
	];

	const rows = filteredUsers.map((user) => ({
		user_id: user.user_id,
		user_name: user.user_name,
		user_department: user.user_department,
		// ... Other fields
	}));

	return (
		<div style={{ height: "100%", width: "100%", paddingBottom: "50px" }}>
			<Typography gutterBottom variant="h5" component="div">
				Wolfgangers Overview
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
					onClick={handleAddUserClick}
				>
					Add New User
				</Button>
				{/* ... Other buttons and filters */}
			</div>

			<DataGrid
				rows={rows}
				columns={columns}
				slots={{ toolbar: GridToolbar }}
				getRowId={(row) => row.user_id.toString()}
				onCellClick={(params: GridCellParams) => {
					if (params.field === "user_name") {
						handleUserClick(params);
					}
				}}
			/>

			{selectedUser && (
				<WolfgangerDetail user={selectedUser} onClose={handleCloseDialog} />
			)}
			<Dialog
				fullScreen
				open={openAddUserDialog}
				onClose={handleAddUserDialogClose}
				PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleAddUserDialogClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Add New User
						</Typography>
						<Button autoFocus color="inherit" onClick={handleAddUserDialogClose}>
							Save
						</Button>
					</Toolbar>
				</AppBar>
				<DialogContent>
					<Typography variant="h6" gutterBottom>
						Add New User
					</Typography>
					<TextField
						label="User ID"
						value={newUserId}
						onChange={(e) => setNewUserId(e.target.value)}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="User Name"
						value={newUserName}
						onChange={(e) => setNewUserName(e.target.value)}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Email"
						value={newUserEmail}
						onChange={(e) => setNewUserEmail(e.target.value)}
						fullWidth
						margin="normal"
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel>Department</InputLabel>
						<Select
							value={selectedDepartment}
							onChange={(e) => setSelectedDepartment(e.target.value as string)}
							disableUnderline // Add this line
						>
							{departments.map((dept) => (
								<MenuItem key={dept} value={dept}>
									{dept}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel>User Rate</InputLabel>
						<Select
							value={newUserRate}
							onChange={(e) => setNewUserRate(e.target.value as string)}
							disableUnderline // Add this line
						>
							<MenuItem value="100">100</MenuItem>
							<MenuItem value="120">120</MenuItem>
							<MenuItem value="150">150</MenuItem>
							<MenuItem value="170">170</MenuItem>
						</Select>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSaveUser}
						style={{ marginTop: "20px" }}
					>
						Save User
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Users;
