import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import { Table } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { getAllTimesheetRows } from "@pages/api/timesheetRows";
import { AllTimesheetRowsView, TimesheetRowsView } from "@types";

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
		text: "Rate",
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

const januaryData = [
	[
		"January",
		"",
		"",
		"",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"SUM",
		"",
	],
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
	paddingTop: 5,
	paddingBottom: 5,
	textAlign: "center",
});

const TaskEntryCell = styled(TableCell)({
	textAlign: "center",
	width: "6%",
	maxWidth: "6%",
	padding: 0,
	borderTop: "0.8px solid", // Add top border for all cells
	borderBottom: "0.8px solid", // Add bottom border for all cells
	fontSize: "12px",
});

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
	// return total amount of TaskEntryCells
	// create an array of TaskEntryCells
	return [...Array(total)].map((_, i) => (
		<TaskEntryCell key={i}>{index === i && content}</TaskEntryCell>
	));
};

type Total = {
	time: number;
	rate: number;
	count: number;
};
type UserEntry = {
	time: number;
	rate: number;
	count: number;
	user_name: string;
	hours: number;
};
type User = Record<string, UserEntry | string>;
type TaskEntry = Record<string, User | Total | string>;
type Task = Record<string, TaskEntry | Total | string>;
type Job = Record<string, Task | string | Total>;
type Accumulator = Record<string, Job>;

function groupData(dataArray: AllTimesheetRowsView[]): Accumulator {
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
				total: { time: 0, rate: 0, count: 0 },
			};
		}

		if (!accumulator[jobKey][taskKey]) {
			accumulator[jobKey][taskKey] = {
				total: {
					time: 0,
					rate: 0,
					count: 0,
					user_name: "",
					hours: 0,
				} as unknown as Total,
				task_name: current.task_name || "",
			};
		}

		const job = accumulator[jobKey];
		const task = job[taskKey];
		let userEntry = (task as Task)[userKey] as UserEntry;
		if (
			!accumulator[jobKey as keyof typeof accumulator][
				taskKey as keyof typeof job
			][userKey as keyof typeof task]
		) {
			((accumulator[jobKey] as Task)[taskKey] as User)[userKey] = {
				time: current.time || 0,
				rate: current.rate || 0,
				count: 0,
				user_name: current.user_name || "",
				hours: current.hours || 0,
			} as unknown as UserEntry;
		}

		if (userEntry) {
			(userEntry as UserEntry).time += current?.time || 0;
			(userEntry as unknown as UserEntry).rate += current.rate || 0;
			(userEntry as unknown as UserEntry).count += 1;
		}
		return accumulator;
	}, {} as Accumulator);

	// Calculate the average rate for each user under each job
	for (const jobKey in result) {
		if (typeof result[jobKey] !== "object") continue;
		for (const taskKey in result[jobKey] as Task) {
			if (typeof (result[jobKey] as Task)[taskKey] !== "object") continue;
			for (const userKey in (result[jobKey] as Task)[taskKey] as User) {
				if (
					typeof ((result[jobKey] as Task)[taskKey] as User)[userKey] !== "object"
				)
					continue;
				let userEntry = ((result[jobKey] as Task)[taskKey] as User)[
					userKey
				] as UserEntry;
				if (userEntry.count !== 0) {
					userEntry.rate = userEntry.rate / userEntry.count;
				}
			}
		}
	}

	return result;
}
function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein };
}

const myRows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function JobsFinancialTable({
	projectId,
	clientId,
}: {
	projectId: number;
	clientId: number;
}) {
	const [value, setValue] = React.useState(dayjs("2023-10-31") as Dayjs | null);
	const [rows, setRows] = useState<Accumulator>({});

	const [monthData, setMonthData] = useState<any>([]);
	const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(
		new Date().getMonth()
	);
	useEffect(() => {
		async function fetchData() {
			try {
				// do something for 12 times
				const response = await getAllTimesheetRowsFinancial({
					projectId,
					clientId,
				});
				// create empty array with 12 elements, each element is an empty array
				const ungroupedMonthData: TimesheetRowsView[][] = [...Array(12)].map(
					() => []
				);
				// loop through each timesheet row
				response?.forEach((row) => {
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
					console.log({ month });
					groupedData[index] = groupData(month);
				});
				console.log({ groupedData });
				setMonthData(groupedData);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	const jobs = Object.values(rows);
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

			<TableContainer component={Paper}>
				<Table style={{ minWidth: "100%" }} aria-label="custom table">
					<TableHead>
						{/* Allocated Heading Row */}
						<TableRow>
							<NoPadding colSpan={4} style={{ borderBottom: "none" }}></NoPadding>
							<NoPadding
								colSpan={3}
								style={{
									backgroundColor: "#C3DDBC",
									paddingLeft: 0,
									borderBottom: "none",
								}}
							>
								Allocated
							</NoPadding>
							<NoPadding
								colSpan={3}
								style={{
									backgroundColor: "#BEB3D4",
									paddingLeft: 0,
									borderBottom: "none",
								}}
							>
								Actuals
							</NoPadding>
						</TableRow>
						{/* Column Headers */}
						<TableRow>
							{columns.map((column, columnIndex) => (
								<TableCell
									key={columnIndex}
									style={{
										width: "6%",
										textAlign: "center",
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
							console.log({ monthIndex, selectedMonthIndex, data });
							if (monthIndex !== selectedMonthIndex)
								return (
									<TableRow onClick={() => setSelectedMonthIndex(monthIndex)}>
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 17)}{" "}
									</TableRow>
								);
							if (Object.keys(jobs).length === 0) return <>Empty</>;
							return (
								<>
									<TableRow
										style={{ background: "green" }}
										onClick={() => setSelectedMonthIndex(monthIndex)}
									>
										{CreateRowOfTableCells(monthNames[monthIndex], 0, 17)}{" "}
									</TableRow>
									{monthIndex === selectedMonthIndex &&
										jobs.map((job) => (
											<>
												<>
													<TableRow>
														{CreateRowOfTableCells(job.job_name as string, 1, 17)}
													</TableRow>
												</>
												{Object.entries(job).map(([key, task], index) => (
													<>
														<TableRow>
															{CreateRowOfTableCells(
																(task as TaskEntry)?.task_name as string,
																2,
																17
															)}
														</TableRow>
														{Number.isInteger(parseInt(key)) &&
															Object.entries(task).map(
																([taskKey, { time, hours, user_name, task_name, rate }]) => (
																	<TableRow>
																		{CreateEmptyCells(3)}
																		<TaskEntryCell>{user_name}</TaskEntryCell>
																		<>
																			{Number.isInteger(parseInt(taskKey)) && (
																				<>
																					<TaskEntryCell>{hours}</TaskEntryCell>
																					<TaskEntryCell>{rate}</TaskEntryCell>
																					<TaskEntryCell>{hours * rate}</TaskEntryCell>
																					<TaskEntryCell>{time}</TaskEntryCell>
																					<TaskEntryCell>{rate}</TaskEntryCell>
																					<TaskEntryCell>{time * rate}</TaskEntryCell>
																				</>
																			)}
																		</>
																	</TableRow>
																)
															)}
													</>
												))}
											</>
										))}
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
