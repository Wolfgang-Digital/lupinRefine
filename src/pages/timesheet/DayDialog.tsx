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
import { groupTimesheets } from "./groupTimesheets";

export const DayDialog = ({
	showForm,
	setShowForm,
	selectedDate,

	handleFormSubmit,
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

	handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
		{ field: "name", headerName: "Name", width: 150 },
		{ field: "project", headerName: "Project", width: 120 },
		{ field: "job", headerName: "Job", width: 120 },
		{ field: "task", headerName: "Task", width: 100 },
		{ field: "hours", headerName: "Logged", width: 80 },
		{ field: "remainingHours", headerName: "Left", width: 80 },
	];

	interface TimesheetType {
		client_id: number | null;
		date: string | null;
		hours: number | null;
		time: number | null;
		id: number | null;
		job_id: number | null;
		job_name: string | null;
		year: number | null;
		name: string | null;
		project_name: string | null;
		task_name: string | null;
	}

	interface DayTimesheet {
		client_id: number;
		client_name: string;
		project_name: string;
		task_name: string;
		hours: number;
		time: string;
		jobs: {
			job_name: string;
			tasks: {
				task_name: string;
				time: number;
				hours: number;
			}[];
		}[];
	}

	const [filteredTimesheets, setFilteredTimesheets] = useState<TimesheetType[]>(
		[]
	);
	const [groupedTimesheets, setGroupedTimesheets] = useState<DayTimesheet[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const timesheetsResponse = await getAllTimesheetRowsV2();

				if (timesheetsResponse) {
					const filteredTimesheets = timesheetsResponse.filter(
						(timesheet) => timesheet.user_id === 13 && timesheet.date === "2023-11-01"
					);

					setFilteredTimesheets(filteredTimesheets);

					const groupedTimesheetsData = groupTimesheets(filteredTimesheets);
					setGroupedTimesheets(groupedTimesheetsData);
					console.log("Grouped Data", groupedTimesheetsData);
				} else {
					console.error("timesheetsResponse is undefined");
				}
			} catch (error) {
				console.error("Error fetching data from Supabase:", error);
			}
		}

		fetchData();
	}, []);

	// test to pull in jobs, tasks

	const rowsTEST = groupedTimesheets.flatMap((timesheet) => {
		console.log("timesheetMap", timesheet);

		const jobNames = timesheet.jobs
			.map((job) => {
				console.log("jobMap", job);
				const taskNames = job.tasks
					.map((task) => {
						console.log("taskMap", task);

						return task.task_name;
					})
					.join(", ");

				return `${job.job_name} (${taskNames})`;
			})
			.join(", ");

		return {
			id: timesheet.client_id,
			name: timesheet.client_name,
			project: timesheet.project_name,
			job: jobNames,
			hours: timesheet.hours,
			time: timesheet.time,
		};
	});

	// code adjusted from Paul to get entries

	const rows = groupedTimesheets.map((entry, index) => {
		let totalHours = 0;
		let totalSpentHours = 0;
		const multipleJobEntries = entry.jobs.length > 1;

		if (multipleJobEntries) {
			entry.jobs.forEach((job) => {
				job.tasks.forEach((task) => {
					totalHours += task.hours || 0;
					totalSpentHours += task.time || 0;
				});
			});
		} else {
			entry.jobs.forEach((job) => {
				totalHours += job.tasks.reduce((acc, curr) => acc + (curr.hours || 0), 0);
				totalSpentHours += job.tasks.reduce(
					(acc, curr) => acc + (curr.time || 0),
					0
				);
			});
		}

		const remainingHours = Math.max(0, totalHours - totalSpentHours);

		// Create an object representing a row in your DataGrid
		return {
			id: entry.client_id,
			name: entry.client_name,
			project: entry.project_name,
			job: entry.jobs
				.map((job) => {
					const taskNames = job.tasks.map((task) => task.task_name).join(", ");
					return `${job.job_name} (${taskNames})`;
				})
				.join(", "),
			hours: totalHours,
			remainingHours: remainingHours,
		};
	});

	console.log("ROWS", rows);

	return (
		<Dialog
			open={showForm}
			onClose={() => setShowForm(false)}
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
						Day Selected: {selectedDate}
					</Typography>
					<Button autoFocus color="inherit">
						Save
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
						<DataGrid
							autoHeight
							rows={rows}
							columns={columns}
							style={{ display: "flex", justifyContent: "center" }}
						/>
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
						<form onSubmit={handleFormSubmit}>
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
								type="submit"
								style={{ padding: "10px" }}
								disabled={!selectedTask || !timeSpent}
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
