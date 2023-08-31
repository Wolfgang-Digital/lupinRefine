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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import supabase from "../../config/supaBaseClient";

import MoreTimeIcon from "@mui/icons-material/MoreTime";

import { startOfWeek, endOfWeek, addWeeks, format, addDays } from "date-fns";

type TimeEntry = {
	task: string;
	client: string;
	hours: string;
	date: string;
	nonBillable: boolean;
	notes: string;
};

type TaskOption = {
	label: string;
	value: string;
};

type ClientOption = {
	label: string;
	value: string;
};

const Timesheet = () => {
	const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 }) // Set weekStartsOn to 1 (Monday)
	);

	const [showForm, setShowForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedClient, setSelectedClient] = useState("");
	const [timeSpent, setTimeSpent] = useState("");
	const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const [clients, setClients] = useState<ClientOption[]>([]);
	const [nonBillable, setNonBillable] = useState(false);
	const [notes, setNotes] = useState("");
	const [filterOption, setFilterOption] = useState("All Tasks");

	useEffect(() => {
		async function fetchTasksAndClients() {
			try {
				const tasksResponse = await supabase
					.from("job_names")
					.select("job_name_id, job_name_name");
				const clientsResponse = await supabase.from("client").select("id, name");

				if (tasksResponse.error || clientsResponse.error) {
					throw new Error("Error fetching data");
				}

				const taskOptions = tasksResponse.data.map((task) => ({
					label: task.job_name_name,
					value: task.job_name_id,
				}));

				const clientOptions = clientsResponse.data.map((client) => ({
					label: client.name,
					value: client.id,
				}));

				setTasks(taskOptions);
				setClients(clientOptions);
			} catch (error) {
				console.error("Error fetching tasks and clients:", error);
			}
		}

		fetchTasksAndClients();
	}, []);

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

		const selectedClientLabel = clients.find(
			(client) => client.value === selectedClient
		)?.label;

		const newTimeEntry: TimeEntry = {
			task: selectedTaskLabel || "",
			client: selectedClientLabel || "",
			hours: parseFloat(timeSpent).toFixed(2),
			date: "01/09/23", // Replace with the actual date value
			nonBillable: nonBillable,
			notes: notes,
		};

		setTimeEntries([...timeEntries, newTimeEntry]);
		setSelectedTask("");
		setSelectedClient("");
		setTimeSpent("");
		setNonBillable(false);
		setNotes("");
		setShowForm(false);
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
							style={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}
						>
							<Button onClick={() => navigateWeeks(-1)}>Previous Week</Button>
							<Button onClick={() => navigateWeeks(1)}>Next Week</Button>
							<Typography style={{ marginLeft: "20px" }}>
								{format(selectedWeekStart, "MMM d")} -{" "}
								{format(
									endOfWeek(addWeeks(selectedWeekStart, 1), { weekStartsOn: 1 }),
									"MMM d"
								)}
							</Typography>
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
										<TableCell>Date</TableCell>
										{/* <TableCell>Tasks</TableCell> */}
										<TableCell>Client</TableCell>
										<TableCell>Allocated Hours Used</TableCell>
										<TableCell>Days Left</TableCell>
										<TableCell>Completed</TableCell>
										<TableCell>Timer</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{timeEntries.map((entry, index) => (
										<TableRow key={index}>
											<TableCell>{entry.date}</TableCell>
											{/* <TableCell>{entry.task}</TableCell> */}
											<TableCell>{entry.client}</TableCell>
											<TableCell>{entry.hours} hrs of 5:00 hrs</TableCell>{" "}
											{/* Example hours left */}
											<TableCell>29</TableCell> {/* Example days left */}
											<TableCell>
												<Checkbox />
											</TableCell>
											<TableCell
												onClick={handleAddTimeClick}
												style={{ cursor: "pointer" }}
											>
												<MoreTimeIcon />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
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
										value="01/09/23" // example date
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
										onChange={(event) => setSelectedClient(event.target.value)}
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
