import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system"; // Import styled for custom styling
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the icon
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getAllTimesheetRowsFinancial } from "@pages/api/timesheetRows";

// Define your column headers
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

// Define your data
const januaryData = [
	[
		"January",
		"",
		"",
		"",
		"28",
		"148",
		"4148",
		"21.5",
		"151",
		"3248",
		"4448",
		"4448",
		"3248",
		"1200",
		"1200",
		"1200",
		"",
	],
];

const NoPadding = styled(TableCell)({
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 5,
	paddingBottom: 5,
});

const greyRowStyle = {
	backgroundColor: "#D9D9D9",

	color: "black",
	border: "none",
};

function JobsFinancialTable() {
	const [value, setValue] = React.useState<Dayjs | null>(
		dayjs("2023-10-31") as Dayjs | null
	);

	const [SubTableData, setSubTableData] = useState<Array<Array<JSX.Element>>>(
		[]
	);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await getAllTimesheetRowsFinancial(8);
				const dataArray = response || [];

				if (dataArray.length > 0) {
					// Create an object to group data by job_id
					const groupedData: Record<
						string,
						{
							job_name: string;
							tasks: Array<{
								data: any;
								task_id: number;
								task_name: string;
								rate: number;
								users: Array<{
									user_id: number;
									user_name: string;
									data: Array<JSX.Element[]>; // Assuming JSX elements
								}>;
							}>;
						}
					> = {};

					dataArray.forEach((dataItem) => {
						const { job_id, job_name, task_id, task_name, user_name, hours, rate } =
							dataItem;

						// Create a unique identifier for the combination of job_id and job_name
						const jobIdKey =
							job_name !== null ? `${job_id}_${job_name}` : `${job_id}_NoJobName`;

						if (!groupedData[jobIdKey]) {
							// Initialize the entry with job_name
							groupedData[jobIdKey] = {
								job_name: job_name,
								tasks: [],
							};
						}

						// Check if the task_id already exists
						const taskExists = groupedData[jobIdKey].tasks.some(
							(task) => task.task_id === task_id
						);

						if (!taskExists) {
							// If the task_id doesn't exist, add it with task_name
							groupedData[jobIdKey].tasks.push({
								task_id: task_id,
								task_name: task_name,
								data: [],
							});
						}

						const allocatedCell = {
							paddingTop: 6,
							paddingBottom: 6,
							alignItems: "center",
							border: "5px solid #C3DDBC",
						};

						const actualsCell = {
							paddingTop: 6,
							paddingBottom: 6,
							alignItems: "center",
							border: "5px solid #BEB3D4",
						};

						const userCell = {
							whiteSpace: "nowrap", // Prevent text from wrapping
							overflow: "hidden",
							textOverflow: "ellipsis", // Show an ellipsis (...) for overflowed text
						};

						// Add the user_name, hours, rate, and calculations row for each user
						groupedData[jobIdKey].tasks.forEach((task) => {
							if (task.task_id === task_id) {
								task.data.push([
									<EditIcon fontSize="small" />,
									"",
									"",
									<div style={userCell}>
										{user_name.length > 8 ? user_name.slice(0, 8) + ".." : user_name}
									</div>,

									<div style={allocatedCell}>{hours}</div>, // Add a border to "hours"
									<div style={allocatedCell}>{rate}</div>, // Add a border to "rate"
									<div style={allocatedCell}>{rate * hours}</div>, // Add a border to "rate * hours"
									<div>{hours}</div>, // Add a border to "hours"
									<div style={actualsCell}>{rate}</div>, // Add a border to "rate"
									<div style={actualsCell}>{rate * hours}</div>, // Add a border to "rate * hours"
									"",
									"",
									"",
									"",
									"",
									"",
									"",
								]);
							}
						});
					});

					const SubTableData = [];

					// Flatten the groupedData object into an array
					for (const jobIdKey of Object.keys(groupedData)) {
						const { job_name, tasks } = groupedData[jobIdKey];

						const editableValues = {
							paddingTop: 6,
							paddingBottom: 6,
							alignItems: "center",
							border: "5px solid #FDFC82",
						};
						SubTableData.push([
							"",
							<div style={{ width: "35px", whiteSpace: "nowrap" }}>{job_name}</div>,
							"",
							"",
							"12",
							"148",
							"3248",
							"23",
							"151",
							<div style={editableValues}>3248</div>,
							"1200",
							<div style={editableValues}>1200</div>,
							"1200",
							"1200",
							<div style={editableValues}>1200</div>,
							"1200",
							<CheckBoxOutlineBlankIcon
								fontSize="medium"
								style={{ paddingTop: "5px" }}
							/>,
						]);
						tasks.forEach((task) => {
							SubTableData.push([
								"",
								"",
								<div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
									{task.task_name}
								</div>,
								"",
								"",
								"",
								"1150",
								"",
								"",
								"1150",
								"",
								"",
								"",
								"",
								"",
								"",
								"",
							]);
							SubTableData.push(...task.data);
						});
					}

					setSubTableData(SubTableData);
				} else {
					console.log("No timesheet data available.");
				}
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

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
									textAlign: "center",
									backgroundColor: "#C3DDBC",
									paddingLeft: 0, // Adjust the padding
									borderBottom: "none",
								}}
							>
								Allocated
							</NoPadding>
							<NoPadding
								colSpan={3}
								style={{
									textAlign: "center",
									backgroundColor: "#BEB3D4",
									paddingLeft: 0, // Adjust the padding
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
										textAlign: "center",
										width: "6%",
										paddingLeft: 0, // Adjust the padding
										paddingTop: 0,
										paddingBottom: 0,
										...((typeof column === "object" && column.style) || {}),
									}}
								>
									{typeof column === "object" ? column.text : column}
								</NoPadding>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{januaryData.map((row, rowIndex) => (
							<TableRow key={`row-0-${rowIndex}`}>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={`cell-0-${rowIndex}-${cellIndex}`}
										style={{
											textAlign: "center",
											width: "6%",
											paddingLeft: 0, // Adjust the padding
											paddingRight: 0,
											backgroundColor: "#3a2462",
											color: "white",
											borderRight: cellIndex >= 3 ? "1px solid black" : "none", // Add border after the first 4 cells
										}}
									>
										{cellIndex === 0 ? (
											<span
												style={{
													display: "flex",
													alignItems: "center",
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
						<TableRow>
							<NoPadding colSpan={17}>
								<Table style={{ minWidth: "100%", padding: 0 }}>
									{SubTableData.map((subRow, subRowIndex) => (
										<TableRow key={`sub-row-0-${subRowIndex}`}>
											{subRow.map((subCell, subCellIndex) => (
												<NoPadding
													key={`sub-cell-0-${subRowIndex}-${subCellIndex}`}
													style={{
														textAlign: "center",
														width: "6%",
														backgroundColor: subRow[1] ? "#D9D9D9" : "",
														color: subRow[1] ? "black" : "",
														border: subRow[1] ? "none" : "0.5px solid",
														// Add border only when the row is not grey
													}}
												>
													{subCell}
												</NoPadding>
											))}
										</TableRow>
									))}
								</Table>
							</NoPadding>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default JobsFinancialTable;
