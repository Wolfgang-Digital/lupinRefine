import React from "react";
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
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon

interface AddClientDialogProps {
	open: boolean;
	onClose: () => void;
	tabValue: number;
	handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
	clientInfoFields: { label: string; field: string }[]; // Define your form fields type here
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({
	open,
	onClose,
	tabValue,
	handleTabChange,
	clientInfoFields,
}) => {
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={onClose}
			PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={onClose}
						aria-label="close"
					>
						<CloseIcon /> {/* Add the Close icon here */}
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Add New Client
					</Typography>
					<Button autoFocus color="inherit" onClick={onClose}>
						Save
					</Button>
				</Toolbar>
			</AppBar>

			{/* Tabs */}
			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				aria-label="Add Client Tabs"
			>
				<Tab label="Client Info" />
			</Tabs>

			{/* Tab Content */}
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
	);
};

interface AddClientButtonProps {
	onAddClient: () => void;
}

const AddClientButton: React.FC<AddClientButtonProps> = ({ onAddClient }) => {
	return (
		<Button size="small" variant="contained" onClick={onAddClient}>
			Add New Client
		</Button>
	);
};

export { AddClientDialog, AddClientButton };
