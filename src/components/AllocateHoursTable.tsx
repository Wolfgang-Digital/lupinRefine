import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Grid,
	IconButton,
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
import {
	PostAllocateHoursEntry,
	// deleteAllocateHoursEntry,
	updateAllocateHoursEntry,
} from "@pages/api/allocateHours";

import { getAllProjectJobTasks } from "@pages/api/projectJobTasksView";
import { PostTimeEntry } from "@pages/api/timesheet";
import { format } from "date-fns";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";

type RowData = AllocateHoursView;

type TaskOption = {
	label: string;
	value: string;
};

type UserOption = {
	label: string;
	value: string;
};

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
}: // jobsId,
{
	projectId?: number;
	jobId?: number;
	jobNameId?: number;
	// jobsId?: number;
}) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [edit, setEdit] = useState(false);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const taskOptions: TaskOption[] = [];
	const [users, setUsers] = useState<UserOption[]>([]);
	const userOptions: UserOption[] = [];
	const [selectedId, setSelectedId] = useState("");
	const [selectedTask, setSelectedTask] = useState("");
	const [selectedUser, setSelectedUser] = useState("");
	const [allocatedMonth, setAllocatedMonth] = useState("");
	const [allocatedHours, setAllocatedHours] = useState("");
	const [rate, setRate] = useState("");
	const [postData, setPostData] = useState(false);

	const [rows, setRows] = useState<RowData[]>([]);

	// Fetch data from Supabase and update the fetchedRows state
	const fetchData = async () => {
		setTasks([]);
		const allocateHoursTable = await getJobAllocatedHoursPerMonth(
			jobId || 0
			// currentMonth || 0
		);
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

		if (allocateHoursTable) {
			// Map the fetched data to match the RowData type
			const mappedData: RowData[] = allocateHoursTable.map(
				(item: AllocateHoursView) => ({
					...item,
					id: item.id,
					job_name: item.job_name,
					task_name: item.task_name,
					user_name: item.user_name,
					hours: item.hours,
				})
			);
			setFetchedRows(mappedData);

			const newRows: RowData[] = allocateHoursTable.map((allocation) => ({
				...allocation,
				hours: allocation.hours,
				id: allocation.id,
				month: allocation.month,
				rate: allocation.rate,
				task_id: allocation.task_id,
				user_id: allocation.user_id,
			}));
			setRows(newRows);
		}
	};

	async function saveAllocateHoursEntry() {
		setShowForm(false);
		const monthNumber = monthNameToNumber(allocatedMonth);
		const currentDate = new Date();
		const formattedDate = format(currentDate, "yyyy-MM-dd");
		if (edit) {
			const dataToUpdateAHE = {
				id: Number(selectedId),
				userId: selectedUser,
				taskId: Number(selectedTask),
				month: Number(monthNumber),
				hours: Number(allocatedHours),
				allocatedRate: Number(rate),
				effectiveRate: Number(rate),
			};
			const response = await updateAllocateHoursEntry(dataToUpdateAHE);
			console.log(`Update allocate hours row ${response}`);
		} else {
			const dataToPostAHE = {
				// jobTaskId: 0,
				month: Number(monthNumber),
				year: Number(currentDate.getFullYear()),
				userId: selectedUser,
				jobId: Number(jobId),
				taskId: Number(selectedTask),
				hours: Number(allocatedHours),
				allocatedRate: Number(rate),
				effectiveRate: Number(rate),
			};
			const dataToPostTSE = {
				staffId: selectedUser,
				notes: "Zero hours for allocate hours",
				timeSpent: 0,
				projectId: Number(projectId),
				// jobId: Number(jobsId),
				jobsId: Number(jobId),
				taskId: Number(selectedTask),
				selectedDate: formattedDate,
				rate: Number(rate),
				month: Number(monthNumber),
				year: Number(currentDate.getFullYear()),
			};
			const response = await PostAllocateHoursEntry(dataToPostAHE);
			const response2 = await PostTimeEntry(dataToPostTSE);
			console.log(`PostAllocateHoursEntry ${response}`);
			console.log(`PostTimeEntry ${response2}`);
		}
		setSelectedTask("");
		setSelectedUser("");
		setAllocatedMonth("");
		setAllocatedHours("");
		setRate("");
		setPostData(true);
	}

	useEffect(() => {
		setTasks([]);
		fetchData();
	}, [postData, showForm]);

	const handleAllocateHoursClick = () => {
		setPostData(false);
		setShowForm(true);
		setEdit(false);
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
	interface Months {
		[key: string]: number;
	}
	const monthNameToNumber = (monthName: string): number | null => {
		const months: Months = {
			January: 1,
			February: 2,
			March: 3,
			April: 4,
			May: 5,
			June: 6,
			July: 7,
			August: 8,
			September: 9,
			October: 10,
			November: 11,
			December: 12,
		};
		return months[monthName] || null;
	};

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const handleDeleteRow = async (id: number) => {
		console.log(id);
	};

	const handleEditRow = (id: number) => {
		setShowForm(true);
		setEdit(true);
		const editableRowData = rows.find((row) => row.id === id);
		setSelectedId(editableRowData?.id?.toString() || "");
		setSelectedUser(editableRowData?.user_id?.toString() || "");
		setSelectedTask(editableRowData?.task_id?.toString() || "");
		setAllocatedMonth(monthNames[(editableRowData?.month || 0) - 1]);
		setAllocatedHours(editableRowData?.hours?.toString() || "");
		setRate(editableRowData?.rate?.toString() || "");
	};

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
					{Object.keys(groupedRows).map((month) => (
						<Accordion key={month}>
							<AccordionSummary
								style={{ backgroundColor: "#f6f6f6" }}
								expandIcon={<ExpandMoreIcon />}
							>
								<Typography variant="h6" fontSize="16px">
									{monthNames[Number(month) - 1]}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Paper style={{ width: "100%" }}>
									<DataGrid
										rows={groupedRows[month]}
										columns={[
											{
												field: "edit",
												headerName: "Edit",
												width: 50,
												renderCell: (params) => (
													<IconButton
														color="secondary"
														onClick={() => handleEditRow(params.row.id || 0)}
													>
														<EditIcon />
													</IconButton>
												),
											},
											{ field: "task_name", headerName: "Task", width: 200 },
											{ field: "user_name", headerName: "Wolfganger", width: 150 },
											{ field: "hours", headerName: "Hours Allocated", width: 150 },
											{
												field: "delete",
												headerName: "Delete",
												width: 80,
												renderCell: (params) => (
													<IconButton
														color="secondary"
														onClick={() => handleDeleteRow(params.row.id || 0)}
													>
														<HighlightOffIcon />
													</IconButton>
												),
											},
										]}
										style={{
											display: "flex",
											justifyContent: "center",
										}}
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
							<form onSubmit={handleFormSubmit}>
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
									value={allocatedHours}
									onChange={(event) => {
										if (Number(event.target.value) >= 0) {
											setAllocatedHours(event.target.value);
										}
									}}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
									required
								/>
								<TextField
									type="text"
									label="Rate"
									value={rate}
									onChange={(event) => setRate(event.target.value)}
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
