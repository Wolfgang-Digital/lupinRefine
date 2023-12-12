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
	Box,
	Button,
	IconButton,
	Modal,
	Table,
	TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
	// getAllTimesheetRowsV2,
	getAllTimesheetRowsV3,
} from "@pages/api/timesheetRows";

import { updateAllocatedHoursAndRate } from "@pages/api/allocateHours";
import {
	// AllTimesheetRowsView,
	// TimesheetRowsView,
	AllTimesheetRowsViewV5,
} from "types";

import EditIcon from "@mui/icons-material/Edit";

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
		text: "Allocated Rate",
		style: {
			backgroundColor: "#BEB3D4",
		},
	},
	{
		text: "Effective Rate",
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

type EditableCellProps = {
	value: number;
	onSave: (newValue: number, id: number) => void;
	isEditable: boolean;
	id: number;
};

const EditableCell: React.FC<EditableCellProps> = ({
	value,
	onSave,
	isEditable,
	id,
}) => {
	const [editValue, setEditValue] = useState<string>(value.toString());
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
				<span style={{ flexGrow: 1 }} onClick={handleOpen}>
					{value}
				</span>
				{isEditable && (
					<EditIcon
						onClick={handleOpen}
						style={{ cursor: "pointer", fontSize: "14px" }}
					/>
				)}
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="editable-cell-modal"
				aria-describedby="editable-cell-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 300,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}
				>
					<TextField
						id="editable-cell-input"
						label="Edit Value"
						variant="outlined"
						fullWidth
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
					/>
					<Button
						variant="outlined"
						onClick={() => {
							const newValue = parseFloat(editValue);
							onSave(newValue, id);
							handleClose();
						}}
						style={{ marginTop: "10px" }}
					>
						Save
					</Button>
				</Box>
			</Modal>
		</>
	);
};

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
	baseRate: number;
	effectiveRate: number;
	count: number;
	hours: number;
	allocatedValue?: number;
	actualValue?: number;
};

type UserEntry = {
	time: number;
	baseRate: number;
	effectiveRate: number;
	count: number;
	user_name: string;
	hours: number;
};
type User = Record<string, UserEntry | string>;
type TaskEntry = Record<string, User | Total | string>;
type Task = Record<string, TaskEntry | Total | string>;
type Job = Record<string, Task | string | Total>;
type Accumulator = Record<string, Job>;

function groupData(dataArray: AllTimesheetRowsViewV5[]): Accumulator {
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
				total: {
					time: 0,
					baseRate: 0,
					effectiveRate: 0,
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
			total.baseRate += current.rate || 0;
			total.effectiveRate = current.rate || 0;
			total.count += 1;
		}

		// If task is not existing, create a new task
		if (!accumulator[jobKey][taskKey]) {
			accumulator[jobKey][taskKey] = {
				total: {
					time: current.time || 0,
					baseRate: current.rate || 0,
					effectiveRate: current.rate || 0,
					hours: 0,
					count: 1,
					allocatedValue: 0,
					actualValue: (current.time || 0) * (current.rate || 0) || 0,
					// user_name: "",
				} as unknown as Total,
				task_name: current.task_name || "",
			};
			// If task exists, add the time and rate to the total
		} else {
			const task = (accumulator[jobKey] as Task)[taskKey] as User;
			const total = task.total as Total;
			total.time += current.time || 0;
			total.baseRate += current.rate || 0;
			total.effectiveRate = current.rate || 0;
			total.count += 1;
			total.actualValue =
				(total.actualValue || 0) + (current.time || 0) * (current.rate || 0) || 0;
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
				baseRate: current.allocated_rate || 0,
				effectiveRate: (current.effective_rate || 0) + 50,
				count: 1,
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
		// console.log({ accumulator });
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
				total.baseRate /= total.count;
			}
		}
	}

	if (Object.keys(result).length !== 0) console.log({ result });

	return result;
}

function JobsFinancialTable({
	projectId,
	clientId,
}: {
	projectId: number;
	clientId: number;
}) {
	const [value, setValue] = React.useState(dayjs("2023-10-31") as Dayjs | null);

	const [monthData, setMonthData] = useState<Accumulator[]>([]);
	const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
		new Date().getMonth()
	);

	useEffect(() => {
		async function fetchData() {
			try {
				// do something for 12 times
				const october: AllTimesheetRowsViewV5[] = (await getAllTimesheetRowsV3(
					2023,
					10
				)) as unknown as AllTimesheetRowsViewV5[];
				const november: AllTimesheetRowsViewV5[] = (await getAllTimesheetRowsV3(
					2023,
					11
				)) as unknown as AllTimesheetRowsViewV5[];
				const december: AllTimesheetRowsViewV5[] = (await getAllTimesheetRowsV3(
					2023,
					12
				)) as unknown as AllTimesheetRowsViewV5[];
				const unfilteredResponse = october.concat(november, december);
				let filteredResponse: AllTimesheetRowsViewV5[] = [];
				if (unfilteredResponse) {
					filteredResponse = unfilteredResponse.filter(
						({ client_id, project_id }) => {
							return client_id === clientId && project_id === projectId;
						}
					);
				}

				// create empty array with 12 elements, each element is an empty array
				const ungroupedMonthData: AllTimesheetRowsViewV5[][] = [...Array(12)].map(
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
				const groupedData: Accumulator[] = [];
				ungroupedMonthData.forEach((month, index) => {
					groupedData[index] = groupData(month);
				});
				setMonthData(groupedData);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	type EditState = {
		id: number | null;
		user_name: string | null;
		hours: number | null;
		baseRate: number | null;
		effectiveRate: number | null;
	};

	const [editState, setEditState] = useState<EditState>({
		id: null,
		user_name: null,
		hours: null,
		baseRate: null,
		effectiveRate: null,
	});

	const handleEditHours = (id: number, user_name: string, hours: number) => {
		setEditState({ id, user_name, hours, baseRate: null, effectiveRate: null });
	};

	const handleEditRate = (id: number, user_name: string, baseRate: number) => {
		setEditState({ id, user_name, hours: null, baseRate, effectiveRate: null });
	};

	const handleEditEffectiveRate = (
		id: number,
		user_name: string,
		effectiveRate: number
	) => {
		setEditState({ id, user_name, hours: null, baseRate: null, effectiveRate });
	};

	const handleSave = async (newVal: number | null) => {
		if (editState.id !== null && newVal !== null) {
			try {
				if (editState.hours !== null) {
					await updateAllocatedHoursAndRate(editState.id, newVal, undefined);
				} else if (editState.baseRate !== null) {
					await updateAllocatedHoursAndRate(editState.id, undefined, newVal);
				}
				// Add logic for effectiveRate if needed

				// Refresh data after successful update
				await fetchData();
			} catch (error) {
				console.error("Error updating data: ", error);
			}
		}

		// Reset edit state
		setEditState({
			id: null,
			user_name: null,
			hours: null,
			baseRate: null,
			effectiveRate: null,
		});
	};

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
				style={{ maxHeight: "650px", overflowY: "scroll" }}
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
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 18)}
									</TableRow>
								);
							if (Object.keys(jobs).length === 0) return <>Empty</>;
							return (
								<>
									<TableRow
										style={{
											background: "#1E7F74",
											color: "white!important",
											fontWeight: "bold",
										}}
										onClick={() => setSelectedMonthIndex(monthIndex)}
									>
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 18)}
									</TableRow>
									{monthIndex === selectedMonthIndex &&
										jobs.map((job, jobIndex) => (
											<>
												<>
													<TableRow
														style={{
															borderBottom: "0.8px solid black",
															backgroundColor: "#E5E5E8",
														}}
														key={`job-${jobIndex}`}
													>
														{CreateEmptyCells(1)}
														<ShortTableCell style={{ fontWeight: "bold" }}>
															{(job as Job)?.job_name as string}
														</ShortTableCell>
														{CreateEmptyCells(1)}
														<ShortTableCell>
															<IconButton
																title="Add new Task to Job"
																color="secondary"
																style={{ padding: "0px" }}
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
														<TaskEntryCell
															style={{ border: "0.8px solid black" }}
														></TaskEntryCell>
														{CreateEmptyCells(1)}
														<TaskEntryCell
															style={{
																border: "0.8px solid black",
																backgroundColor: "#BEB3D4",
															}}
														>
															<a href="#" title="Edit Actuals Value">
																{((job as Job)?.total as Total).actualValue || 0}
															</a>
														</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
														<TaskEntryCell>-</TaskEntryCell>
													</TableRow>
												</>
												{Object.entries(job).map(([key, task]) => {
													return (
														<>
															{Number.isInteger(parseInt(key)) && (
																<TableRow style={{ borderBottom: "0.8px solid black" }}>
																	{CreateEmptyCells(2)}
																	<ShortTableCell style={{ fontWeight: "bold" }}>
																		{(task as TaskEntry)?.task_name as string}
																	</ShortTableCell>
																	<ShortTableCell>
																		<IconButton
																			title="Add New User to Task"
																			color="secondary"
																			style={{ padding: "0px" }}
																		>
																			<PersonAddAlt1 style={{ fontSize: "22px" }} />
																		</IconButton>
																	</ShortTableCell>
																	<TaskEntryCell style={{ border: "0.8px solid black" }}>
																		{/* {((task as TaskEntry)?.total as Total).hours || 0} */}
																	</TaskEntryCell>
																	<TaskEntryCell
																		style={{ border: "0.8px solid black" }}
																	></TaskEntryCell>
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
																</TableRow>
															)}
															{Number.isInteger(parseInt(key)) &&
																Object.values(task).map(
																	({ time, hours, user_name, baseRate, effectiveRate }) => {
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
																									{/* Base Rate Editable Cell */}
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#C3DDBC",
																										}}
																										onClick={() =>
																											handleEditHours(id, user_name, baseRate)
																										}
																									>
																										<EditableCell
																											value={baseRate.toString()}
																											onSave={(newVal, id) => handleSave(newVal, id)}
																											isEditable={
																												(editState === editState.baseRate) !== null
																											}
																										/>
																									</TaskEntryCell>

																									{/* Effective Rate Editable Cell */}
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#BEB3D4",
																										}}
																										onClick={() =>
																											handleEditRate(id, user_name, effectiveRate)
																										}
																									>
																										<EditableCell
																											value={effectiveRate.toString()}
																											onSave={(newVal, id) => handleSave(newVal, id)}
																											isEditable={
																												editState.id === id &&
																												editState.effectiveRate !== null
																											}
																											id={id}
																										/>
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											fontWeight: "bold",
																										}}
																									>
																										{hours * baseRate}
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
																										{baseRate}
																									</TaskEntryCell>
																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#BEB3D4",
																										}}
																										onClick={() =>
																											handleEditEffectiveRate(id, user_name, effectiveRate)
																										}
																									>
																										<EditableCell
																											value={effectiveRate.toString()}
																											onSave={(newVal, id) => handleSave(newVal, id)}
																											isEditable={
																												editState.id === id &&
																												editState.effectiveRate !== null
																											}
																											id={id}
																										/>
																									</TaskEntryCell>

																									<TaskEntryCell
																										style={{
																											border: "0.8px solid black",
																											backgroundColor: "#BEB3D4",
																										}}
																									>
																										<a href="#" title="Edit Value">
																											{time * effectiveRate}
																										</a>
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
										{CreateEmptyCells(17)}
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
		</div>
	);
}

export default JobsFinancialTable;
