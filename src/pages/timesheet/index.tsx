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
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { getAllTimesheetRows, TimesheetData } from "@api/timesheetRows";
import {
	getAllTimesheetRowsDemo,
	TimesheetDataDemo,
} from "@api/timesheetRowsDemo";

import supabase from "@config/supaBaseClient";

const Timesheet = () => {
	const [showForm, setShowForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedClient, setSelectedClient] = useState("");
	const [timeSpent, setTimeSpent] = useState("");
	const [timeEntries, setTimeEntries] = useState<
		Array<{ task: string; client: string; hours: string }>
	>([]);
	const [tasks, setTasks] = useState<
		Array<{ label: string | null; value: number }>
	>([]);
	const [clients, setClients] = useState<
		Array<{ label: string | null; value: number }>
	>([]); // Array for clients
	const [timesheetRows, setTimesheetRows] = useState<TimesheetDataDemo[]>([]);

	useEffect(() => {
		const fetchTimesheetRows = async () => {
			const timesheetResponse = await getAllTimesheetRowsDemo();
			if (timesheetResponse) {
				setTimesheetRows(timesheetResponse);
			}
		};
		fetchTimesheetRows();
		console.log(timesheetRows);

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
					label: client?.name,
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

	const handleAddTimeClick = () => {
		setShowForm(true);
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// Find the corresponding task label (job_name_name) based on the selected task ID
		const selectedTaskLabel = tasks.find(
			(task) => task.value === Number(selectedTask)
		)?.label;

		// Find the corresponding client label (name) based on the selected client ID
		const selectedClientLabel = clients.find(
			(client) => client.value === Number(selectedClient)
		)?.label;

		const newTimeEntry = {
			task: selectedTaskLabel || "",
			client: selectedClientLabel || "", // Add client label
			hours: parseFloat(timeSpent).toFixed(2),
		};
		setTimeEntries([...timeEntries, newTimeEntry]);
		setSelectedTask("");
		setSelectedClient(""); // Reset selected client
		setTimeSpent("");
		setShowForm(false);
	};

	return (
		<>
			<h1>My Timesheet</h1>
			<div>
				<Grid container spacing={2}>
					{/* First column */}
					<Grid item xs={5}>
						<TableContainer component={Paper} variant="outlined">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Tasks</TableCell>
										<TableCell>Client</TableCell>
										<TableCell>Total Hours</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{timeEntries.map((entry, index) => (
										<TableRow key={index}>
											<TableCell>{entry.task}</TableCell>
											<TableCell>{entry.client}</TableCell> {/* Display Client */}
											<TableCell>{entry.hours} Hrs</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>

					{/* Second column */}
					<Grid item xs={7}>
						<Paper
							variant="outlined"
							style={{ textAlign: "center", padding: "80px" }}
						>
							{showForm ? (
								<form onSubmit={handleFormSubmit}>
									<TextField
										select
										label="Select Client" /* Add label */
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

									<Button
										variant="contained"
										color="primary"
										type="submit"
										style={{ padding: "10px" }}
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
