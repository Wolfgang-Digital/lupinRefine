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
import CloseIcon from "@mui/icons-material/Close"; // Step 1: Import the CloseIcon
import { DataGrid } from "@mui/x-data-grid";
import {
	ClientOption,
	TaskOption,
	JobOption,
	ProjectOption,
} from "./index.page";
import { useEffect, useState } from "react";
import { getAllTimesheetRowsV2 } from "@pages/api/timesheetRows";
import { groupTimesheets, GroupedTimesheets } from "./groupTimesheets";
import { format } from "date-fns";

interface TimesheetType {
	client_name: string;
	project_name: string | null;
	job_name: string | null;
	task_name: string | null;
	time: number | null;
	time_left: number | null;
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
}) => {
	const columns = [
		{ field: "client_name", headerName: "Name", width: 140 },
		{ field: "project_name", headerName: "Project", width: 140 },
		{ field: "job_name", headerName: "Job", width: 120 },
		{ field: "task_name", headerName: "Task", width: 120 },
		{ field: "time", headerName: "Hrs Logged", width: 100 },
		{ field: "time_left", headerName: "Hrs Left", width: 80 },
	];

	const [rows, setRows] = useState<TimesheetType[]>([]);
	const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
	const displayDate = format(new Date(selectedDate), "dd-MM-yyy");

	useEffect(() => {
		async function fetchData() {
			try {
				const timesheetsResponse = await getAllTimesheetRowsV2();

				if (timesheetsResponse) {
					const filteredTimesheets = timesheetsResponse.filter(
						(timesheet) => timesheet.date === formattedDate
					);

					// console.log({ timesheetsResponse, filteredTimesheets });
					// console.log(formattedDate);

					const groupedTimesheetsData: GroupedTimesheets =
						groupTimesheets(filteredTimesheets);

					const newRows: TimesheetType[] = [];
					groupedTimesheetsData.forEach((entry) => {
						entry.jobs.forEach((jobEntry) => {
							jobEntry.tasks.forEach((taskEntry) => {
								newRows.push({
									client_name: entry.client_name,
									project_name: entry.project_name,
									job_name: jobEntry.job_name,
									task_name: taskEntry.task_name,
									time_left: (taskEntry?.hours || 0) - (taskEntry.time || 0),
									time: taskEntry.time,
								});
							});
						});
					});
					setRows(newRows);
					// console.log({ newRows, groupedTimesheetsData });
					// console.log("Grouped Data", groupedTimesheetsData);
				} else {
					console.error("timesheetsResponse is undefined");
				}
			} catch (error) {
				console.error("Error fetching data from Supabase:", error);
			}
		}

		fetchData();
	}, [selectedDate, formattedDate]);

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
					<Grid item xs={7}>
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
									getRowId={(timeEntry) => {
										return (
											(timeEntry.client_name ?? "could not find client") +
											(timeEntry.project_name ?? "could not find project") +
											(timeEntry.job_name ?? "could not find job") +
											(timeEntry.task_name ?? "could not find task")
										);
									}}
									columns={columns}
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
					<Grid item xs={5}>
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
								value={selectedDate}
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
									onChange={handleJobSelect}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
									required
								>
									{jobs.map((job) => (
										<MenuItem key={job.value} value={job.value}>
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
		</Dialog>
	);
};
