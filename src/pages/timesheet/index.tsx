import React, { useEffect, useState } from "react";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { startOfWeek, endOfWeek, addWeeks, format, addDays } from "date-fns";
import {
	Grid,
	Paper,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Typography,
	TextField,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Checkbox,
	TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllTimesheetRows } from "@pages/api/timesheetRows";
import { getTaskByJobId } from "@pages/api/tasks";
// get allocated hours for user per month
// import { getUserAllocatedHoursPerMonth } from "@pages/api/allocateHoursView";
// const usersAllocatedHours = getUserAllocatedHoursPerMonth(57, 9);
// console.log(usersAllocatedHours);

import {
	// WeekSelectorContainer,
	WeekButton,
	TimesheetContainer,
} from "@styled-components/timesheet";
// import { getRatesByJobId } from "@pages/api/jobs";
import { PostTimeEntry } from "@pages/api/timesheet";
import styled from "styled-components";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		"& .MuiTableCell-root": {
			border: "1px solid black",
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

type TimeEntry = {
	task: string;
	job: string;
	hours: string;
	date: string;
	notes: string;
};

type JobOption = {
	label: string;
	value: string;
	taskLabel: string;
};

type TaskOption = {
	label: string;
	value: string;
};

type TimesheetEntries = {
	name: string | null;
	hours: number | null;
	job_id: number | null;
	subTasks: [
		{
			task_id: number | null;
			task_name: string | null;
			time: number | null;
			hours: number | null;
		}
	];
};

// const timesheetEntries: {
// 	name: string | null;
// 	hours: number | null;
// 	job_id: number | null;
// 	tasks: { task_id: number | null; task_name: string | null };
// } = [];
type Task = {
	task_id: number;
	task_name: string;
	time: number;
	hours?: number;
};

type Job = {
	job_id: number;
	job_name: string;
	client_name: string;
	tasks: Task[];
};

type GroupedTimesheets = Job[];

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
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

	const [filteredTimesheets, setFilteredTimesheets] =
		useState<GroupedTimesheets>([]);
	const [jobs, setJobs] = useState<JobOption[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]); // Store all tasks
	const [filterOption, setFilterOption] = useState("All Tasks");

	// Create a selected day state
	const [selectedDay, setSelectedDay] = useState<number | null>(null);

	const currentDate = new Date();
	const formattedCurrentDate = format(currentDate, "dd/MM/yy");

	const [selectedDate, setSelectedDate] = useState<string>(formattedCurrentDate);

	const handleDayClick = (index: number) => {
		if (selectedDay === index) {
			// If the clicked day is already selected, deselect it
			setSelectedDay(null);
			setShowForm(false); // Optionally, you can hide the form when deselecting
		} else {
			setSelectedDay(index);
			setShowForm(true); // Show the form when a day is clicked
			setSelectedDate(format(weekDays[index], "dd/MM/yy")); // Update selectedDate
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
			const timesheetsResponse = await getAllTimesheetRows(13);
			console.log({ timesheetsResponse });

			let filteredResponse: typeof timesheetsResponse = [];
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

			const groupedTimesheets = filteredResponse.reduce((acc, curr) => {
				const existingJobEntry = acc.find((entry) => entry.job_id === curr.job_id);

				if (existingJobEntry) {
					const existingTaskEntry = existingJobEntry.tasks.find(
						(task) => task.task_id === curr.task_id
					);

					if (existingTaskEntry) {
						existingTaskEntry.time += curr.time || 0;
					} else {
						existingJobEntry.tasks.push({
							task_id: curr.task_id || 0,
							task_name: curr.task_name || "",
							time: curr.time || 0,
							hours: curr.hours || 0,
						});
					}
				} else {
					acc.push({
						job_id: curr.job_id || 0,
						job_name: curr.job_name || "",
						client_name: curr?.name || "",
						tasks: [
							{
								task_id: curr.task_id || 0,
								task_name: curr.task_name || "",
								time: curr.time || 0,
								hours: curr.hours || 0,
							},
						],
					});
				}

				return acc;
			}, [] as GroupedTimesheets);
			// This code will create an array of objects where each object represents a job,
			// and within each job object, there is an array of tasks.
			// If a task with the same task_id already exists for a job, it will update the time for that task;
			// otherwise, it will create a new task object. If a job with the same job_id already exists,
			// it will add tasks to the existing job; otherwise, it will create a new job object.

			setFilteredTimesheets(groupedTimesheets);
			console.log({ groupedTimesheets });

			const jobOptions: JobOption[] = [];
			const taskOptions: TaskOption[] = [];

			groupedTimesheets.forEach((timesheet) => {
				jobOptions.push({
					label: `${timesheet.client_name} : ${timesheet.job_name}`,
					value: timesheet.job_id?.toString() || "0",
					taskLabel: timesheet.tasks[0].task_name || "",
				});
				taskOptions.push({
					label: timesheet.tasks[0].task_name || "",
					value: timesheet.job_id?.toString() || "0",
				});
			});

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

	const navigateWeeks = (weeks: number) => {
		setSelectedWeekStart(addWeeks(selectedWeekStart, weeks));
	};

	// Create an array of week days
	const weekDays: Date[] = [];
	for (let i = 0; i < 7; i++) {
		weekDays.push(addDays(selectedWeekStart, i));
	}

	// Function to handle "Add Time" button click
	const handleAddTimeClick = () => {
		setShowForm(true);
	};

	// Function to handle form submission
	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const selectedTaskLabel = tasks.find(
			(task) => task.value === selectedTask
		)?.label;

		const selectedJobLabel = jobs.find((job) => job.value === selectedJob)?.label;

		const newTimeEntry: TimeEntry = {
			job: selectedJobLabel || "",
			task: selectedTaskLabel || "",
			hours: parseFloat(timeSpent).toFixed(2),
			date: "01/09/23",
			notes: notes,
		};

		setTimeEntries([...timeEntries, newTimeEntry]);
		setSelectedTask("");
		setSelectedJob("");
		setTimeSpent("");
		setNotes("");
		setShowForm(false);
	};

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

	// Function to handle job selection
	const handleJobSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedJobId = event.target.value as string;
		setSelectedJob(selectedJobId);

		// Filter tasks based on the selected job
		setSelectedTask(""); // Reset the selected task
	};

	useEffect(() => {
		async function fetchTasks() {
			if (selectedJob) {
				const response = await getTaskByJobId(selectedJob);
				if (response) {
					console.log(
						response?.map((task) => ({
							value: task.task_id.toString(),
							label: task.task_name || "",
						}))
					);
					setTasks(
						response?.map((task) => ({
							value: task.task_id.toString(),
							label: task.task_name || "",
						}))
					);
				}
			}
		}
		// fetchRate();
		fetchTasks();
	}, [selectedJob]);

	function saveTimeEntry() {
		const dataToPost = {
			notes,
			timeSpent: Number(timeSpent),
			jobId: Number(selectedJob),
			taskId: Number(selectedTask),
			selectedDate,
			rate: 150,
		};
		const response = PostTimeEntry(dataToPost);
		console.log(`PostTimeEntry ${response}`);
	}

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
					<Grid item xs={8}>
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
									{displayedTimeEntries.map((entry, index) => {
										const totalHours = entry.tasks.reduce(
											(acc, curr) => acc + (curr.hours || 0),
											0
										);
										const totalSpentHours = entry.tasks.reduce(
											(acc, curr) => acc + curr.time,
											0
										);
										console.log(entry);
										const remainingHours = Math.max(0, totalHours - totalSpentHours);
										const isOpened = openedAccordions[entry?.job_id];

										return (
											<React.Fragment key={entry.job_id}>
												<TableRow
													sx={{ backgroundColor: "#ccc", fontWeight: "600" }}
													key={`${index}-1`}
													onClick={() => {
														setOpenedAccordions({
															...openedAccordions,
															[entry.job_id]: !isOpened,
														});
													}}
												>
													<TableRowCell>
														{entry.client_name} :{entry.job_name?.replace(/:/g, ":\n")}
													</TableRowCell>

													<TableRowCell></TableRowCell>
													<TableRowCell></TableRowCell>
													<TableRowCell>{remainingHours}</TableRowCell>
													<TableRowCell></TableRowCell>
													<TableRowCell></TableRowCell>
													<TableRowCell></TableRowCell>
												</TableRow>
												{isOpened && (
													<TableRow key={`${index}-2`}>
														<TableRowCell></TableRowCell>

														<TableRowCell>
															{entry.tasks.map((task) => (
																<div style={{ whiteSpace: "nowrap" }} key={task.task_id}>
																	{task.task_name}
																</div>
															))}
														</TableRowCell>
														<TableRowCell>
															{entry.tasks.map((task) => (
																<div
																	style={{
																		whiteSpace: "nowrap",
																		color: (task.hours || 0) < task.time ? "red" : "green",
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
															{entry.tasks.map((task) => (
																<div key={task.task_id}>
																	{/* <Checkbox size="small" /> */}
																	<input type="checkbox" />
																</div>
															))}
														</TableRowCell>
														<TableRowCell>
															{entry.tasks.map((task) => (
																<div key={task.task_id}>
																	<MoreTimeIcon fontSize="small" onClick={handleAddTimeClick} />
																</div>
															))}
														</TableRowCell>
													</TableRow>
												)}
											</React.Fragment>
										);
									})}
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

					{/* Second column */}
					<Grid item xs={4}>
						<Paper
							variant="outlined"
							style={{ textAlign: "center", padding: "30px" }}
						>
							{showForm ? (
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
										label="Select Job"
										value={selectedJob}
										onChange={handleJobSelect}
										style={{
											width: "100%",
											marginBottom: "20px",
											textAlign: "left",
										}}
										required
									>
										{jobs.map((job) => (
											<MenuItem key={job.value} value={job.value}>
												{job.label}
											</MenuItem>
										))}
									</TextField>
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
							) : (
								<>
									<Button
										variant="contained"
										color="primary"
										onClick={handleAddTimeClick}
										style={{ padding: "10px" }}
									>
										Add Time
									</Button>
									<Typography variant="body1" style={{ padding: "30px" }}>
										Start Tracking Time.
									</Typography>
									<Typography variant="body1" style={{ padding: "20px" }}>
										{`Clicking the Add Time button will create
						New time entries which you'll be able
						to review or edit in your daily view.`}
									</Typography>
								</>
							)}
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Timesheet;
