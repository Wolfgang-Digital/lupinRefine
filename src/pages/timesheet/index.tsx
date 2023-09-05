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

type TimeEntry = {
	task: string;
	job: string;
	hours: string;
	date: string;
	nonBillable: boolean;
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

const Timesheet = () => {
	const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	);

	const [showForm, setShowForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedJob, setSelectedJob] = useState("");
	const [timeSpent, setTimeSpent] = useState("");
	const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
	const [jobs, setJobs] = useState<JobOption[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const [nonBillable, setNonBillable] = useState(false);
	const [notes, setNotes] = useState("");
	const [filterOption, setFilterOption] = useState("All Tasks");
	const [page, setPage] = useState(0); // Current page
	const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page (changed to 5)

	useEffect(() => {
		async function fetchTasksAndJobs() {
			try {
				const jobsResponse = await supabase
					.from("timesheet_jobsresponse_dropdown")
					.select("job_id, job_name, client_name");

				const tasksResponse = await supabase
					.from("tasks")
					.select("task_id, task_name");

				if (jobsResponse.error || tasksResponse.error) {
					throw new Error("Error fetching data");
				}

				const jobOptions = jobsResponse.data.map((job) => ({
					label: `${job.client_name} : ${job.job_name}`,
					value: job.job_id?.toString() || "0",
				}));

				const taskOptions = tasksResponse.data.map((task) => ({
					label: task.task_name || "No Task Found",
					value: task.task_id.toString(),
				}));

				setJobs(jobOptions);
				setTasks(taskOptions);
			} catch (error) {
				console.error("Error fetching jobs and tasks:", error);
			}
		}

		fetchTasksAndJobs();
	}, []);

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
		setPage(0); // Reset to the first page when changing filter options
	}, [filterOption]);

	const navigateWeeks = (weeks: number) => {
		setSelectedWeekStart(addWeeks(selectedWeekStart, weeks));
	};

	const weekDays: Date[] = [];
	for (let i = 0; i < 7; i++) {
		weekDays.push(addDays(selectedWeekStart, i));
	}

	const handleAddTimeClick = () => {
		setShowForm(true);
	};

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
			nonBillable: nonBillable,
			notes: notes,
		};

		setTimeEntries([...timeEntries, newTimeEntry]);
		setSelectedTask("");
		setSelectedJob("");
		setTimeSpent("");
		setNonBillable(false);
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
		setPage(newPage);
	};

	// Function to handle rows per page change
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Reset to the first page when changing rows per page
	};

	return (
		<>
			<div
				style={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}
			>
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
			</div>

			<div>
				<Grid container spacing={2}>
					{/* First column */}
					<Grid item xs={6}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								paddingBottom: "20px",
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(-1)}
							>
								Previous Week
							</Button>
							<Typography style={{ marginLeft: "20px", marginRight: "20px" }}>
								{format(selectedWeekStart, "MMM d")} -{" "}
								{format(
									endOfWeek(addWeeks(selectedWeekStart, 1), { weekStartsOn: 1 }),
									"MMM d"
								)}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								onClick={() => navigateWeeks(1)}
							>
								Next Week
							</Button>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingBottom: "10px",
							}}
						>
							{weekDays.map((day) => (
								<div
									key={day.toISOString()}
									style={{
										border: "1px solid #ccc",
										paddingLeft: "20px",
										paddingRight: "20px",
										paddingTop: "5px",
										paddingBottom: "5px",
										borderRadius: "5px",
										textAlign: "center",
									}}
								>
									<Typography>
										{format(day, "EEE")}
										<br />
										{format(day, "d")}
									</Typography>
								</div>
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
											<TableCell
												onClick={handleAddTimeClick}
												style={{ cursor: "pointer", textAlign: "center" }}
											>
												<MoreTimeIcon />
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
										value="01/09/23"
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
