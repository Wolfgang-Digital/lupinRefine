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
import { AllocateHoursView } from "types";
import { WeekButton } from "@styled-components/timesheet";

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

function CollapsibleHoursGrid({ jobId }: { jobId?: number }) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [selectedMonth, setSelectedMonth] = useState(9);
	const [showForm, setShowForm] = useState(false);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const taskOptions: TaskOption[] = [];
	const [users, setUsers] = useState<UserOption[]>([]);
	const userOptions: UserOption[] = [];
	const [timeSpent, setTimeSpent] = useState("");

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const allocateHoursTable = await getJobAllocatedHoursPerMonth(
				jobId || 0,
				10
			);

			if (allocateHoursTable) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = allocateHoursTable.map(
					(item: AllocateHoursView) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
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
						value: row.task_id?.toString() || "0",
					});
					userOptions.push({
						label: row.user_name || "",
						value: row.user_id?.toString() || "0",
					});
				});
				setTasks(taskOptions);
				setUsers(userOptions);
				setFetchedRows(mappedData);
				console.log(fetchedRows);
			}
		}
		fetchData();
	}, []);

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

	const monthName = monthNames[selectedMonth];

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
					<div style={{ display: "flex", alignItems: "center", padding: "20px 0" }}>
						<WeekButton onClick={() => setSelectedMonth(selectedMonth - 1)}>
							Previous month
						</WeekButton>
						<div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
							{monthName}
						</div>
						<WeekButton onClick={() => setSelectedMonth(selectedMonth + 1)}>
							Next month
						</WeekButton>
					</div>
					{Object.keys(groupedRows).map((month) => (
						<Accordion key={month}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6" fontSize="16px">
									{monthName}
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
									value={""}
									label="Select Task"
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
									value={""}
									label="Select User"
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
									value={""}
									label="Select Month"
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
