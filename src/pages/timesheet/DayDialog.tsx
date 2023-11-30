import React, { useEffect, useState } from "react";
import {
	Grid,
	Button,
	Typography,
	TextField,
	MenuItem,
	DialogContent,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import {
	ClientOption,
	JobOption,
	ProjectOption,
	TaskOption,
} from "./index.page";
import {
	deleteTimeEntry,
	getAllTimesheetRowsV2,
	updateTimeEntry,
} from "@pages/api/timesheetRows";

export interface TimesheetType {
	client_name: string | null;
	project_name: string | null;
	job_name: string | null;
	task_name: string | null;
	time: number | null;
	id: number | 0;
	notes: string | null;
}
export const DayDialog = ({
	showForm,
	setShowForm,
	selectedDate,
	selectedClient,
	handleClientSelect,
	clients,
	selectedProject,
	handleProjectSelect,
	projects,
	selectedJob,
	selectedJobs,
	handleJobSelect,
	jobs,
	selectedTask,
	setSelectedTask,
	tasks,
	timeSpent,
	setTimeSpent,
	notes,
	setNotes,
	saveTimeEntry,
	onUpdateTimesheet,
}: {
	showForm: boolean;
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
	selectedDate: string;
	selectedClient: string;
	handleClientSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
	clients: ClientOption[];
	selectedProject: string;
	handleProjectSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
	projects: ProjectOption[];
	selectedJob: string;
	selectedJobs: string;
	handleJobSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
	jobs: JobOption[];
	selectedTask: string;
	setSelectedTask: React.Dispatch<React.SetStateAction<string>>;
	tasks: TaskOption[];
	timeSpent: string;
	setTimeSpent: React.Dispatch<React.SetStateAction<string>>;
	notes: string;
	setNotes: React.Dispatch<React.SetStateAction<string>>;
	saveTimeEntry: () => void;
	onUpdateTimesheet: () => Promise<void>;
}) => {
	const [rows, setRows] = useState<TimesheetType[]>([]);
	const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
	const displayDate = format(new Date(selectedDate), "dd-MM-yyy");

	const [editableRow, setEditableRow] = useState<TimesheetType | null>(null);
	const [editedTime, setEditedTime] = useState<number | null>(null);
	const [editedNotes, setEditedNotes] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const timesheetsResponse = await getAllTimesheetRowsV2();

				if (timesheetsResponse) {
					const filteredTimesheets = timesheetsResponse.filter(
						(timesheet) => timesheet.date === formattedDate
					);

					const newRows: TimesheetType[] = filteredTimesheets.map((timesheet) => ({
						client_name: timesheet.name,
						project_name: timesheet.project_name,
						job_name: timesheet.job_name,
						task_name: timesheet.task_name,
						time: timesheet.time,
						id: timesheet.id as number,
						notes: timesheet.notes,
					}));

					setRows(newRows);
				} else {
					console.error("timesheetsResponse is undefined");
				}
			} catch (error) {
				console.error("Error fetching data from Supabase:", error);
			}
		}

		if (showForm) {
			fetchData();
		}
	}, [selectedDate, showForm]);

	const handleDeleteRow = async (id: number) => {
		try {
			await deleteTimeEntry(id);
			if (onUpdateTimesheet) {
				await onUpdateTimesheet();
			}
			setShowForm(false);
		} catch (error) {
			console.error("Error deleting time entry:", error);
		}
	};

	const handleEditRow = (id: number) => {
		const editableRowData = rows.find((row) => row.id === id);
		setEditableRow(editableRowData ?? null);
		setEditedTime(editableRowData?.time ?? null);
		setEditedNotes(editableRowData?.notes ?? null);
	};

	const handleSaveEdit = async () => {
		if (editableRow) {
			// Update the database with the edited data
			await updateTimeEntry(editableRow.id, editedTime, editedNotes);

			// Update the local state to reflect the changes immediately
			const updatedRows = rows.map((row) =>
				row.id === editableRow.id
					? { ...row, time: editedTime, notes: editedNotes }
					: row
			);
			setRows(updatedRows);

			if (onUpdateTimesheet) {
				await onUpdateTimesheet();
			}

			// Close the edit form
			setEditableRow(null);
		}
	};

	const handleCloseFormEdit = () => {
		// Reset state when closing the form
		setEditableRow(null);
	};

	return (
		<Dialog
			open={showForm}
			onClose={() => {
				setShowForm(false);
			}}
			fullScreen
			maxWidth="lg"
			style={{
				marginLeft: "15%",
			}}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton color="inherit" onClick={() => setShowForm(false)}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Day Selected: {displayDate}
					</Typography>
					<Button
						autoFocus
						color="inherit"
						onClick={() => {
							setShowForm(false);
						}}
					>
						Cancel
					</Button>
				</Toolbar>
			</AppBar>

			<DialogContent>
				<Grid
					container
					spacing={2}
					style={{ paddingTop: "10px", paddingBottom: "90px" }}
				>
					<Grid item xs={8}>
						<Typography
							style={{
								paddingBottom: "20px",
								fontWeight: "bold",
								fontSize: "20px",
							}}
						>
							Day Overview:
						</Typography>

						<div style={{ height: "600px", overflow: "auto" }}>
							{rows.length > 0 ? (
								<DataGrid
									autoHeight
									rows={rows.filter((row) => row.time && row.time > 0)}
									getRowId={(timesheet) => timesheet.id}
									columns={[
										{
											field: "edit",
											headerName: "Edit",
											width: 50,
											renderCell: (params) => (
												<IconButton
													color="secondary"
													onClick={() => handleEditRow(params.row.id)}
												>
													<EditIcon />
												</IconButton>
											),
										},
										{ field: "client_name", headerName: "Client", width: 100 },
										{ field: "project_name", headerName: "Project", width: 120 },
										{ field: "job_name", headerName: "Job", width: 140 },
										{ field: "task_name", headerName: "Task", width: 100 },
										{ field: "time", headerName: "Logged", width: 80 },
										{ field: "notes", headerName: "Notes", width: 100 },
										{
											field: "delete",
											headerName: "Delete",
											width: 80,
											renderCell: (params) => (
												<IconButton
													color="secondary"
													onClick={() => handleDeleteRow(params.row.id)}
												>
													<HighlightOffIcon />
												</IconButton>
											),
										},
									]}
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								/>
							) : (
								<Grid
									style={{
										border: "0.5px solid #dedbd2",
										padding: "20px",
										borderRadius: "6px",
									}}
								>
									<h3>You have no logged hours today, please check your timesheet.</h3>
								</Grid>
							)}
						</div>
					</Grid>
					<Grid item xs={4}>
						<Typography
							style={{
								paddingBottom: "20px",
								fontWeight: "bold",
								fontSize: "20px",
							}}
						>
							Log Time:
						</Typography>
						<form>
							<TextField
								label="Date"
								value={displayDate}
								InputProps={{
									readOnly: true,
								}}
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>

							<TextField
								select
								label="Select Client"
								value={selectedClient}
								onChange={handleClientSelect}
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							>
								{clients.map((client) => (
									<MenuItem key={client.value} value={client.value}>
										{client.label}
									</MenuItem>
								))}
							</TextField>
							{selectedClient && (
								<TextField
									select
									label="Select Project"
									value={selectedProject}
									onChange={handleProjectSelect}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									required
								>
									{projects.map((project) => (
										<MenuItem key={project.value} value={project.value}>
											{project.label}
										</MenuItem>
									))}
								</TextField>
							)}
							{selectedProject && (
								<TextField
									select
									label="Select Job"
									value={selectedJob}
									name={selectedJobs}
									onChange={handleJobSelect}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
									required
								>
									{jobs.map((job) => (
										<MenuItem key={job.value} value={job.value} title={job.taskLabel}>
											{job.label}
										</MenuItem>
									))}
								</TextField>
							)}
							{selectedJob && (
								<TextField
									select
									label="Select Task"
									value={selectedTask}
									onChange={(event) => setSelectedTask(event.target.value as string)}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									required
								>
									{tasks.map((task) => (
										<MenuItem key={task.value} value={task.value}>
											{task.label}
										</MenuItem>
									))}
								</TextField>
							)}
							{selectedTask && (
								<TextField
									type="number"
									label="Time Spent (in hours)"
									value={timeSpent}
									onChange={(event) => {
										if (Number(event.target.value) >= 0) {
											setTimeSpent(event.target.value);
										}
									}}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									required
								/>
							)}
							{selectedTask && timeSpent && (
								<TextField
									label="Notes"
									value={notes}
									onChange={(event) => setNotes(event.target.value)}
									multiline
									rows={4}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									required
								/>
							)}
							<Button
								variant="contained"
								color="primary"
								style={{ padding: "10px" }}
								disabled={!selectedTask || !timeSpent || !notes}
								onClick={saveTimeEntry}
							>
								Save Time Entry
							</Button>
						</form>
					</Grid>
				</Grid>
			</DialogContent>
			{editableRow && (
				<Dialog
					fullScreen
					maxWidth="lg"
					onClose={handleCloseFormEdit}
					style={{
						marginLeft: "65%",
					}}
					open={true}
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
							Edit Entry:
						</Typography>
						<IconButton
							style={{ position: "absolute", right: "10px", top: "10px" }}
							onClick={handleCloseFormEdit} // You need to define this function to handle the close action
						>
							<CloseIcon />
						</IconButton>
						<form>
							<TextField
								label="Client"
								value={editableRow.client_name ?? ""}
								InputProps={{ readOnly: true }}
								disabled
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<TextField
								label="Project"
								value={editableRow.project_name ?? ""}
								InputProps={{ readOnly: true }}
								disabled
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<TextField
								label="Job"
								value={editableRow.job_name ?? ""}
								InputProps={{ readOnly: true }}
								disabled
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<TextField
								label="Task"
								value={editableRow.task_name ?? ""}
								InputProps={{ readOnly: true }}
								disabled
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<TextField
								label="Time Spent (in hours)"
								type="number"
								value={editedTime === null ? "" : editedTime}
								onChange={(event) => setEditedTime(Number(event.target.value))}
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<TextField
								label="Notes"
								value={editedNotes === null ? "" : editedNotes}
								onChange={(event) => setEditedNotes(event.target.value)}
								multiline
								rows={4}
								style={{
									width: "100%",
									marginBottom: "20px",
									textAlign: "left",
								}}
								required
							/>
							<Button
								variant="contained"
								color="primary"
								style={{ padding: "10px" }}
								onClick={handleSaveEdit}
							>
								Save Edit
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			)}
		</Dialog>
	);
};
