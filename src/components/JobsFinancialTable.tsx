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
});

function JobsFinancialTable() {
	const [value, setValue] = React.useState(dayjs("2023-10-31") as Dayjs | null);
	const [SubTableData, setSubTableData] = useState<Array<Array<JSX.Element>>>(
		[]
	);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await getAllTimesheetRowsFinancial(8); // Only returning client_id 8
				const dataArray = response || [];

				if (dataArray.length > 0) {
					// Group data by job_id
					const groupedData: Record<
						string,
						{
							job_name: string | null;
							tasks: Array<{
								data: any | null;
								task_id: number | null;
								task_name: string | null;
								rate: number | null;
								users: Array<{
									user_id: number | null;
									user_name: string | null;
									data: Array<JSX.Element[]> | null;
								}>;
							}>;
						}
					> = {};

					dataArray.forEach((dataItem) => {
						const { job_id, job_name, task_id, task_name, user_name, hours, rate } =
							dataItem;

						// Create a unique ID for the combination of job_id and job_name
						const jobIdKey =
							job_name !== null ? `${job_id}_${job_name}` : `${job_id}_NoJobName`;

						if (!groupedData[jobIdKey]) {
							// job_name
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
								task_id: task_id || 0,
								task_name: task_name || "",
								data: [],
								rate: null,
								users: [],
							});
						}

						// Your remaining logic for data processing

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

						// Add the user_name, hours, rate, and calculations row for each user
						groupedData[jobIdKey].tasks.forEach((task) => {
							if (task.task_id === task_id) {
								task.data.push([
									<EditIcon fontSize="small" />,
									"",
									"",
									<div
										style={{
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{user_name
											? user_name.length > 8
												? user_name.slice(0, 8) + ".."
												: user_name
											: "No User Name"}
									</div>,
									<div style={allocatedCell}>{hours}</div>,
									<div style={allocatedCell}>{rate}</div>,
									<div style={allocatedCell}>{rate * hours}</div>,
									<div>{hours}</div>,
									<div style={actualsCell}>{rate}</div>,
									<div style={actualsCell}>{rate * hours}</div>,
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

					// Your logic for SubTableData construction

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
							<div
								style={{
									width: "35px",
									whiteSpace: "nowrap",
									fontWeight: "bold",
									fontSize: "12px",
								}}
							>
								{job_name}
							</div>,
							"",
							"",
							"SUM",
							"SUM",
							"SUM",
							"SUM",
							"SUM",
							<div style={editableValues}>SUM</div>,
							"SUM",
							<div style={editableValues}>SUM</div>,
							"SUM",
							"SUM",
							<div style={editableValues}>SUM</div>,
							"SUM",
							<CheckBoxOutlineBlankIcon
								fontSize="medium"
								style={{ paddingTop: "5px" }}
							/>,
						]);
						tasks.forEach((task) => {
							SubTableData.push([
								"",
								"",
								<div
									style={{
										paddingTop: "10px",
										paddingBottom: "10px",
										width: "35px",
										whiteSpace: "nowrap",
										fontSize: "12px",
									}}
								>
									- {task.task_name}
								</div>,
								"",
								"SUM",
								"SUM",
								"SUM",
								"SUM",
								"SUM",
								"SUM",
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
									paddingLeft: 0,
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
										textAlign: "center",
										width: "6%",
										paddingLeft: 0,
										paddingTop: 0,
										paddingBottom: 0,
										fontSize: "12px",
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
									{SubTableData.map((subRow, subRowIndex) => (
										<TableRow key={`sub-row-0-${subRowIndex}`}>
											{subRow.map((subCell, subCellIndex) => (
												<NoPadding
													key={`sub-cell-0-${subRowIndex}-${subCellIndex}`}
													style={{
														textAlign: "center",
														width: "6%",
														padding: 0,
														backgroundColor: subRow[1] ? "#D9D9D9" : "",
														color: subRow[1] ? "black" : "",
														borderTop: "0.8px solid", // Add top border for all cells
														borderBottom: "0.8px solid", // Add bottom border for all cells
														borderLeft: subCellIndex >= 4 ? "0.5px solid" : "none", // Add left border starting from the 4th cell
														borderRight: subCellIndex >= 4 ? "0.5px solid" : "none", // Add right border starting from the 4th cell
														fontSize: "12px",
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
