import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	Button,
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
	TablePagination, // Import TablePagination
} from "@mui/material";
import React, { useEffect, useState } from "react";
import supabase from "../../config/supaBaseClient";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { startOfWeek, endOfWeek, addWeeks, format, addDays } from "date-fns";
import { getJobsDropdown } from "@pages/api/timesheet";
import { getAllTasks } from "@pages/api/tasks";
import {
	ButtonContainer,
	TimesheetContainer,
	PreviousWeekButton,
	NextWeekButton,
} from "./StyledComponents";

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
	const [jobs, setJobs] = useState<JobOption[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
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
	useEffect(() => {
		async function fetchTasksAndJobs() {
			try {
				const jobsResponse = await getJobsDropdown();
				const tasksResponse = await getAllTasks();

				if (!jobsResponse || !tasksResponse) {
					throw new Error("Error fetching data");
				}

				const jobOptions = jobsResponse.map((job) => ({
					label: `${job.client_name} : ${job.job_name}`,
					value: job.job_id?.toString() || "0",
				}));

				const taskOptions = tasksResponse.map((task) => ({
					label: task.task_name || "No Task Found",
					value: task.task_id.toString() || "0",
				}));

				setJobs(jobOptions);
				setTasks(taskOptions);
			} catch (error) {
				console.error("Error fetching jobs and tasks:", error);
			}
		}

		fetchTasksAndJobs();
	}, []);

	// Fetch data based on filter option
	useEffect(() => {
		async function fetchData() {
			try {
				if (filterOption === "All Tasks") {
					const response = await supabase
						.from("timesheet_jobsresponse_dropdown")
						.select("client_name, job_name");

					if (response.error) {
						throw new Error("Error fetching data");
					}

					const jobEntries = response.data.map((entry) => ({
						job: `${entry.client_name}: ${entry.job_name}`,
						task: "Opt",
						hours: "0",
						date: "01/09/23",
						nonBillable: false,
						notes: "",
					})) as TimeEntry[];

					setTimeEntries(jobEntries);
				} else {
					// Handle other filter options here
					// Clear rows or fetch data as needed for other filter options
					setTimeEntries([]); // Clear rows for other options
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		fetchData();
		setPagination((previousPagination) => ({
			...previousPagination,
			page: 0,
		}));
	}, [filterOption]);

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

	// Update the TimeEntries based on the current page and rows per page
	const displayedTimeEntries = timeEntries.slice(
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
					<Grid item xs={6}>
						<ButtonContainer>
							<PreviousWeekButton
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(-1)}
							>
								Previous Week
							</PreviousWeekButton>
							<Typography
								style={{
									marginLeft: "20px",
									marginRight: "20px",
								}}
							>
								{format(selectedWeekStart, "MMM d")} -{" "}
								{format(
									endOfWeek(addWeeks(selectedWeekStart, 1), {
										weekStartsOn: 1,
									}),
									"MMM d"
								)}
							</Typography>
							<NextWeekButton
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(1)}
							>
								Next Week
							</NextWeekButton>
						</ButtonContainer>

						{/* Days selection with clickable buttons */}
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
												fontSize: "smaller",
											}}
										>
											Job
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller",
											}}
										>
											Task
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller",
											}}
										>
											Allocated Hours Used
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller",
											}}
										>
											Days Left
										</TableCell>
										<TableCell
											style={{
												borderRight: "1px solid #ccc",
												textAlign: "center",
												fontSize: "smaller",
											}}
										>
											Completed
										</TableCell>
										<TableCell style={{ textAlign: "center" }}>Timer</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{displayedTimeEntries.map((entry, index) => (
										<TableRow key={index}>
											<TableCell
												style={{
													borderRight: "1px solid #ccc",
													textAlign: "center",
													whiteSpace: "pre-line",
													fontSize: "smaller",
												}}
											>
												{entry.job.replace(/:/g, ":\n")}
											</TableCell>

											<TableCell
												style={{
													borderRight: "1px solid #ccc",
													textAlign: "center",
													fontSize: "smaller",
												}}
											>
												{entry.task}
											</TableCell>
											<TableCell
												style={{
													borderRight: "1px solid #ccc",
													textAlign: "center",
													fontSize: "smaller",
												}}
											>
												{entry.hours} hrs of AL hrs
											</TableCell>
											<TableCell
												style={{
													borderRight: "1px solid #ccc",
													textAlign: "center",
													fontSize: "smaller",
												}}
											>
												29
											</TableCell>
											<TableCell
												style={{
													borderRight: "1px solid #ccc",
													textAlign: "center",
													fontSize: "smaller",
												}}
											>
												<Checkbox />
											</TableCell>
											<TableCell style={{ cursor: "pointer", textAlign: "center" }}>
												<MoreTimeIcon onClick={handleAddTimeClick} /> {/* Add this line */}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						{/* Add TablePagination component for pagination */}
						<TablePagination
							rowsPerPageOptions={[2, 5, 10]}
							component="div"
							count={timeEntries.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Grid>

					{/* Second column */}
					<Grid item xs={6}>
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
										onChange={(event) => setSelectedJob(event.target.value)}
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
											onChange={(event) => setSelectedTask(event.target.value)}
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
