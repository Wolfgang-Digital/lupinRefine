import React, { useEffect, useState } from "react";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import {
	format,
	addDays,
	getDay,
	getDaysInMonth,
	addMonths,
	startOfMonth,
} from "date-fns";
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
	Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllTimesheetRowsV2 } from "@pages/api/timesheetRows";
import { getTaskByJobId } from "@pages/api/tasks";
import { PostTimeEntry } from "@pages/api/timesheet";
import { getProjectbyClientId } from "@pages/api/projects";
import { getJobByProjectId } from "@pages/api/jobs";
import { groupTimesheets, GroupedTimesheets } from "./groupTimesheets";
import { DayDialog } from "./DayDialog";
import { clientsWithJobsDropdown } from "@pages/api/jobdropdown";
import { PostAllocateHoursEntry } from "@pages/api/allocateHours";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		"& .MuiTableCell-root": {
			border: "2px solid black",
		},
	},
	tableHeaderCell: {
		backgroundColor: "#02786d",
		color: "white",
		borderRight: "1px solid black",
		textAlign: "center",
		fontSize: "smaller",
	},
	tableRowCell: {
		borderRight: "1px solid #ccc",
		textAlign: "center",
		whiteSpace: "pre-line",
		fontSize: "smaller",
	},
	flexContainer: {
		display: "flex",
		alignItems: "center",
		paddingBottom: "10px",
	},
	buttonStyle: {
		backgroundColor: "#3a2462",
		color: "white",
		padding: "8px",
		"&:hover": {
			backgroundColor: "#3a2462",
		},
	},
	// Add other styles as needed
});

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
		startOfMonth(new Date())
	);

	const [openedAccordions, setOpenedAccordions] = useState<{
		[key: number]: boolean;
	}>({});
	const [showForm, setShowForm] = useState(false);
	// TODO: Create one state for each selected entity e.g: selectedEntities: { client: "", project: "", job: "", task: ""}
	const [selectedClient, setSelectedClient] = useState("");
	const [selectedProject, setSelectedProject] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const [selectedJobs, setSelectedJobs] = useState("");
	const [selectedTask, setSelectedTask] = useState("");

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
			const clientsWithJobsResponse = await clientsWithJobsDropdown();

			let filteredResponse: typeof timesheetsResponse = [];
			if (!timesheetsResponse) {
				throw new Error("Error fetching data");
			}
			if (filterOption === "Wolfgang Tasks") {
				filteredResponse = timesheetsResponse.filter(
					(entry) => entry.name === "Wolfgang Digital"
				);
			} else if (filterOption === "Allocated Tasks") {
				filteredResponse = timesheetsResponse.filter(
					(entry) => entry.name != "Wolfgang Digital"
				);
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

			clientsWithJobsResponse?.forEach((timesheet) => {
				clientOptions.push({
					label: timesheet.name || "",
					value: timesheet.job_client_id?.toString() || "0",
					projectLabel: timesheet.name || "",
				});
			});

			setClients(clientOptions);
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

	const daysInMonth = getDaysInMonth(selectedWeekStart);

	const weekDays: Date[] = [];
	let getCurrentDate = selectedWeekStart; // Use the existing currentDate variable

	for (let i = 0; i < daysInMonth; i++) {
		const dayOfWeek = getDay(getCurrentDate);
		// Check if it's not Saturday (6) and not Sunday (0)
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			weekDays.push(getCurrentDate);
		}
		getCurrentDate = addDays(getCurrentDate, 1); // Move to the next day
	}

	// Function to handle "Time Icon" button click
	const handleTimeIconClick = (
		entry: {
			client_id: number;
			client_name: string;
			projects: {
				project_id: number;
				project_name: string;
				jobs: {
					job_id: number;
					jobs_id: number;
					job_name: string;
					job_name_id: number;
					tasks: {
						task_id: number;
						task_name: string;
						time: number;
						hours?: number | undefined;
					}[];
				}[];
			}[];
		},
		project: {
			project_id: number;
			project_name: string;
			jobs: {
				job_id: number;
				jobs_id: number;
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
			jobs_id: number;
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
		},
		selectedDate: string
	) => {
		setShowForm(true);
		setTimeSpent("");
		setNotes("");
		const selectedClientId = entry.client_id.toString();
		const selectedProjectId = project.project_id.toString();
		const selectedJobId = job.jobs_id.toString();
		const selectedJobsId = job.jobs_id.toString();
		const selectedTaskId = task.task_id.toString();
		setSelectedDate(selectedDate);
		setSelectedClient(selectedClientId);
		setSelectedProject(selectedProjectId);
		setSelectedJob(selectedJobId);
		setSelectedTask(selectedTaskId);
		setSelectedJobs(selectedJobsId);
	};

	// Function to post Data to SupaBase when ADD TIME form is submitted
	async function saveTimeEntry() {
		const dataToPostTSE = {
			staffId: localStorage.getItem("user_id") || "",
			notes,
			timeSpent: Number(timeSpent),
			projectId: Number(selectedProject),
			jobId: 3565,
			jobsId: Number(selectedJob),
			taskId: Number(selectedTask),
			selectedDate: selectedDate,
			rate: 0,
		};
		const dataToPostAHE = {
			jobTaskId: 10,
			month: currentDate.getMonth() + 1,
			year: Number(currentDate.getFullYear()),
			userId: localStorage.getItem("user_id") || "",
			jobId: Number(selectedJob),
			taskId: Number(selectedTask),
			hours: -1,
			rate: 0,
		};
		const response = await PostTimeEntry(dataToPostTSE);
		const response2 = await PostAllocateHoursEntry(dataToPostAHE);
		console.log(`PostTimeEntry ${response}`);
		console.log(`PostAllocateHoursEntry ${response2}`);
		// console.log({ dataToPostTSE });
		// console.log({ dataToPostAHE });
		setSelectedClient("");
		setSelectedProject("");
		setSelectedTask("");
		setSelectedJob("");
		setTimeSpent("");
		setNotes("");
		setShowForm(false);
		setShowForm(false);
		fetchTasksAndJobsWithFilter();
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
		setSelectedJob("");
	};

	// Function to handle job selection
	const handleJobSelect = (
		event: React.ChangeEvent<{ value: unknown; name: unknown }>
	) => {
		const selectedJobId = event.target.value as string;
		const selectedJobsId = event.target.name as string;
		setSelectedJob(selectedJobId);
		setSelectedJobs(selectedJobsId);

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
				const response = await getJobByProjectId(selectedClient, selectedProject);

				if (response) {
					setJobs(
						response?.map((job) => ({
							value: job.id?.toString() || "",
							label: job.job_name || "",
							taskLabel: job.id.toString(),
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

	const updateTimesheet = async () => {
		try {
			// If you have a loading state, set it to true
			// setLoading(true);

			await fetchTasksAndJobsWithFilter(); // Refresh the data

			// If you have a loading state, set it to false
			// setLoading(false);
		} catch (error) {
			console.error("Error updating timesheet data:", error);
			// Handle any errors
			// Reset the loading state if you have one
			// setLoading(false);
		}
	};

	return (
		<>
			<div className={classes.flexContainer}>
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
						{/*<MenuItem value="Completed Tasks">Completed Tasks</MenuItem>*/}
					</Select>
				</FormControl>
			</div>

			<div>
				<Grid container spacing={2}>
					{/* First column */}
					<Grid item xs={12}>
						<div
							style={{
								margin: "20px 0px",
								display: "flex",
								alignItems: "center",
								paddingBottom: "10px",
							}}
						>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#3a2462",
									color: "white",
									padding: "8px",
								}}
								onClick={() => setSelectedWeekStart(addMonths(selectedWeekStart, -1))}
							>
								Previous Month
							</Button>
							<Typography
								style={{
									marginLeft: "20px",
									marginRight: "20px",
								}}
							>
								{format(selectedWeekStart, "MMM yyyy")}
							</Typography>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#3a2462",
									color: "white",
									padding: "8px",
								}}
								onClick={() => setSelectedWeekStart(addMonths(selectedWeekStart, 1))}
							>
								Next Month
							</Button>
						</div>

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
										borderRadius: "5px",
										textAlign: "center",
										cursor: "pointer",
										backgroundColor: selectedDay === index ? "#3A2462" : "white",
										color: selectedDay === index ? "white" : "black",
										width: "60px",
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
										<TableCell className={classes.tableHeaderCell}>Client</TableCell>
										<TableCell className={classes.tableHeaderCell}>Project</TableCell>
										<TableCell className={classes.tableHeaderCell}>Job</TableCell>
										<TableCell className={classes.tableHeaderCell}>Task</TableCell>
										<TableCell className={classes.tableHeaderCell}>
											Used V Allocated
										</TableCell>
										<TableCell className={classes.tableHeaderCell}>
											Overall Hrs Remaining
										</TableCell>
										<TableCell className={classes.tableHeaderCell}>Days Left</TableCell>
										<TableCell className={classes.tableHeaderCell}>Completed</TableCell>
										<TableCell className={classes.tableHeaderCell}>Timer</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										displayedTimeEntries.map((entry, index) => {
											let totalHours: number = 0;
											let totalSpentHours: number = 0;
											const multipleProjectEntries = entry.projects.length > 1;
											if (multipleProjectEntries) {
												entry.projects.map((project) => {
													const multipleJobEntries = project.jobs.length > 1;
													if (multipleJobEntries) {
														project.jobs.map((job) => {
															job.tasks.map((task) => {
																if (task.hours) {
																	if (task.hours < 0) {
																		totalHours = 0;
																		totalSpentHours += task.time || 0;
																	} else {
																		totalHours += task.hours || 0;
																		totalSpentHours += task.time || 0;
																	}
																}
															});
														});
													} else {
														project.jobs.map((job) => {
															let jobTotalHours: number = 0;
															let jobTotalSpentHours: number = 0;
															jobTotalHours = job.tasks.reduce(
																(acc, curr) => (acc += curr.hours || 0),
																0
															);
															jobTotalSpentHours = job.tasks.reduce(
																(acc, curr) => acc + curr.time,
																0
															);
															totalHours += jobTotalHours || 0;
															totalSpentHours += jobTotalSpentHours || 0;
														});
													}
												});
											} else {
												entry.projects.map((project) => {
													project.jobs.map((job) => {
														totalHours = job.tasks.reduce(
															(acc, curr) => (acc += curr.hours || 0),
															0
														);
														totalSpentHours = job.tasks.reduce(
															(acc, curr) => acc + curr.time,
															0
														);
													});
												});
											}
											const remainingHours = Math.max(totalHours - totalSpentHours);
											const isOpened = openedAccordions[entry?.client_id];
											return (
												<React.Fragment key={entry.client_id}>
													<TableRow
														sx={{
															backgroundColor: "#e8e8e8",
															fontWeight: "600 !important",
															cursor: "pointer",
														}}
														key={`${index}-1`}
														onClick={() => {
															setOpenedAccordions({
																...openedAccordions,
																[entry.client_id]: !isOpened,
															});
														}}
													>
														<TableCell
															sx={{ fontWeight: "600" }}
															className={classes.tableRowCell}
														>
															{entry.client_name}

														</TableCell>
														{/* <TableRowCell colSpan={4}></TableRowCell> */}
														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell
															className={classes.tableRowCell}
															sx={{
																fontWeight: "600",
															}}
														>
															{remainingHours}
														</TableCell>

														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell className={classes.tableRowCell}></TableCell>
														<TableCell className={classes.tableRowCell}></TableCell>
													</TableRow>
													<>
														{entry.projects.map((project) =>
															project.jobs.map((job) => (
																<>
																	{isOpened && (
																		<TableRow key={`${index - 2}`}>
																			<>
																				<TableCell className={classes.tableRowCell}></TableCell>
																				<TableCell className={classes.tableRowCell}>
																					{project.project_name}
																				</TableCell>
																				<TableCell className={classes.tableRowCell}>
																					<TableRow key={`${index - 3}`}>
																						<div style={{ whiteSpace: "nowrap" }} key={job.job_id}>
																							{job.job_name}
																						</div>
																					</TableRow>
																				</TableCell>
																				<TableCell className={classes.tableRowCell}>
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
																				</TableCell>
																				<TableCell className={classes.tableRowCell}>
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
																				</TableCell>
																				<TableCell className={classes.tableRowCell}></TableCell>
																				<TableCell className={classes.tableRowCell}>
																					{daysUntilEndOfMonth()}
																				</TableCell>
																				<TableCell className={classes.tableRowCell}>
																					{job.tasks.map((task) => (
																						<div key={task.task_id} style={{ padding: "2px" }}>
																							<input
																								style={{ cursor: "pointer" }}
																								type="checkbox"
																								onChange={() => handleCheckboxChange(task.task_id)}
																								checked={taskStates[task.task_id] || false}
																							/>
																						</div>
																					))}
																				</TableCell>
																				<TableCell className={classes.tableRowCell}>
																					{job.tasks.map((task) => (
																						<div key={task.task_id}>
																							<MoreTimeIcon
																								style={{ cursor: "pointer" }}
																								fontSize="small"
																								onClick={
																									() =>
																										handleTimeIconClick(
																											entry,
																											project,
																											job,
																											task,
																											selectedDate
																										) // Pass the selectedDate here
																								}
																							/>
																						</div>
																					))}
																				</TableCell>
																			</>
																		</TableRow>
																	)}
																	{/* isOpen */}
																</>
															))
														)}
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
						selectedJobs={selectedJobs}
						jobs={jobs}
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
						tasks={tasks}
						timeSpent={timeSpent}
						setTimeSpent={setTimeSpent}
						notes={notes}
						setNotes={setNotes}
						saveTimeEntry={saveTimeEntry}
						onUpdateTimesheet={updateTimesheet}
					/>
				</Grid>
			</div>
		</>
	);
};

export default Timesheet;
