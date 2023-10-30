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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
	ClientOption,
	TaskOption,
	JobOption,
	ProjectOption,
} from "./index.page";

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
	const rows = [
		{
			id: 1,
			client: "Actavo",
			project: "Google Ads",
			job: "Implentation",
			task: "Opt",
			hoursLogged: "2hrs",
			hoursLeft: "2hrs",
		},
		{
			id: 2,
			client: "Actavo",
			project: "Google Ads",
			job: "Monthly Management",
			task: "Reporting",
			hoursLogged: "2hrs",
			hoursLeft: "1hrs",
		},

		{
			id: 3,
			client: "Allcare Management Services Ltd",
			project: "Google Ads",
			job: "Implementation",
			task: "Opt",
			hoursLogged: "1hrs",
			hoursLeft: "2hrs",
		},
		// Add more rows with three columns as needed
	];

	// const rows: TimesheetRowsView[] = [
	// 	{
	// 		id: 1,
	// 		name: "Actavo",
	// 		project_name: "Google Ads",
	// 		job_name: "Implentation",
	// 		task_name: "Opt",
	// 		hours: 2,
	// 		time: 2,
	// 	},

	// 	// Add more rows with three columns as needed
	// ] as unknown as TimesheetRowsView[];

	// fetch the timesheet rows again here, filter by the day, maybe create a new query to only filter by date, and use groupTimesheets to get the rows into your desired schema

	const columns = [
		{
			field: "client",
			headerName: "Client",
			flex: 0.7,
		},
		{
			field: "project",
			headerName: "Project",
			flex: 0.5,
		},
		{
			field: "job",
			headerName: "Job",
			flex: 0.5,
		},
		{
			field: "task",
			headerName: "Task",
			flex: 0.5,
		},
		{
			field: "hoursLogged",
			headerName: "Used",
			flex: 0.3,
		},
		{
			field: "hoursLeft",
			headerName: "Left",
			flex: 0.3,
		},
	];
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
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{selectedDate}
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
					<Grid item xs={12}>
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
					<Grid item xs={12}>
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
