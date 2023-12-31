import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
import { getMonthlyTimesheetRows } from "@pages/api/timesheetRows";
import { PostTimeEntry } from "@pages/api/timesheet";
import { getProjectbyClientId } from "@pages/api/projects";
import { getJobByProjectId } from "@pages/api/jobs";
import {
	groupMonthlyTimesheets,
	GroupedTimesheets,
	MonthlyGroupedTimesheets,
} from "./groupTimesheets";
import { DayDialog } from "./DayDialog";
import { clientsWithJobsDropdown } from "@pages/api/jobdropdown";
import {
	PostAllocateHoursEntry,
	markAllocationAsCompleted,
	markAllocationAsUncompleted,
} from "@pages/api/allocateHours";
import { getJobAllocatedHoursPerMonthPerUser } from "../api/allocateHoursView";
import { CompleteDialog } from "./CompleteDialog";
import { getProjectJobTaskForDayDialog } from "@pages/api/projectJobTasksView";

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
		fontSize: "small",
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

export type DataToPostAHE = {
	jobTaskId: number;
	month: number;
	year: number;
	userId: string;
	jobId: number;
	taskId: number;
	hours: number;
	rate: number;
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
	// const [selectedJobName, setSelectedJobName] = useState("");
	const [selectedTask, setSelectedTask] = useState("");

	const [filteredTimesheets, setFilteredTimesheets] =
		useState<GroupedTimesheets>([]);
	// TODO: Create one state for each entity list here, eg: entities: { clients: [], projects: [], jobs: [], tasks: []}
	const [clients, setClients] = useState<ClientOption[]>([]);
	const [projects, setProjects] = useState<ProjectOption[]>([]);
	const [jobs, setJobs] = useState<JobOption[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]); // Store all tasks
	const [filterOption, setFilterOption] = useState("All Tasks");
	const [completeDialog, setCompleteDialog] = useState({
		open: false,
		taskId: 0,
		jobId: 0,
	});
	// Create a selected day state
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	const currentDate = new Date();
	const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

	const [selectedDate, setSelectedDate] = useState<string>(formattedCurrentDate);

	const [selectedDayForSelectButton, setSelectedDayForSelectButton] = useState<
		number | null
	>(null);

	const [hoveredDay, setHoveredDay] = useState<number | null>(null);

	const { data: session } = useSession();
	const user_id = session?.user?.id || "";

	const handleDayClick = (index: number) => {
		setSelectedDayForSelectButton(index);
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

	const handleSelectClick = (index: number) => {
		const newSelectedDate = format(weekDays[index], "yyyy-MM-dd");
		setSelectedDate(newSelectedDate);
		setSelectedDayForSelectButton(index);
		// Reset form fields
		setSelectedClient("");
		setSelectedProject("");
		setSelectedJob("");
		setSelectedTask("");
		setTimeSpent("");
		setNotes("");
		// Do not show the form
		setShowForm(false);
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
			const clientsWithJobsResponse = await clientsWithJobsDropdown();
			const month = selectedWeekStart.getMonth() + 1;
			const year = selectedWeekStart.getFullYear();
			const monthlyTimesheetsResponse = await getMonthlyTimesheetRows(year, month);
			let monthlyFilteredResponse: typeof monthlyTimesheetsResponse =
				monthlyTimesheetsResponse;

			if (!monthlyFilteredResponse) {
				throw new Error("Error fetching monthly data");
			}

			if (filterOption === "Wolfgang Tasks") {
				monthlyFilteredResponse =
					monthlyTimesheetsResponse?.filter(
						(entry) => entry.name === "Wolfgang Digital"
					) || undefined;
			} else if (filterOption === "Allocated Tasks") {
				monthlyFilteredResponse =
					monthlyTimesheetsResponse?.filter(
						(entry) => entry.name != "Wolfgang Digital"
					) || undefined;
			}
			if (filterOption !== "Completed Tasks") {
				monthlyFilteredResponse = monthlyFilteredResponse?.filter(
					(entry) => !entry.completed
				);
			}
			if (filterOption === "Completed Tasks") {
				monthlyFilteredResponse = monthlyFilteredResponse?.filter(
					(entry) => entry.completed
				);
			}
			if (monthlyFilteredResponse) {
				const monthlyGroupedTimesheets: MonthlyGroupedTimesheets =
					groupMonthlyTimesheets(monthlyFilteredResponse);
				setFilteredTimesheets(monthlyGroupedTimesheets);
			}

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
				project_id: number | null;
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
			}[];
		},
		project: {
			project_id: number | null;
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
		},
		selectedDate: string
	) => {
		setShowForm(true);
		setTimeSpent("");
		setNotes("");
		const selectedClientId = entry.client_id.toString();
		let selectedProjectId: string = "";
		if (project.project_id) {
			selectedProjectId = project?.project_id.toString();
		}
		const selectedJobId = job.job_id.toString();
		const selectedJobNameId = job.job_name_id.toString();
		const selectedTaskId = task.task_id.toString();
		setSelectedDate(selectedDate);
		setSelectedClient(selectedClientId);
		setSelectedProject(selectedProjectId);
		setSelectedJob(selectedJobNameId);
		setSelectedTask(selectedTaskId);
		setSelectedJobs(selectedJobId);
	};

	// Function to post Data to SupaBase when ADD TIME form is submitted
	async function saveTimeEntry() {
		const splitDate = selectedDate.split("-");
		const monthTest = Number(splitDate[1]);
		const yearTest = Number(splitDate[0]);
		const userId = localStorage.getItem("user_id") || "";
		const projectId = selectedProject;
		const taskId = Number(selectedTask);
		const clientId = selectedClient;
		const clientJobs = (await getJobByProjectId(clientId, projectId)) || [];

		let AHJobId: number = 0;
		if (clientJobs) {
			AHJobId =
				clientJobs.find(
					(clientJob) => clientJob.job_name_id === Number(selectedJob)
				)?.id || 0;
		}
		const allocatedHoursLogged =
			(await getJobAllocatedHoursPerMonthPerUser(
				yearTest,
				monthTest,
				userId,
				AHJobId,
				taskId
			)) || [];
		if (allocatedHoursLogged.length == 0) {
			const dataToPostAHE = {
				jobTaskId: 10,
				month: Number(splitDate[1]),
				year: Number(splitDate[0]),
				userId: localStorage.getItem("user_id") || "",
				jobId: Number(AHJobId),
				taskId: Number(selectedTask),
				hours: 0,
				allocatedRate: 150,
				effectiveRate: 150,
			};
			const response2 = await PostAllocateHoursEntry(dataToPostAHE);
			console.log(`PostAllocateHoursEntry ${response2}`);
		}
		const dataToPostTSE = {
			staffId: user_id || "",
			notes,
			timeSpent: Number(timeSpent),
			projectId: Number(selectedProject),
			jobId: Number(AHJobId),
			taskId: Number(selectedTask),
			selectedDate: selectedDate,
			rate: 0,
			month: Number(splitDate[1]),
			year: Number(splitDate[0]),
		};
		const response = await PostTimeEntry(dataToPostTSE);
		console.log(`PostTimeEntry ${response}`);
		setSelectedClient("");
		setSelectedProject("");
		setSelectedTask("");
		setSelectedJob("");
		setTimeSpent("");
		setNotes("");
		setShowForm(false);
		fetchTasksAndJobsWithFilter();
	}

	// }

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
		// const selectedJobsId = event.target.name as string;
		setSelectedJob(selectedJobId);
		// setSelectedJobs(selectedJobsId);

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
							value: job.job_name_id?.toString() || "",
							label: job.job_name || "",
							taskLabel: job.job_name_id?.toString() || "",
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
				const response = await getProjectJobTaskForDayDialog(
					Number(selectedProject) || 0,
					Number(selectedJob) || 0
				);
				if (response) {
					setTasks(
						response?.map((task) => ({
							value: task.task_id?.toString() || "",
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

	const handleCompleteClick = async (isUncompleting: boolean) => {
		try {
			if (isUncompleting) {
				await markAllocationAsUncompleted({
					job_id: completeDialog.jobId,
					task_id: completeDialog.taskId,
					user_id,
				});
			} else {
				await markAllocationAsCompleted({
					job_id: completeDialog.jobId,
					task_id: completeDialog.taskId,
					user_id,
				});
			}
			setCompleteDialog({ open: false, taskId: 0, jobId: 0 });
			await fetchTasksAndJobsWithFilter(); // Refresh the data
		} catch (error) {
			console.error("Error updating timesheet data:", error);
		}
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

	const classes = useStyles();

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
						<MenuItem value="Completed Tasks">Completed Tasks</MenuItem>
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
								paddingBottom: "30px", // Dynamic padding
							}}
						>
							{weekDays.map((day, index) => (
								<div
									key={day.toISOString()}
									className="day-button-container"
									onMouseEnter={() => setHoveredDay(index)}
									onMouseLeave={() => setHoveredDay(null)}
									style={{ position: "relative" }} // Container style
								>
									<button
										style={{
											border:
												selectedDayForSelectButton === index
													? "1px solid black"
													: "1px solid #ccc",
											borderRadius: "5px",
											textAlign: "center",
											backgroundColor:
												selectedDayForSelectButton === index ? "#02786D" : "white",
											color: selectedDayForSelectButton === index ? "white" : "black",
											width: "50px",
										}}
									>
										<Typography>
											{format(day, "EEE")}
											<br />
											{format(day, "d")}
										</Typography>
									</button>
									{hoveredDay === index && (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												position: "absolute",
												top: "100%", // Adjust to position the container correctly relative to the day button
												left: "-30%",
												backgroundColor: "#fff",
												border: "1px solid #e8e8e8",
												borderRadius: "5px",
												boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
											}}
										>
											<button
												style={{
													backgroundColor: "#02786D",
													color: "#fff",
													border: "none",
													borderRadius: "5px",
													padding: "5px 10px",
													margin: "5px",
													cursor: "pointer",
												}}
												onClick={() => handleSelectClick(index)}
											>
												Select
											</button>
											<button
												style={{
													backgroundColor: "#3a2462",
													color: "#fff",
													border: "none",
													borderRadius: "5px",
													padding: "5px 10px",
													margin: "5px",
													cursor: "pointer",
												}}
												onClick={() => handleDayClick(index)}
											>
												Overview
											</button>
										</div>
									)}
								</div>
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
										<TableCell className={classes.tableHeaderCell}>
											{filterOption === "Completed Tasks" ? "Uncomplete" : "Complete"}
										</TableCell>
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

																								color: "black",
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

																								color: (task.hours || 0) < task.time ? "red" : "green",
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
																							<Button
																								size="small"
																								variant="contained"
																								onClick={() => {
																									if (filterOption !== "Completed Tasks") {
																										setCompleteDialog({
																											open: true,
																											taskId: task.task_id,
																											jobId: job.job_id,
																										});
																									} else {
																										setCompleteDialog({
																											open: true,
																											taskId: task.task_id,
																											jobId: job.job_id,
																										});
																									}
																								}}
																							>
																								{filterOption === "Completed Tasks"
																									? "Uncomplete"
																									: "Complete"}
																							</Button>
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
					<CompleteDialog
						inUncompleting={filterOption === "Completed Tasks"}
						open={completeDialog.open}
						handleClose={() =>
							setCompleteDialog((prev) => ({ ...prev, open: false }))
						}
						handleConfirm={handleCompleteClick}
					/>
				</Grid>
			</div>
		</>
	);
};

export default Timesheet;
import { getServerSidePropsWithAuth } from "@pages/authenticationRedirector";
export const getServerSideProps = getServerSidePropsWithAuth(["admin", "user"]);
