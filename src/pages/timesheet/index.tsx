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
import { TimesheetRowsView } from "@types";
//  get rows for "Allocated Tasks"
import { getAllTimesheetRows } from "@api/timesheetRows";
// get rows for "All Tasks"
import { getAllJobTasksDemo } from "@pages/api/allTasksDemo";
// get rows for "Wolfgang Tasks"
import { getAllWolfgangTasksDemo } from "@pages/api/wolfgangTasksDemo";

import { getTaskByJobId } from "@pages/api/tasks";

// get allocated hours for user for per month
import { getUserAllocatedHoursPerMonth } from "@pages/api/allocateHoursView";

const usersAllocatedHours = getUserAllocatedHoursPerMonth(57, 9);

console.log(usersAllocatedHours);

import {
	// WeekSelectorContainer,
	WeekButton,
	TimesheetContainer,
} from "@styled-components/timesheet";
// import { getRatesByJobId } from "@pages/api/jobs";
import { PostTimeEntry } from "@pages/api/timesheet";

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

// Create the Timesheet component
const Timesheet = () => {
	// Initialize state variables
	const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	);

	const [showForm, setShowForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
	const [filteredTimesheets, setFilteredTimesheets] = useState<
		TimesheetRowsView[]
	>([]);
	const [jobs, setJobs] = useState<JobOption[]>([]);
	// const [rate, setRate] = useState(0);
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
			const timesheetsResponse = await getAllTimesheetRows();
			let filteredResponse: typeof timesheetsResponse = [];
			if (!timesheetsResponse) {
				throw new Error("Error fetching data");
			}
			if (filterOption === "Wolfgang Tasks") {
				filteredResponse = timesheetsResponse.filter(
					(entry) => entry.client_id === 6
				);
			} else if (filterOption === "Allocated Tasks") {
				filteredResponse = timesheetsResponse.filter(
					(timesheet) => !!timesheet.hours
				);
			} else if (filterOption === "All Tasks") {
				filteredResponse = timesheetsResponse;
			}
			console.log({ filteredResponse });
			const jobOptions: JobOption[] = [];
			const taskOptions: TaskOption[] = [];

			filteredResponse.forEach((timesheet) => {
				jobOptions.push({
					label: `${timesheet.name} : ${timesheet.job_name}`,
					value: timesheet.job_id?.toString() || "0",
					taskLabel: timesheet.task_name || "",
				});
				taskOptions.push({
					label: timesheet.task_name || "",
					value: timesheet.job_id?.toString() || "0",
				});
			});

			setJobs(jobOptions);
			setTasks(taskOptions);
			// group filteredResponse by the job_id and accumulate the hours for each task_id
			console.log(filteredResponse);
			const groupedTimesheets = filteredResponse.reduce((acc, curr) => {
				const existingEntry = acc.find(
					(entry) => entry.job_id === curr.job_id && entry.task_id === curr.task_id
				);
				if (existingEntry) {
					existingEntry.hours = (existingEntry.hours || 0) + (curr.hours || 0);
				} else {
					acc.push({
						...curr,
						hours: curr.hours || 0,
					});
				}
				return acc;
			}, [] as TimesheetRowsView[]);
			setFilteredTimesheets(groupedTimesheets);
		} catch (error) {
			console.error("Error fetching jobs and tasks:", error);
		}
	}
	useEffect(() => {
		fetchTasksAndJobsWithFilter();
	}, []);

	useEffect(() => {
		fetchTasksAndJobsWithFilter();
	}, [filterOption]);

	// Fetch data based on filter option
	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const response = await getAllTimesheetRowsDemo();
	// 			const filteredResponse = [];

	// 			console.log({ response });
	// 			if (filterOption === "Allocated Tasks") {
	// 				response?.filter((entry) => (
	// 					entry.client_id === 6;
	// 				);
	// 			}
	// if (filterOption === "Allocated Tasks") {
	// 	filteredResponse
	// 	}
	// const jobEntries = FilterResponse.map((entry) => ({
	// 	job: `${entry.name}: ${entry.job_name}`,
	// 	task: entry.task_name,
	// 	hours: "0",
	// 	date: "01/09/23",
	// 	nonBillable: false,
	// 	notes: "",
	// })) as TimeEntry[];

	// setTimeEntries(jobEntries);
	//  Render "Allocated Tasks" when selected in Drop Down
	// if (filterOption === "Allocated Tasks") {

	// }
	// Render "All Tasks" when selected in Drop Down
	// else if (filterOption === "All Tasks") {
	// 	// setTimeEntries([]);
	// 	const FilterResponse = await getAllJobTasksDemo();

	// 	console.log({ FilterResponse });
	// 	if (!FilterResponse) {
	// 		throw new Error("Error fetching data");
	// 	}

	// 	const jobEntries = FilterResponse.map((entry) => ({
	// 		job: `${entry.name}: ${entry.job_name}`,
	// 		task: entry.task_name,
	// 		hours: "0",
	// 		date: "01/09/23",
	// 		nonBillable: false,
	// 		notes: "",
	// 	})) as TimeEntry[];
	// 	// Handle other filter options here
	// 	// Clear rows or fetch data as needed for other filter options
	// 	setTimeEntries(jobEntries);
	// }
	// // Render "Wolfgang Tasks" when selected in Drop Down
	// else if (filterOption === "Wolfgang Tasks") {
	// 	// setTimeEntries([]);
	// 	const FilterResponse = await getAllWolfgangTasksDemo();

	// 	if (!FilterResponse) {
	// 		throw new Error("Error fetching data");
	// 	}

	// 	const jobEntries = FilterResponse.map((entry) => ({
	// 		job: `${entry.name}: ${entry.job_name}`,
	// 		task: entry.task_name,
	// 		hours: "0",
	// 		date: "01/09/23",
	// 		nonBillable: false,
	// 		notes: "",
	// 	})) as TimeEntry[];
	// 	// Handle other filter options here
	// 	// Clear rows or fetch data as needed for other filter options
	// 	setTimeEntries(jobEntries);
	// } else {
	// Handle other filter options here
	// Clear rows or fetch data as needed for other filter options
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		}
	// 	}

	// 	fetchData();
	// 	setPagination((previousPagination) => ({
	// 		...previousPagination,
	// 		page: 0,
	// 	}));
	// }, [filterOption]);

	// Function to navigate between weeks
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

	// Update the time sheets based on the current page and rows per page
	const displayedTimesheets = filteredTimesheets.slice(
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
		// async function fetchRate() {
		// 	const response = await getRatesByJobId(selectedJob);
		// 	if (response) {
		// 		setRate(response?.job_rate_value || 0);
		// 	}
		// }
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
		console.log({ response });
	}

	function daysUntilEndOfMonth() {
		// Get the current date
		const currentDate = new Date();

		// Get the last day of the current month
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
					<Grid item xs={7}>
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
							<Table>
								<TableHead>
									<TableRow>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Job
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Task
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Allocated v Used
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Overall Hrs Remaining
										</TableCell>

										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Days Left
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Completed
										</TableCell>
										<TableCell
											style={{
												textAlign: "center",
												fontSize: "smaller", // Reduce the font size
											}}
										>
											Timer
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{displayedTimesheets.map((entry, index) => {
										const remainingHours = Math.max(
											0,
											(entry.hours || 0) - (entry.time || 0)
										);
										const areAllHoursUsed = remainingHours === 0;
										return (
											<TableRow key={index}>
												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														whiteSpace: "pre-line",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													{entry.job_name?.replace(/:/g, ":\n")}
												</TableCell>
												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													{entry.task_name}
												</TableCell>

												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														fontSize: "smaller",
														color: areAllHoursUsed ? "red" : "green",
													}}
												>
													{entry.time} hrs of {entry.hours}
												</TableCell>

												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													{remainingHours}
												</TableCell>

												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													{/** days left till end of this month */}
													{daysUntilEndOfMonth()}
												</TableCell>
												<TableCell
													style={{
														borderRight: "1px solid #ccc",
														textAlign: "center",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													<Checkbox />
												</TableCell>
												<TableCell
													style={{
														cursor: "pointer",
														textAlign: "center",
														fontSize: "smaller", // Reduce the font size
													}}
												>
													<MoreTimeIcon onClick={handleAddTimeClick} />
												</TableCell>
											</TableRow>
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
					<Grid item xs={5}>
						<Paper
							variant="outlined"
							style={{ textAlign: "center", padding: "80px" }}
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
