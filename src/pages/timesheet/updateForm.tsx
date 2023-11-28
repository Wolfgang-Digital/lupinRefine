import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	TextField,
	Button,
	Typography,
} from "@mui/material";

import { TimesheetType } from "./DayDialog"; // Import the TimesheetType interface

import { updateTimeEntry } from "@pages/api/timesheetRows";

interface UpdateFormProps {
	rowData: TimesheetType;
	onUpdate: (updatedData: TimesheetType) => void;
	onClose: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ rowData, onClose }) => {
	// State for editable fields
	const [editableTime, setEditableTime] = useState<number | null>(
		rowData.time || 0
	);
	const [editableNotes, setEditableNotes] = useState<string | null>(
		rowData.notes || ""
	);

	const handleUpdate = async () => {
		// Create an object with updated data
		const updatedData: TimesheetType = {
			...rowData,
			time: editableTime,
			notes: editableNotes,
		};

		// Log the updated data to the console
		console.log("Updated Data:", updatedData);

		try {
			// Call the API to update the data in the database
			await updateTimeEntry(updatedData.id, updatedData.time, updatedData.notes);

			// Close the form
			onClose();
		} catch (error) {
			console.error("Error updating data:", error);
			// Handle the error as needed (e.g., show an error message)
		}
	};

	return (
		<Dialog
			fullScreen
			maxWidth="lg"
			style={{
				marginLeft: "65%",
			}}
			open={true}
			onClose={onClose}
		>
			<DialogContent>
				<Typography
					variant="h6"
					style={{
						width: "100%",
						marginBottom: "20px",
						textAlign: "left",
						fontWeight: "bold",
					}}
				>
					Edit Entry
				</Typography>
				<form>
					<TextField
						label="Client"
						value={rowData.client_name || ""}
						InputProps={{ readOnly: true }}
						fullWidth
						disabled
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<TextField
						label="Project"
						value={rowData.project_name || ""}
						InputProps={{ readOnly: true }}
						fullWidth
						disabled
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<TextField
						label="Job"
						value={rowData.job_name || ""}
						InputProps={{ readOnly: true }}
						fullWidth
						disabled
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<TextField
						label="Task"
						value={rowData.task_name || ""}
						InputProps={{ readOnly: true }}
						fullWidth
						disabled
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<TextField
						label="Time Spent (in hours)"
						type="number"
						value={editableTime || 0}
						onChange={(e) => setEditableTime(Number(e.target.value))}
						fullWidth
						required
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<TextField
						label="Notes"
						multiline
						rows={4}
						value={editableNotes || ""}
						onChange={(e) => setEditableNotes(e.target.value)}
						fullWidth
						required
						style={{
							width: "100%",
							marginBottom: "20px",
							textAlign: "left",
						}}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleUpdate}
						style={{ marginTop: "16px" }}
					>
						Update
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateForm;
