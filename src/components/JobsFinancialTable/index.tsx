import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import PostAdd from "@mui/icons-material/PostAdd";
import AddCircle from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
	// Button,
	Dialog,
	DialogContent,
	IconButton,
	MenuItem,
	Table,
	// TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
	getAllTimesheetRows,
	// getAllTimesheetRowsV3,
} from "@pages/api/timesheetRows";
import { TimesheetRowsView } from "types";
import {
	PostAllocateHoursEntry,
	changeAllocation,
} from "@pages/api/allocateHours";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { getTaskName } from "@src/pages/api/tasks";
import { getAllUsers, getUserName } from "@src/pages/api/users";
import { getAllProjectJobTasks } from "@src/pages/api/projectJobTasksView";
import { format } from "date-fns";
import {
	getJobAllocatedHoursPerMonthPerUser,
	getJobAllocatedHoursPerMonthPerJob,
} from "@src/pages/api/allocateHoursView";
import { PostTimeEntry } from "@src/pages/api/timesheet";
// import { TaskOption } from "@src/pages/timesheet/index.page";

const columns = [
	"Month",
	"Job",
	"Task",
	"Staff",
	{
		text: "Hours",
		style: {
			backgroundColor: "#C3DDBC",
		},
	},
	{
		text: "Rate",
		style: {
			backgroundColor: "#C3DDBC",
		},
	},
	{
		text: "Value",
		style: {
			backgroundColor: "#C3DDBC",
		},
	},
	{
		text: "Hours",
		style: {
			backgroundColor: "#BEB3D4",
		},
	},
	{
		text: " Allocated Rate",
		style: {
			backgroundColor: "#BEB3D4",
		},
	},
	{
		text: " Effective Rate",
		style: {
			backgroundColor: "#BEB3D4",
		},
	},
	{
		text: "Value",
		style: {
			backgroundColor: "#BEB3D4",
		},
	},
	"Fee b/f",
	"Current invoice",
	"Available fee",
	"Balance",
	"Invoice Adj",
	"Fee c/f",
	"Bal",
	"",
];

const monthNames = [
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

const NoPadding = styled(TableCell)({
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 0,
	paddingBottom: 0,
	textAlign: "center",
});

const TaskEntryCell = styled(TableCell)({
	textAlign: "center",
	width: "6%",
	maxWidth: "6%",
	padding: 10,
	borderTop: "0.8px solid", // Add top border for all cells
	borderBottom: "0.8px solid", // Add bottom border for all cells
	fontSize: "12px",
});

const ShortTaskEntryCell = styled(TableCell)`
	text-align: center;
	width: 6%;
	max-width: 6%;
	padding: 10px;
	border-top: 0.8px solid;
	border-bottom: 0.8px solid;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 15ch; /* Limit text to 15 characters */
`;

const ShortTableCell = styled(TableCell)`
	text-align: center;
	width: 6%;
	max-width: 6%;
	padding: 10px;
	border-top: 0.8px solid;
	border-bottom: 0.8px solid;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 30ch; /* Limit text to 15 characters */
`;

const CreateEmptyCells = (total: number) => {
	return [...Array(total)].map((_, i) => (
		<TaskEntryCell key={i + "empty"}></TaskEntryCell>
	));
};

const CreateRowOfTableCells = (
	content: React.ReactNode,
	index: number,
	total = 17
): React.ReactNode => {
	return [...Array(total)].map((_, i) => (
		<ShortTableCell key={i}>{index === i && content}</ShortTableCell>
	));
};

type Total = {
	time: number;
	rate: number;
	allocated_rate: number;
	effective_rate: number;
	count: number;
	hours: number;
	allocatedValue?: number;
	actualValue?: number;
};

type UserEntry = {
	time: number;
	rate: number;
	allocated_rate: number;
	effective_rate: number;
	count: number;
	user_name: string;
	user_id: string;
	hours: number;
};
type TaskOption = {
	label: string;
	value: string;
};
type UserOption = {
	label: string;
	value: string;
};
type User = Record<string, UserEntry | string>;
type TaskEntry = Record<string, User | Total | string>;
type Task = Record<string, TaskEntry | Total | string>;
type Job = Record<string, Task | string | Total>;
type Accumulator = Record<string, Job>;

function groupData(dataArray: TimesheetRowsView[]): Accumulator {
	const result = dataArray.reduce((accumulator, current) => {
		const jobKey: string =
			(current.job_id?.toString() as unknown as string) || "0";
		const taskKey: string =
			(current.task_id?.toString() as unknown as string) || "0";
		const userKey: string =
			(current?.user_id?.toString() as unknown as string) || "0";

		if (!accumulator[jobKey]) {
			accumulator[jobKey] = {
				job_name: current.job_name || "",
				job_id: current?.jobs_id?.toString() || "",
				jobs_id: current?.job_id?.toString() || "",
				total: {
					time: 0,
					rate: 0,
					allocated_rate: 0,
					effective_rate: 0,
					hours: 0,
					count: 1,
					allocatedValue: 0,
					actualValue: 0,
				} as Total,
			};
		} else {
			const job = accumulator[jobKey];
			const total = job.total as Total;
			total.time += 0;
			total.rate += current.rate || 0;
			total.allocated_rate = current.rate || 0;
			total.effective_rate = current.rate || 0;
			total.count += 1;
		}

		// If task is not existing, create a new task
		if (!accumulator[jobKey][taskKey]) {
			accumulator[jobKey][taskKey] = {
				total: {
					time: current.time || 0,
					rate: current.rate || 0,
					allocated_rate: current.rate || 0,
					effective_rate: current.rate || 0,
					hours: 0,
					count: 1,
					allocatedValue: 0,
					actualValue: (current.time || 0) * (current.rate || 0) || 0,
				} as unknown as Total,
				task_name: current.task_name || "",
				task_id: current.task_id?.toString() || "",
			};
			// If task exists, add the time and rate to the total
		} else {
			const task = (accumulator[jobKey] as Task)[taskKey] as User;
			const total = task.total as Total;
			total.time += current.time || 0;
			total.rate += current.rate || 0;
			total.allocated_rate = current.rate || 0;
			total.effective_rate = current.rate || 0;
			total.count += 1;
			total.actualValue =
				(total.actualValue || 0) +
					(current.time || 0) * (current.effective_rate || 0) || 0;
			(((accumulator[jobKey] as Task)[taskKey] as User).total as Total) = total;
		}

		const job = accumulator[jobKey];
		const task = job[taskKey];
		const userEntry = (task as Task)[userKey] as UserEntry;
		if (
			!accumulator[jobKey as keyof typeof accumulator][
				taskKey as keyof typeof job
			][userKey as keyof typeof task]
		) {
			((accumulator[jobKey] as Task)[taskKey] as User)[userKey] = {
				time: current.time || 0,
				rate: current.rate || 0,
				allocated_rate: current.allocated_rate || 0,
				effective_rate: current.effective_rate || 0,
				count: 1,
				user_id: current.user_id || "",
				user_name: current.user_name || "",
				hours: current.hours || 0,
			} as unknown as UserEntry;
			// sum task hours for each user hours
			const taskTotal = (accumulator[jobKey][taskKey] as Task).total as Total;
			taskTotal.hours += current.hours || 0;
			taskTotal.allocatedValue =
				(current.rate || 0) * (current.hours || 0) +
				(taskTotal.allocatedValue || 0);
		}

		if (userEntry) {
			(userEntry as UserEntry).time += current?.time || 0;
			(userEntry as unknown as UserEntry).count += 1;
		}

		return accumulator;
	}, {} as Accumulator);

	// Calculate the average rate for each user under each job
	for (const jobKey in result) {
		if (
			typeof result[jobKey] !== "object" ||
			["job_name", "total"].includes(jobKey)
		)
			continue;
		for (const taskKey in result[jobKey] as Task) {
			if (["job_name", "total"].includes(taskKey)) continue;
			const jobTotal = result[jobKey].total as Total;
			const taskTotal = ((result[jobKey] as Task)[taskKey] as User).total as Total;
			jobTotal.actualValue =
				(jobTotal.actualValue || 0) + (taskTotal?.actualValue || 0);
			jobTotal.hours += taskTotal?.hours || 0;
			jobTotal.time += taskTotal?.time || 0;
			jobTotal.allocatedValue =
				(jobTotal.allocatedValue || 0) + (taskTotal?.allocatedValue || 0);
			if (typeof (result[jobKey] as Task)[taskKey] !== "object") continue;

			for (const userKey in (result[jobKey] as Task)[taskKey] as User) {
				if (
					typeof ((result[jobKey] as Task)[taskKey] as User)[userKey] !== "object" ||
					userKey === "total"
				)
					continue;
				// const userEntry = ((result[jobKey] as Task)[taskKey] as User)[
				// 	userKey
				// ] as UserEntry;
			}
		}
	}

	// Calculate the average rate for each task under each job
	for (const jobKey in result) {
		if (typeof result[jobKey] !== "object") continue;
		for (const taskKey in result[jobKey] as Task) {
			if (typeof (result[jobKey] as Task)[taskKey] !== "object") continue;
			const taskEntry = (result[jobKey] as Task)[taskKey] as TaskEntry;
			const total = taskEntry.total as Total;
			if (total && total.count !== 0) {
				total.allocated_rate /= total.count;
			}
		}
	}

	if (Object.keys(result).length !== 0) console.log({ result });

	return result;
}

function JobsFinancialTable({
	projectId,
	clientId,
	jobNameId,
}: {
	projectId: number;
	clientId: number;
	jobNameId: number;
}) {
	const [value, setValue] = React.useState(dayjs("2023-10-31") as Dayjs | null);

	const [monthData, setMonthData] = useState<Accumulator[]>([]);
	const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
		new Date().getMonth()
	);
	const [postData, setPostData] = useState(false);
	// useEffect(() => {
	async function fetchData() {
		try {
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

			// do something for 12 times
			const unfilteredResponse: TimesheetRowsView[] =
				(await getAllTimesheetRows()) as unknown as TimesheetRowsView[];
			let filteredResponse: TimesheetRowsView[] = [];
			if (unfilteredResponse) {
				filteredResponse = unfilteredResponse.filter(
					({ client_id, project_id }) => {
						return client_id === clientId && project_id === projectId;
					}
				);
			}

			// create empty array with 12 elements, each element is an empty array
			const ungroupedMonthData: TimesheetRowsView[][] = [...Array(12)].map(
				() => []
			);
			// loop through each timesheet row
			filteredResponse?.forEach((row) => {
				// get the month of the timesheet row
				if (row.year === new Date().getFullYear()) {
					ungroupedMonthData[(row.month || 0) - 1] = [
						...ungroupedMonthData[(row.month || 0) - 1],
						row,
					];
				}
			});
			// }

			const groupedData: Accumulator[] = [];
			ungroupedMonthData.forEach((month, index) => {
				groupedData[index] = groupData(month);
			});
			setMonthData(groupedData);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [postData]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showAddUserToTaskForm, setShowAddUserToTaskForm] = useState(false);
	const [selectedTask, setSelectedTask] = useState("");
	const [tasks, setTasks] = useState<TaskOption[]>([]);

	const taskOptions: TaskOption[] = [];
	const [taskName, setTaskName] = useState("");
	// const [userName, setUserName] = useState("");
	const [users, setUsers] = useState<UserOption[]>([]);
	const userOptions: UserOption[] = [];
	const [selectedUser, setSelectedUser] = useState("");
	const [allocatedHours, setAllocatedHours] = useState("");
	const [rate, setRate] = useState("");
	const [taskId, setTaskId] = useState("");
	const [jobId, setJobId] = useState("");
	const [jobsId, setJobsId] = useState("");
	let userName: string;

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleFormSubmit = () => {
		setIsModalOpen(false);
	};

	async function saveAllocateHoursEntry() {
		const currentDate = new Date();
		const formattedDate = format(currentDate, "yyyy-MM-dd");
		const month = Number(selectedMonthIndex + 1);
		const year = Number(currentDate.getFullYear());
		const userNameArr = await getUserName(selectedUser);
		const taskNameArr = await getTaskName(Number(selectedTask));
		if (userNameArr && taskNameArr) {
			userName = userNameArr[0]?.user_name || "";
			setTaskName(taskNameArr[0]?.task_name || "");
		}

		const checkJobsId = Number(jobId);
		const checkTaskId = Number(taskId);

		if (showAddUserToTaskForm) {
			const allocatedHoursLogged =
				(await getJobAllocatedHoursPerMonthPerUser(
					year,
					month,
					selectedUser,
					checkJobsId,
					checkTaskId
				)) || [];
			if (allocatedHoursLogged.length > 0) {
				window.alert(
					`Hours already logged for ${userName} on the ${taskName} task`
				);
			} else {
				const dataToPostAHE = {
					jobTaskId: 10,
					month: Number(selectedMonthIndex + 1),
					year: Number(currentDate.getFullYear()),
					userId: selectedUser,
					jobId: Number(jobId),
					taskId: Number(taskId),
					hours: Number(allocatedHours),
					allocatedRate: Number(rate),
					effectiveRate: Number(rate),
				};
				const dataToPostTSE = {
					staffId: selectedUser,
					notes: "Zero hours for allocate hours",
					timeSpent: 0,
					projectId: Number(projectId),
					jobId: Number(jobsId),
					jobsId: Number(jobId),
					taskId: Number(taskId),
					selectedDate: formattedDate,
					rate: Number(rate),
					month: Number(selectedMonthIndex + 1),
					year: Number(currentDate.getFullYear()),
				};
				const response = await PostAllocateHoursEntry(dataToPostAHE);
				const response2 = await PostTimeEntry(dataToPostTSE);
				console.log(`PostAllocateHoursEntry ${response}`);
				console.log(`PostTimeEntry ${response2}`);
			}
		} else {
			const checkTaskId = Number(selectedTask);
			const allocatedHoursLogged =
				(await getJobAllocatedHoursPerMonthPerJob(
					year,
					month,
					checkJobsId,
					checkTaskId
				)) || [];
			if (allocatedHoursLogged.length > 0) {
				window.alert(`The ${taskName} task has already been allocated to this job`);
			} else {
				const dataToPostAHE = {
					jobTaskId: 10,
					month: Number(selectedMonthIndex + 1),
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
					jobId: Number(jobsId),
					jobsId: Number(jobId),
					taskId: Number(selectedTask),
					selectedDate: formattedDate,
					rate: Number(rate),
					month: Number(selectedMonthIndex + 1),
					year: Number(currentDate.getFullYear()),
				};
				const response = await PostAllocateHoursEntry(dataToPostAHE);
				const response2 = await PostTimeEntry(dataToPostTSE);
				console.log(`PostAllocateHoursEntry ${response}`);
				console.log(`PostTimeEntry ${response2}`);
			}
		}
		setTaskId("");
		setSelectedTask("");
		setSelectedUser("");
		setAllocatedHours("");
		setRate("");
		setPostData(true);
	}
	// edit functionality for rows

	interface EditState {
		isModalOpen: boolean;
		editingValue: string;
		user_id: string;
		task_id: number;
		job_id: number;
		editType: "hours" | "allocated_rate" | "effective_rate";
	}

	const [editState, setEditState] = useState<EditState>({
		isModalOpen: false,
		editingValue: "",
		user_id: "",
		task_id: 0,
		job_id: 0,
		editType: "hours", // Default value
	});

	const openEditModal = (
		user_id: string,
		task_id: number,
		job_id: number,
		currentValue: string,
		editType: "hours" | "allocated_rate" | "effective_rate"
	) => {
		setEditState({
			isModalOpen: true,
			editingValue: currentValue,
			user_id,
			task_id,
			job_id,
			editType,
		});
	};

	const handleSave = async () => {
		const { editingValue, user_id, task_id, job_id, editType } = editState;
		const numericValue = parseFloat(editingValue);

		if (isNaN(numericValue)) {
			console.error("Invalid input: editingValue is not a number.");
			return;
		}

		let updatedData = {};

		switch (editType) {
			case "hours":
				updatedData = { hours: numericValue };
				break;
			case "allocated_rate":
				updatedData = { allocated_rate: numericValue };
				break;
			case "effective_rate":
				updatedData = { effective_rate: numericValue };
				break;
			default:
				console.error("Invalid edit type.");
				return;
		}

		await changeAllocation({
			updatedData,
			user_id,
			task_id,
			job_id,
		});

		await fetchData(); // Ensure fetchData correctly re-fetches and updates state
		setEditState({ ...editState, isModalOpen: false });
	};

	function isEditableMonth(monthIndex: number) {
		const currentMonth = new Date().getMonth();
		const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
		return monthIndex === currentMonth || monthIndex === previousMonth;
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					padding: 20,
					backgroundColor: "#E5E5E8",

					borderTopRightRadius: "10px",
					borderTopLeftRadius: "10px",
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker label="Start Date" defaultValue={dayjs("2023-10-05")} />
					<DatePicker
						label="End Date"
						value={value}
						onChange={(newValue) => setValue(newValue)}
					/>
				</LocalizationProvider>
				<h3 style={{ paddingLeft: "5%" }}>Total Revenue</h3>
				<h3 style={{ paddingLeft: "15%" }}>3248</h3>
				<h3 style={{ paddingLeft: "5%" }}>+ 5% YoY | + 0% MoM</h3>
			</div>

			<TableContainer
				style={{ maxHeight: "550px", overflowY: "scroll" }}
				component={Paper}
			>
				<Table style={{ minWidth: "100%" }} aria-label="custom table">
					<TableHead
						style={{
							position: "sticky",
							top: 0,
							background: "white",
							zIndex: 2,
						}}
					>
						{/* Allocated Heading Row */}
						<TableRow>
							<NoPadding colSpan={4} style={{ borderBottom: "none" }}></NoPadding>
							<NoPadding
								colSpan={3}
								style={{
									backgroundColor: "#C3DDBC",
									paddingLeft: 0,
									borderBottom: "none",
									paddingTop: "10px",
								}}
							>
								Allocated
							</NoPadding>
							<NoPadding
								colSpan={4}
								style={{
									backgroundColor: "#BEB3D4",
									paddingLeft: 0,
									borderBottom: "none",
									paddingTop: "10px",
								}}
							>
								Actuals
							</NoPadding>
							<NoPadding
								style={{
									backgroundColor: "white",
									paddingLeft: 0,
									paddingRight: 0,
									borderBottom: "none",
								}}
								colSpan={8}
							></NoPadding>
						</TableRow>
						{/* Column Headers */}
						<TableRow>
							{columns.map((column, columnIndex) => (
								<TableCell
									key={columnIndex}
									style={{
										width: "6%",
										padding: "10px",
										fontSize: "12px",
										textAlign: "center",
										lineHeight: "1.2rem",
										...((typeof column === "object" && column.style) || {}),
									}}
								>
									{typeof column === "object" ? column.text : column}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{monthData.map((data: Accumulator, monthIndex: number) => {
							const jobs = Object.values(data);
							if (monthIndex !== selectedMonthIndex)
								return (
									<TableRow onClick={() => setSelectedMonthIndex(monthIndex)}>
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 19)}
									</TableRow>
								);
							if (Object.keys(jobs).length === 0) return <>Empty</>;
							return (
								<>
									<TableRow
										style={{ background: "#1E7F74", color: "white" }}
										onClick={() => setSelectedMonthIndex(monthIndex)}
									>
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 19)}
									</TableRow>
									{monthIndex === selectedMonthIndex &&
										jobs.map((job) => (
											<>
												<>
													<TableRow
														style={{
															borderBottom: "0.8px solid black",
															backgroundColor: "#E5E5E8",
														}}
													>
														{CreateEmptyCells(1)}
														<ShortTableCell>
															{(job as Job)?.job_name as string}
														</ShortTableCell>
														{CreateEmptyCells(1)}
														<ShortTableCell>
															<IconButton
																title="Add new Task to Job"
																color="secondary"
																style={{ padding: "0px" }}
																onClick={() => {
																	setSelectedTask("");
																	setSelectedUser("");
																	setAllocatedHours("");
																	setRate("");
																	setShowAddUserToTaskForm(false);
																	setJobId((job as Job)?.job_id as string);
																	setJobsId((job as Job)?.jobs_id as string);
																	setPostData(false);
																	setIsModalOpen(true);
																}}
															>
																<PostAdd style={{ fontSize: "22px" }} />
															</IconButton>
														</ShortTableCell>
														<TaskEntryCell style={{ border: "0.8px solid black" }}>
															{((job as Job)?.total as Total).hours || 0}
														</TaskEntryCell>
														{CreateEmptyCells(1)}
														<TaskEntryCell style={{ border: "0.8px solid black" }}>
															{((job as Job)?.total as Total).allocatedValue || 0}
														</TaskEntryCell>
														<TaskEntryCell style={{ border: "0.8px solid black" }}>
															{((job as Job)?.total as Total).time || 0}
														</TaskEntryCell>
														{CreateEmptyCells(1)}
														<TaskEntryCell style={{ border: "0.8px solid black" }}>
															{/*{((job as Job)?.total as Total).time || 0}*/}
														</TaskEntryCell>
														<TaskEntryCell
															style={{
																border: "0.8px solid black",
																backgroundColor: "#BEB3D4",
																paddingLeft: "10px",
															}}
														>
															{((job as Job)?.total as Total).actualValue || 0}
															{isEditableMonth(selectedMonthIndex) && (
																<IconButton
																	//onClick={() =>
																	//	openEditModal(
																	//		Number(key),
																	//		Number(job.job_id),
																	//		effective_rate.toString(),
																	//		"actualValue"
																	//	)
																	//}
																	style={{ padding: 0, marginLeft: "5px" }}
																>
																	<EditIcon style={{ fontSize: "14px" }} />
																</IconButton>
															)}
														</TaskEntryCell>

														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
														<TaskEntryCell></TaskEntryCell>
													</TableRow>
												</>
												{Object.entries(job).map(([key, task]) => {
													return (
														<>
															{Number.isInteger(parseInt(key)) && (
																<TableRow style={{ borderBottom: "0.8px solid black" }}>
																	{CreateEmptyCells(2)}
																	<ShortTableCell>
																		{(task as TaskEntry)?.task_name as string}
																	</ShortTableCell>
																	<ShortTableCell>
																		<IconButton
																			title="Add New User to Task"
																			color="secondary"
																			style={{ padding: "0px" }}
																			onClick={() => {
																				setSelectedUser("");
																				setAllocatedHours("");
																				setRate("");
																				setShowAddUserToTaskForm(true);
																				setTaskName((task as TaskEntry)?.task_name as string);
																				setTaskId((task as Task)?.task_id as string);
																				setJobId((job as Job)?.job_id as string);
																				// setJobsId((job as Job)?.jobs_id as string);
																				setJobsId((job as Job)?.jobs_id as string);
																				setPostData(false);
																				setIsModalOpen(true);
																			}}
																			key={key}
																		>
																			<PersonAddAlt1 style={{ fontSize: "22px" }} />
																		</IconButton>
																	</ShortTableCell>
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).hours || 0} */}
																	</TaskEntryCell>
																	{CreateEmptyCells(1)}
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).allocatedValue || 0} */}
																	</TaskEntryCell>
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).time || 0} */}
																	</TaskEntryCell>
																	{CreateEmptyCells(1)}
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).actualValue || 0} */}
																	</TaskEntryCell>
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).actualValue || 0} */}
																	</TaskEntryCell>
																</TableRow>
															)}
															{Number.isInteger(parseInt(key)) &&
																Object.values(task).map(
																	({
																		time,
																		hours,
																		user_name,
																		user_id,
																		allocated_rate,
																		effective_rate,
																	}) => {
																		return (
																			user_name && (
																				<>
																					<TableRow
																						style={{
																							verticalAlign: "middle",
																							textAlign: "center",
																							marginTop: "7px",
																							marginLeft: "10px",
																							borderBottom: "0.8px solid black",
																						}}
																					>
																						{CreateEmptyCells(2)}
																						<ShortTaskEntryCell></ShortTaskEntryCell>
																						<ShortTaskEntryCell>{user_name}</ShortTaskEntryCell>
																						<>
																							{user_name && (
																								<>
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#C3DDBC",
																											paddingLeft: "10px",
																										}}
																									>
																										{hours}
																										{isEditableMonth(selectedMonthIndex) && (
																											<IconButton
																												onClick={() =>
																													openEditModal(
																														user_id,
																														Number(key),
																														Number(job.job_id),
																														hours.toString(),
																														"hours"
																													)
																												}
																												style={{ padding: 0, marginLeft: "5px" }}
																											>
																												<EditIcon style={{ fontSize: "14px" }} />
																											</IconButton>
																										)}
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#C3DDBC",
																											paddingLeft: "10px",
																										}}
																									>
																										{allocated_rate}
																										{isEditableMonth(selectedMonthIndex) && (
																											<IconButton
																												onClick={() =>
																													openEditModal(
																														user_id,
																														Number(key),
																														Number(job.job_id),
																														allocated_rate.toString(),
																														"allocated_rate"
																													)
																												}
																												style={{ padding: 0, marginLeft: "5px" }}
																											>
																												<EditIcon style={{ fontSize: "14px" }} />
																											</IconButton>
																										)}
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											fontWeight: "bold",
																										}}
																									>
																										{hours * allocated_rate}
																									</TaskEntryCell>
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											fontWeight: "bold",
																										}}
																									>
																										{time}
																									</TaskEntryCell>
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											fontWeight: "bold",
																										}}
																									>
																										{allocated_rate}
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#BEB3D4",
																											paddingLeft: "10px",
																										}}
																									>
																										{effective_rate}
																										{isEditableMonth(selectedMonthIndex) && (
																											<IconButton
																												onClick={() =>
																													openEditModal(
																														user_id,
																														Number(key),
																														Number(job.job_id),
																														effective_rate.toString(),
																														"effective_rate"
																													)
																												}
																												style={{ padding: 0, marginLeft: "5px" }}
																											>
																												<EditIcon style={{ fontSize: "14px" }} />
																											</IconButton>
																										)}
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#BEB3D4",
																											paddingLeft: "10px",
																										}}
																									>
																										{time * effective_rate}
																										{isEditableMonth(selectedMonthIndex) && (
																											<IconButton
																												onClick={() =>
																													openEditModal(
																														user_id,
																														Number(key),
																														Number(job.job_id),
																														effective_rate.toString(),
																														"effective_rate"
																													)
																												}
																												style={{ padding: 0, marginLeft: "5px" }}
																											>
																												<EditIcon style={{ fontSize: "14px" }} />
																											</IconButton>
																										)}
																									</TaskEntryCell>
																								</>
																							)}
																						</>
																					</TableRow>
																				</>
																			)
																		);
																	}
																)}
														</>
													);
												})}
											</>
										))}
									<TableRow
										style={{
											borderBottom: "0.8px solid black",
											backgroundColor: "#E5E5E8",
										}}
									>
										{CreateEmptyCells(19)}
									</TableRow>
									<TableRow
										style={{
											verticalAlign: "middle",
											textAlign: "center",
											marginTop: "7px",
											marginLeft: "10px",
											borderBottom: "0.8px solid black",
										}}
									>
										<ShortTableCell>
											<IconButton
												color="secondary"
												style={{ padding: "0px" }}
												title="Add new Job"
												// onClick={() => handleEditRow(params.row.id)}
											>
												<AddCircle style={{ fontSize: "22px" }} />
											</IconButton>
										</ShortTableCell>
									</TableRow>
								</>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			<Modal
				open={editState.isModalOpen}
				onClose={() => setEditState({ ...editState, isModalOpen: false })}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start", // Align to the left
					marginLeft: "2%", // Adjust this value as needed
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: "20px",
						borderRadius: "10px",
						boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
						outline: "none",
						minWidth: "200px",
					}}
				>
					<h2>Edit Value</h2>
					<TextField
						fullWidth
						margin="normal"
						label="New Value"
						value={editState.editingValue}
						onChange={(e) =>
							setEditState({ ...editState, editingValue: e.target.value })
						}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							marginTop: "20px",
						}}
					>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => setEditState({ ...editState, isModalOpen: false })}
						>
							Cancel
						</Button>
						<Button variant="contained" color="primary" onClick={handleSave}>
							Save
						</Button>
					</div>
				</div>
			</Modal>

			<Dialog maxWidth="xs" open={isModalOpen} onClose={closeModal}>
				<DialogContent
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: "20px",
						background: "#fff", // Set your background color
						borderRadius: "10px",
					}}
				>
					{showAddUserToTaskForm ? (
						<>
							<h2>ADD USER TO TASK</h2>
							<form onSubmit={handleFormSubmit}>
								<TextField
									label="Selected Task"
									value={taskName}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
								></TextField>
								<TextField
									select
									value={selectedUser}
									label="Select User"
									onChange={(event) => setSelectedUser(event.target.value)}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
								>
									{users.map((user) => (
										<MenuItem key={user.value} value={user.value}>
											{user.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									type="number"
									label="Select Hours"
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
								></TextField>
								<TextField
									type="text"
									label="Select Rate"
									value={rate}
									onChange={(event) => setRate(event.target.value)}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
								></TextField>
								<Button
									variant="contained"
									/* color="secondary" */
									type="submit"
									style={{ padding: "10px", marginRight: "25px" }}
									/* onClick={} */
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="secondary"
									type="submit"
									style={{ padding: "10px", marginLeft: "25px" }}
									onClick={saveAllocateHoursEntry}
								>
									Save Allocation
								</Button>
							</form>
						</>
					) : (
						<>
							<h2>ADD TASK TO JOB</h2>
							<form onSubmit={handleFormSubmit}>
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
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
								>
									{users.map((user) => (
										<MenuItem key={user.value} value={user.value}>
											{user.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									type="number"
									label="Select Hours"
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
								></TextField>
								<TextField
									type="text"
									label="Select Rate"
									value={rate}
									onChange={(event) => setRate(event.target.value)}
									style={{
										width: "100%",
										marginBottom: "20px",
										textAlign: "left",
									}}
								></TextField>
								<Button
									variant="contained"
									/* color="secondary" */
									type="submit"
									style={{ padding: "10px", marginRight: "25px" }}
									/* onClick={} */
								>
									Cancel
								</Button>
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
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default JobsFinancialTable;
