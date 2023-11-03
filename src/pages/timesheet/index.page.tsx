import React, { useEffect, useState } from "react";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { startOfWeek, endOfWeek, addWeeks, format, addDays } from "date-fns";
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Typography,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllTimesheetRowsV2 } from "@pages/api/timesheetRows";
import { getTaskByJobId } from "@pages/api/tasks";
import { WeekButton, TimesheetContainer } from "@styled-components/timesheet";
import { PostTimeEntry } from "@pages/api/timesheet";
import styled from "styled-components";
import { getProjectbyClientId } from "@pages/api/projects";
import { getJobByProjectId } from "@pages/api/jobs";
import { groupTimesheets, GroupedTimesheets } from "./groupTimesheets";
import { DayDialog } from "./DayDialog";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		"& .MuiTableCell-root": {
			border: "2px solid black",
		},
	},
});

const TableHeaderCell = styled(TableCell)`
	background-color: #02786d;
	color: white;
	border-right: 1px solid black;
	text-align: center;
	font-size: smaller;
`;

const TableRowCell = styled(TableCell)`
	border-right: 1px solid #ccc;
	text-align: center;
	white-space: pre-line;
	font-size: smaller;
`;

interface TaskState {
	[taskId: number]: boolean;
}

export type TimeEntry = {
	task: string;
	job: string;
	hours: string;
	date: string;
	notes: string;
	completed: boolean;
};

export type ClientOption = {
	label: string;
	value: string;
	projectLabel: string;
};
export type ProjectOption = {
	label: string;
	value: string;
	// jobLabel: string;
};

export type JobOption = {
	label: string;
	value: string;
	taskLabel: string;
};

export type TaskOption = {
	label: string;
	value: string;
	completed: boolean;
};

// Create the Timesheet component
const Timesheet = () => {
	// Initialize state variables
	const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	);

	const [openedAccordions, setOpenedAccordions] = useState<{
		[key: number]: boolean;
	}>({});
	const [showForm, setShowForm] = useState(false);
	// TODO: Create one state for each selected entity e.g: selectedEntities: { client: "", project: "", job: "", task: ""}
	const [selectedClient, setSelectedClient] = useState("");
	const [selectedProject, setSelectedProject] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const [selectedTask, setSelectedTask] = useState("");
	// const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

	const [filteredTimesheets, setFilteredTimesheets] =
		useState<GroupedTimesheets>([]);
	// TODO: Create one state for each entity list here, eg: entities: { clients: [], projects: [], jobs: [], tasks: []}
	const [clients, setClients] = useState<ClientOption[]>([]);
	const [projects, setProjects] = useState<ProjectOption[]>([]);
	const [jobs, setJobs] = useState<JobOption[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]); // Store all tasks
	const [filterOption, setFilterOption] = useState("All Tasks");

	// Create a selected day state
	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const currentDate = new Date();
	const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
	const sbCurrentDate = format(currentDate, "yyyy-MM-dd");

	const [selectedDate, setSelectedDate] = useState<string>(formattedCurrentDate);

	const handleDayClick = (index: number) => {
		setSelectedClient("");
		setSelectedProject("");
		setSelectedJob("");
		setSelectedTask("");
		setTimeSpent("");
		setNotes("");
		if (selectedDay === index) {
			// If the clicked day is already selected, deselect it
			setSelectedDay(null);
			setShowForm(false); // Optionally, you can hide the form when deselecting
		} else {
			setSelectedDay(index);
			setShowForm(true); // Show the form when a day is clicked
			setSelectedDate(format(weekDays[index], "yyyy-MM-dd")); // Update selectedDate
		}
	};

	// Initialize notes and timeSpent states
	const [notes, setNotes] = useState("");
	const [timeSpent, setTimeSpent] = useState("");

	// Initialize pagination state
	const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5 });
	const { page, rowsPerPage } = pagination;

	// Fetch tasks and jobs data
	async function fetchTasksAndJobsWithFilter() {
		try {
			const timesheetsResponse = await getAllTimesheetRowsV2();
			console.log({ timesheetsResponse });
			let filteredResponse: typeof timesheetsResponse = [];
			// console.log(timesheetsResponse);
			if (!timesheetsResponse) {
				throw new Error("Error fetching data");
			}
			if (filterOption === "Wolfgang Tasks") {
				filteredResponse = timesheetsResponse.filter(
					(entry) => entry.name === "Wolfgang Digital"
				);
			} else if (filterOption === "Allocated Tasks") {
				filteredResponse = timesheetsResponse
					.filter((entry) => entry.name != "Wolfgang Digital")
					.filter((timesheet) => !!timesheet.time);
			} else if (filterOption === "All Tasks") {
				filteredResponse = timesheetsResponse;
			}
			filteredResponse = filteredResponse.filter(({ date }) => {
				const dateObj = new Date(date || new Date());
				return (
					dateObj.getMonth() === selectedWeekStart.getMonth() &&
					dateObj.getFullYear() === selectedWeekStart.getFullYear()
				);
			});

			const groupedTimesheets: GroupedTimesheets =
				groupTimesheets(filteredResponse);
			setFilteredTimesheets(groupedTimesheets);

			// Create one option object e.g options = { client: [], project: [], job: [], task: []}
			const clientOptions: ClientOption[] = [];
			const projectOptions: ProjectOption[] = [];
			const jobOptions: JobOption[] = [];
			const taskOptions: TaskOption[] = [];

			groupedTimesheets.forEach((timesheet) => {
				clientOptions.push({
					label: timesheet.client_name,
					value: timesheet.client_id?.toString() || "0",
					projectLabel: timesheet.project_name || "",
				});
				projectOptions.push({
					label: timesheet.project_name,
					value: timesheet.project_id?.toString() || "0",
				});
				timesheet.jobs.forEach((job) => {
					jobOptions.push({
						label: `${job.job_name}`,
						value: job.job_id?.toString() || "0",
						taskLabel: job.tasks[0].task_name || "",
					});
					taskOptions.push({
						label: job.tasks[0].task_name || "",
						value: job.job_id?.toString() || "0",
						completed: false,
					});
				});
			});

			setClients(clientOptions);
			setProjects(projectOptions);
			setJobs(jobOptions);
			setTasks(taskOptions);
		} catch (error) {
			console.error("Error fetching jobs and tasks: ", error);
		}
	}

	useEffect(() => {
		fetchTasksAndJobsWithFilter();
	}, []);
	useEffect(() => {
		fetchTasksAndJobsWithFilter();
	}, [filterOption, selectedWeekStart]);
	// useEffect(() => {
	// 	console.log("Hello World");
	// 	fetchTasksAndJobsWithFilter();
	// }, [PostTimeEntry]);

	const navigateWeeks = (weeks: number) => {
		setSelectedWeekStart(addWeeks(selectedWeekStart, weeks));
	};

	// Create an array of week days
	const weekDays: Date[] = [];
	for (let i = 0; i < 7; i++) {
		weekDays.push(addDays(selectedWeekStart, i));
	}

	// Function to handle "Add Time" button click
	// const handleAddTimeClick = () => {
	// 	setSelectedClient("");
	// 	setSelectedProject("");
	// 	setSelectedJob("");
	// 	setSelectedTask("");
	// 	setTimeSpent("");
	// 	setNotes("");
	// 	setShowForm(true);
	// };

	// Function to handle "Time Icon" button click
	const handleTimeIconClick = (
		entry: {
			client_id: number;
			client_name: string;
			project_id: number;
			project_name: string;
			jobs: {
				job_id: number;
				job_name: string;
				job_name_id: number;
				tasks: {
					task_id: number;
					task_name: string;
					time: number;
					hours?: number | undefined;
				}[];
			}[];
		},
		job: {
			job_id: number;
			job_name: string;
			job_name_id: number;
			tasks: {
				task_id: number;
				task_name: string;
				time: number;
				hours?: number | undefined;
			}[];
		},
		task: {
			task_id: number;
			task_name: string;
			time: number;
			hours?: number | undefined;
		}
	) => {
		setShowForm(true);
		setTimeSpent("");
		setNotes("");
		const selectedClientId = entry.client_id.toString();
		const selectedProjectId = entry.project_id.toString();
		const selectedJobId = job.job_id.toString();
		const selectedTaskId = task.task_id.toString();
		setSelectedDate(sbCurrentDate);
		setSelectedClient(selectedClientId);
		setSelectedProject(selectedProjectId);
		setSelectedJob(selectedJobId);
		setSelectedTask(selectedTaskId);
	};

	// Function to post Data to SupaBase when ADD TIME form is submitted
	function saveTimeEntry() {
		const dataToPost = {
			staffId: 13,
			notes,
			timeSpent: Number(timeSpent),
			projectId: Number(selectedProject),
			jobId: Number(selectedJob),
			taskId: Number(selectedTask),
			selectedDate: selectedDate,
			rate: 150,
		};
		// const parts = selectedDate.split('-');
		const response = PostTimeEntry(dataToPost);
		console.log(`PostTimeEntry ${response}`);
		setSelectedClient("");
		setSelectedProject("");
		setSelectedTask("");
		setSelectedJob("");
		setTimeSpent("");
		setNotes("");
		setShowForm(false);
		setShowForm(false);
		// fetchTasksAndJobsWithFilter();
	}

	// Update the TimeEntries based on the current page and rows per page
	const displayedTimeEntries = filteredTimesheets.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	// Function to handle page change
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPagination((previousPagination) => ({
			...previousPagination,
			page: newPage,
		}));
	};

	// Function to handle rows per page change
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setPagination({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
	};

	// Function to handle client selection
	const handleClientSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedClientId = event.target.value as string;
		setSelectedClient(selectedClientId);

		// Filter projects based on the selected client;
		setSelectedProject("");
	};

	const handleProjectSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedProjectId = event.target.value as string;
		setSelectedProject(selectedProjectId);
		// console.log(selectedProjectId);
		setSelectedJob("");
	};

	// Function to handle job selection
	const handleJobSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedJobId = event.target.value as string;
		setSelectedJob(selectedJobId);

		// Filter tasks based on the selected job
		setSelectedTask(""); // Reset the selected task
	};

	useEffect(() => {
		async function fetchProjects() {
			if (selectedClient) {
				const response = await getProjectbyClientId(selectedClient);
				if (response) {
					setProjects(
						response?.map((project) => ({
							value: project.project_id.toString(),
							label: project.project_name || "",
						}))
					);
				}
			}
		}
		fetchProjects();
	}, [selectedClient]);

	useEffect(() => {
		async function fetchJobs() {
			if (selectedProject) {
				// console.log(selectedProject);
				const response = await getJobByProjectId(selectedClient, selectedProject);

				if (response) {
					setJobs(
						response?.map((job) => ({
							value: job.job_id?.toString() || "",
							label: job.job_name || "",
							taskLabel: job.job_id.toString(),
						}))
					);
				}
			}
		}
		fetchJobs();
	}, [selectedProject]);

	useEffect(() => {
		async function fetchTasks() {
			if (selectedJob) {
				// console.log(`selectedJob: ${selectedJob}`);
				const response = await getTaskByJobId(selectedJob);
				if (response) {
					setTasks(
						response?.map((task) => ({
							value: task.task_id.toString(),
							label: task.task_name || "",
							completed: false,
						}))
					);
				}
			}
		}
		fetchTasks();
	}, [selectedJob]);

	function daysUntilEndOfMonth() {
		// Get the current date
		const currentDate = new Date();

		//Get the last day of the current month
		const lastDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() + 1,
			0
		);

		// Calculate the difference in days
		const timeDifference = lastDayOfMonth.getTime() - currentDate.getTime();
		const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

		return daysDifference;
	}
	const classes = useStyles();

	const [taskStates, setTaskStates] = useState<TaskState>({});

	const handleCheckboxChange = (taskId: number) => {
		setTaskStates((prevState) => ({
			...prevState,
			[taskId]: !prevState[taskId] || false,
		}));
	};
	return (
		<>
			<TimesheetContainer>
				<h2 style={{ marginRight: "20px" }}>My Timesheet</h2>
				<FormControl variant="outlined">
					<InputLabel id="filter-label">Filter</InputLabel>
					<Select
						labelId="filter-label"
						label="Filter"
						value={filterOption}
						onChange={(event) => setFilterOption(event.target.value as string)}
					>
						<MenuItem value="Allocated Tasks">Allocated Tasks</MenuItem>
						<MenuItem value="All Tasks">All Tasks</MenuItem>
						<MenuItem value="Wolfgang Tasks">Wolfgang Tasks</MenuItem>
					</Select>
				</FormControl>
			</TimesheetContainer>

			<div>
				<Grid container spacing={2}>
					{/* First column */}
					<Grid item xs={12}>
						<TimesheetContainer
							style={{
								display: "flex",
								margin: "20px 0px",
							}}
						>
							<WeekButton
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(-1)}
							>
								Previous Week
							</WeekButton>
							<Typography
								style={{
									marginLeft: "20px",
									marginRight: "20px",
								}}
							>
								{format(selectedWeekStart, "MMM d")} -{" "}
								{format(
									endOfWeek(addWeeks(selectedWeekStart, 0), {
										weekStartsOn: 1,
									}),
									"MMM d"
								)}
							</Typography>
							<WeekButton
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(1)}
							>
								Next Week
							</WeekButton>
						</TimesheetContainer>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingBottom: "10px",
							}}
						>
							{weekDays.map((day, index) => (
								<button
									key={day.toISOString()}
									style={{
										border: "1px solid #ccc",
										paddingLeft: "20px",
										paddingRight: "20px",
										paddingTop: "5px",
										paddingBottom: "5px",
										borderRadius: "5px",
										textAlign: "center",
										cursor: "pointer",
										backgroundColor: selectedDay === index ? "#3A2462" : "white",
										color: selectedDay === index ? "white" : "black",
									}}
									onClick={() => handleDayClick(index)}
								>
									<Typography>
										{format(day, "EEE")}
										<br />
										{format(day, "d")}
									</Typography>
								</button>
							))}
						</div>
						<TableContainer component={Paper} variant="outlined">
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableHeaderCell>Client</TableHeaderCell>
										<TableHeaderCell>Project</TableHeaderCell>
										<TableHeaderCell>Job</TableHeaderCell>
										<TableHeaderCell>Task</TableHeaderCell>
										<TableHeaderCell>Used V Allocated</TableHeaderCell>
										<TableHeaderCell>Overall Hrs Remaining</TableHeaderCell>
										<TableHeaderCell>Days Left</TableHeaderCell>
										<TableHeaderCell>Completed</TableHeaderCell>
										<TableHeaderCell>Timer</TableHeaderCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										displayedTimeEntries.map((entry, index) => {
											let totalHours: number = 0;
											let totalSpentHours: number = 0;
											const multipleJobEntries = entry.jobs.length > 1;
											if (multipleJobEntries) {
												entry.jobs.map((job) => {
													job.tasks.map((task) => {
														totalHours += task.hours || 0;
														totalSpentHours += task.time || 0;
													});
												});
											} else {
												entry.jobs.map((job) => {
													totalHours = job.tasks.reduce(
														(acc, curr) => (acc += curr.hours || 0),
														0
													);
													totalSpentHours = job.tasks.reduce(
														(acc, curr) => acc + curr.time,
														0
													);
												});
											}
											const remainingHours = Math.max(0, totalHours - totalSpentHours);
											const isOpened = openedAccordions[entry?.client_id];
											return (
												<React.Fragment key={entry.client_id}>
													<TableRow
														sx={{ backgroundColor: "#ddd", fontWeight: "600 !important" }}
														key={`${index}-1`}
														onClick={() => {
															setOpenedAccordions({
																...openedAccordions,
																[entry.client_id]: !isOpened,
															});
														}}
													>
														<TableRowCell sx={{ fontWeight: "600" }}>
															{entry.client_name}
														</TableRowCell>
														{/* <TableRowCell colSpan={4}></TableRowCell> */}
														<TableRowCell></TableRowCell>
														<TableRowCell></TableRowCell>
														<TableRowCell></TableRowCell>
														<TableRowCell></TableRowCell>
														<TableRowCell sx={{ fontWeight: "600" }}>
															{remainingHours}
														</TableRowCell>
														<TableRowCell></TableRowCell>
														<TableRowCell></TableRowCell>
														<TableRowCell></TableRowCell>
													</TableRow>
													<>
														{entry.jobs.map((job) => (
															<>
																{isOpened && (
																	<TableRow key={`${index}-2`}>
																		<>
																			<TableRowCell></TableRowCell>
																			<TableRowCell>{entry.project_name}</TableRowCell>
																			<TableRowCell>
																				<TableRow key={`${index - 3}`}>
																					<div style={{ whiteSpace: "nowrap" }} key={job.job_id}>
																						{job.job_name}
																					</div>
																				</TableRow>
																			</TableRowCell>
																			<TableRowCell>
																				{job.tasks.map((task) => (
																					<div
																						style={{
																							whiteSpace: "nowrap",
																							padding: "2px",
																							textDecoration: taskStates[task.task_id]
																								? "line-through"
																								: "none",
																							color: taskStates[task.task_id] ? "grey" : "black",
																						}}
																						key={task.task_id}
																					>
																						{task.task_name}
																					</div>
																				))}
																			</TableRowCell>
																			<TableRowCell>
																				{job.tasks.map((task) => (
																					<div
																						style={{
																							whiteSpace: "nowrap",
																							padding: "2px",
																							textDecoration: taskStates[task.task_id]
																								? "line-through"
																								: "none",
																							color:
																								(task.hours || 0) < task.time &&
																								!taskStates[task.task_id]
																									? "red"
																									: !taskStates[task.task_id]
																									? "green"
																									: "grey",
																						}}
																						key={task.task_id}
																					>
																						{task.time} hrs of {task.hours}
																					</div>
																				))}
																			</TableRowCell>
																			<TableRowCell></TableRowCell>
																			<TableRowCell>{daysUntilEndOfMonth()}</TableRowCell>
																			<TableRowCell>
																				{job.tasks.map((task) => (
																					<div key={task.task_id} style={{ padding: "2px" }}>
																						{/* <Checkbox size="small" /> */}
																						<input
																							type="checkbox"
																							onChange={() => handleCheckboxChange(task.task_id)}
																							checked={taskStates[task.task_id] || false}
																						/>
																					</div>
																				))}
																			</TableRowCell>
																			<TableRowCell>
																				{job.tasks.map((task) => (
																					<div key={task.task_id}>
																						<MoreTimeIcon
																							fontSize="small"
																							onClick={() => handleTimeIconClick(entry, job, task)}
																						/>
																					</div>
																				))}
																			</TableRowCell>
																		</>
																	</TableRow>
																)}
																{/* isOpen */}
															</>
														))}
													</>
												</React.Fragment>
											);
											// return
										})
										// displayedTimeEntries.map
									}
								</TableBody>
							</Table>
						</TableContainer>

						{/* Add TablePagination component for pagination */}
						<TablePagination
							rowsPerPageOptions={[2, 5, 10]}
							component="div"
							count={filteredTimesheets.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Grid>

					<DayDialog
						showForm={showForm}
						setShowForm={setShowForm}
						selectedDate={selectedDate}
						selectedClient={selectedClient}
						handleClientSelect={handleClientSelect}
						clients={clients}
						selectedProject={selectedProject}
						handleProjectSelect={handleProjectSelect}
						projects={projects}
						selectedJob={selectedJob}
						handleJobSelect={handleJobSelect}
						jobs={jobs}
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
						tasks={tasks}
						timeSpent={timeSpent}
						setTimeSpent={setTimeSpent}
						notes={notes}
						setNotes={setNotes}
						saveTimeEntry={saveTimeEntry}
					/>
				</Grid>
			</div>
		</>
	);
};

export default Timesheet;
