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
import { getAllTimesheetRowsFinancial } from "@pages/api/timesheetRows";
import { TimesheetRowsView } from "@types";
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
	padding: 0,
	borderTop: "0.8px solid", // Add top border for all cells
	borderBottom: "0.8px solid", // Add bottom border for all cells
	fontSize: "12px",
});

const CreateEmptyCells = (total: number) => {
	return [...Array(total)].map((_, i) => (
		<TaskEntryCell key={i}></TaskEntryCell>
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

type User =
	| {
			time: number;
			rate: number;
			count: number;
			user_name: string;
			hours: number;
	  }
	| string
	| Total;

type TaskEntry = {
	[userKey: string]: User;
	total: {
		time: number;
		rate: number;
		count: number;
	};
	task_name: string;
};
type Task = TaskEntry | Total | string;

type Job = {
	job_name: string;
	total: {
		time: number;
		rate: number;
		count: number;
	};
	[taskKey: string]: Task;
};
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

		const task = accumulator[jobKey];
		const user = task[taskKey];
		if (
			!accumulator[jobKey as keyof typeof accumulator][
				taskKey as keyof typeof task
			][userKey as keyof typeof user]
		) {
			accumulator[jobKey][taskKey][userKey] = {
				time: 0,
				rate: 0,
				count: 0,
				user_name: current.user_name,
				hours: current.hours,
			};
		}

		accumulator[jobKey][taskKey][userKey].time += current.time;
		accumulator[jobKey][taskKey][userKey].rate += current?.rate;
		accumulator[jobKey][taskKey][userKey].count += 1;

		accumulator[jobKey][taskKey].total.time += current.time;
		accumulator[jobKey][taskKey].total.rate += current?.rate;
		accumulator[jobKey][taskKey].total.count += 1;

		return accumulator;
	}, {} as any);

	// Calculate the average rate for each user under each job
	for (const jobKey in result) {
		for (const taskKey in result[jobKey]) {
			const rate = result?.[jobKey]?.[taskKey]?.total?.rate || 0;
			if (result?.[jobKey]?.[taskKey]?.total) {
				result[jobKey][taskKey].total.rate =
					rate / result?.[jobKey]?.[taskKey]?.total?.count || 1;
			}
		}
	}

	console.log({ result });
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
	const [rows, setRows] = useState<Accumulator>({});

	useEffect(() => {
		async function fetchData() {
			try {
				console.log({ projectId });
				let response = await getAllTimesheetRowsFinancial({ projectId, clientId });
				response = response?.filter((row) => row.project_id === projectId);
				if (response) {
					const groupedData = groupData(response);
					setRows(groupedData);
				}
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
								<NoPadding
									key={columnIndex}
									style={{
										...((typeof column === "object" && column.style) || {}),
									}}
								>
									{typeof column === "object" ? column.text : column}
								</NoPadding>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{/* Month Row */}
						{januaryData.map((row, rowIndex) => (
							<TableRow key={`row-0-${rowIndex}`}>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={`cell-0-${rowIndex}-${cellIndex}`}
										style={{
											textAlign: "center",
											width: "6%",
											paddingLeft: 0,
											paddingRight: 0,
											backgroundColor: "#3a2462",
											color: "white",
											borderRight: cellIndex >= 3 ? "1px solid black" : "none",
											fontSize: "12px",
										}}
									>
										{cellIndex === 0 ? (
											<span
												style={{
													display: "flex",
													alignItems: "center",
													fontSize: "12px",
												}}
											>
												<KeyboardArrowDownIcon
													fontSize="small"
													style={{ marginRight: "5px" }}
												/>
												{cell}
											</span>
										) : (
											cell
										)}
									</TableCell>
								))}
							</TableRow>
						))}

						{/* SubTable Layout */}
						<TableRow>
							<NoPadding colSpan={17}>
								<Table style={{ minWidth: "100%" }}>
									{jobs.map((job, jobIndex) => (
										<>
											<div>
												<TableRow>{CreateRowOfTableCells(job.job_name, 1, 17)}</TableRow>
											</div>
											{Object.entries(job).map(([key, task], index) => (
												<div>
													<TableRow
														style={{
															width: "6%",
															padding: 0,
															borderTop: "0.8px solid", // Add top border for all cells
															borderBottom: "0.8px solid", // Add bottom border for all cells
															fontSize: "12px",
														}}
													>
														{CreateRowOfTableCells((task as TaskEntry)?.task_name, 2, 17)}
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
																		)}{" "}
																	</>
																</TableRow>
															)
														)}
												</div>
											))}
										</>
									))}
								</Table>
							</NoPadding>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Table></Table>
		</div>
	);
}

export default JobsFinancialTable;
