import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Grid,
	MenuItem,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { getJobAllocatedHoursPerMonth } from "@pages/api/allocateHoursView";
import { getAllUsers } from "@pages/api/users";
import { AllocateHoursView } from "types";
import { PostAllocateHoursEntry } from "@pages/api/allocateHours";

import { getAllProjectJobTasks } from "@pages/api/projectJobTasksView";
import { PostTimeEntry } from "@pages/api/timesheet";
import { format } from "date-fns";
// import { getJobTasks } from "@pages/api/jobTasks";

type RowData = AllocateHoursView;

type TaskOption = {
	label: string;
	value: string;
};

type UserOption = {
	label: string;
	value: string;
};

const columns = [
	// { field: "job_id", headerName: "Job ID", width: 150 },
	// { field: "job_name", headerName: "Job", width: 150 },
	{ field: "task_name", headerName: "Task", width: 300 },
	{ field: "user_name", headerName: "Wolfganger", width: 150 },
	{ field: "hours", headerName: "Hours Allocated", width: 150 },
	// { field: "month", headerName: "Month", width: 150 },
	// { field: "year", headerName: "Year", width: 150 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CollapsibleHoursGrid({
	projectId,
	jobId,
	jobNameId,
	jobsId,
}: //
{
	projectId?: number;
	jobId?: number;
	jobNameId?: number;
	jobsId?: number;
}) {
	console.log({ jobsId });
	// const currentMonth = new Date().getMonth() + 1;
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	// const [selectedMonth, setSelectedMonth] = useState(currentMonth);
	const [showForm, setShowForm] = useState(false);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const taskOptions: TaskOption[] = [];
	const [users, setUsers] = useState<UserOption[]>([]);
	const userOptions: UserOption[] = [];
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [allocatedMonth, setAllocatedMonth] = useState("");
	const [timeSpent, setTimeSpent] = useState("");

	useEffect(() => {
		setTasks([]);
		// console.log({ jobsId });
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const allocateHoursTable = await getJobAllocatedHoursPerMonth(
				jobId || 0
				// currentMonth || 0
			);
			// const getTasks = await getAllJobTasks(jobId || 0);
			const getProjectJobTasks = await getAllProjectJobTasks(
				projectId || 0,
				jobNameId || 0
			);
			if (getProjectJobTasks) {
				getProjectJobTasks.forEach((task) => {
					taskOptions.push({
						label: task.task_name || "",
						value: task.task_id?.toString() || "0",
					});
				});
			}
			setTasks(taskOptions);
			// console.log({ taskOptions });
			const getUsers = await getAllUsers();
			if (getUsers) {
				getUsers.forEach((user) => {
					userOptions.push({
						label: user.user_name || "",
						value: user.user_id?.toString() || "0",
					});
				});
			}
			setUsers(userOptions);
			// const getJobSpecificTasks = await getJobTasks(jobId || 0);

			if (allocateHoursTable) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = allocateHoursTable.map(
					(item: AllocateHoursView) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						jobs_id: item.jobs_id,
						job_name: item.job_name,
						task_name: item.task_name,
						user_name: item.user_name,
						hours: item.hours,
						// year: item.year,
						// month: item.month,
					})
				);
				mappedData.forEach((row) => {
					taskOptions.push({
						label: row.task_name || "",
						value: row.job_id?.toString() || "0",
					});
					// userOptions.push({
					// 	label: row.user_name || "",
					// 	value: row.user_id?.toString() || "0",
					// });
				});
				// setTasks([]);
				// setTasks(taskOptions);
				// console.log(tasks);
				// setUsers(userOptions);
				setFetchedRows(mappedData);
			}
		}
		fetchData();
	}, []);
	// console.log({ taskOptions });
	const handleAllocateHoursClick = () => {
		setShowForm(true);
	};
	const groupedRows: { [key: string]: RowData[] } = {};
	// Group the fetched rows by month
	fetchedRows.forEach((row) => {
		if (!groupedRows[row.month || 0]) {
			groupedRows[row.month || 0] = [];
		}
		groupedRows[row.month || 0].push(row);
	});

	const monthNames: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	async function saveAllocateHoursEntry() {
		const currentDate = new Date();
		const formattedDate = format(currentDate, "yyyy-MM-dd");
		const dataToPostAHE = {
			jobTaskId: 10,
			month: currentDate.getMonth() + 1,
			year: Number(currentDate.getFullYear()),
			userId: selectedUser,
			jobId: Number(jobId),
			taskId: Number(selectedTask),
			hours: Number(timeSpent),
		};
		const dataToPostTSE = {
			staffId: localStorage.getItem("user_id") || "",
			notes: "Zero hours for allocate hours",
			timeSpent: 0,
			projectId: Number(projectId),
			jobId: Number(jobsId),
			jobsId: Number(jobId),
			taskId: Number(selectedTask),
			selectedDate: formattedDate,
			rate: 150,
		};
		const response = await PostAllocateHoursEntry(dataToPostAHE);
		const response2 = await PostTimeEntry(dataToPostTSE);
		console.log(`PostAllocateHoursEntry ${response}`);
		console.log(`PostTimeEntry ${response2}`);
	}

	// const monthName = monthNames[selectedMonth - 1];

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				overflow: "auto",
			}}
		>
			<Grid container spacing={2}>
				{/* First Column */}
				<Grid item xs={8}>
					{/* <div style={{ display: "flex", alignItems: "center", padding: "20px 0" }}>
						<WeekButton onClick={() => setSelectedMonth(selectedMonth - 1)}>
							Previous month
						</WeekButton>
						<div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
							{monthName}
						</div>
						<WeekButton onClick={() => setSelectedMonth(selectedMonth + 1)}>
							Next month
						</WeekButton>
					</div> */}
					{Object.keys(groupedRows).map((month) => (
						<Accordion key={month}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6" fontSize="16px">
									{monthNames[Number(month) - 1]}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Paper style={{ width: "100%" }}>
									<DataGrid
										rows={groupedRows[month]}
										columns={columns.map((col) => ({
											...col,
											editable: true,
										}))}
										components={{
											Toolbar: CustomToolbar,
										}}
										hideFooter
										autoHeight
									/>
								</Paper>
							</AccordionDetails>
						</Accordion>
					))}
				</Grid>
				{/* Second Column */}
				<Grid item xs={4}>
					<Paper variant="outlined" style={{ textAlign: "center", padding: "30px" }}>
						{showForm ? (
							<form>
								<TextField
									select
									value={selectedTask}
									label="Select Task"
									onChange={(event) => setSelectedTask(event.target.value)}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
								>
									{tasks.map((task) => (
										<MenuItem key={task.value} value={task.value}>
											{task.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									select
									value={selectedUser}
									label="Select User"
									onChange={(event) => setSelectedUser(event.target.value)}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
								>
									{users.map((user) => (
										<MenuItem key={user.value} value={user.value}>
											{user.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									select
									label="Select Month"
									value={allocatedMonth}
									onChange={(event) => setAllocatedMonth(event.target.value)}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
								>
									{monthNames.map((month) => (
										<MenuItem key={month} value={month}>
											{month}
										</MenuItem>
									))}
								</TextField>
								<TextField
									type="number"
									label="Hours"
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
								<Button
									variant="contained"
									color="primary"
									type="submit"
									style={{ padding: "10px" }}
									onClick={saveAllocateHoursEntry}
								>
									Save Allocation
								</Button>
							</form>
						) : (
							<>
								<Button
									variant="contained"
									color="primary"
									onClick={handleAllocateHoursClick}
									style={{ padding: "10px" }}
								>
									Allocate Time to Staffer
								</Button>
								<Typography variant="body1" style={{ padding: "30px" }}>
									Allocate time for a Wolfganger to work on a task
								</Typography>
							</>
						)}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default CollapsibleHoursGrid;
