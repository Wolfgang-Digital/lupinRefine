import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system"; // Import styled for custom styling
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Import the icon

// Define your column headers
const columns = [
	"Month",
	"Task",
	"Sub Task",
	"Staff",
	"Hours",
	"Rate",
	"Value",
	"Hours",
	"Rate",
	"Value",
	"Bdgt to Invoice",
	"Invoiced",
	"Used",
	"Bal Remain",
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
		"",
	],
];

const februaryData = [
	[
		"February",
		"",
		"",
		"",
		"20",
		"155",
		"3100",
		"18.5",
		"160",
		"2960",
		"4200",
		"3800",
		"2900",
		"900",
		"",
	],
];

// Fake data for the expanded sub-table
const januarySubTableData = [
	[
		"",
		"Management", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"1148",
		"",
		"",
		"548",
		"",
		"",
		"",
		"",
		"No",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"- Opt", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"775",
		"",
		"",
		"325",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0.5",
		"150",
		"75",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"George",
		"5",
		"125",
		"625",
		"2",
		"125",
		"250",
		"",
		"",
		"",
		"",
		"",
	],

	[
		"",
		"", // Empty cell for Task 1
		"- Reporting", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"150",
		"",
		"",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0",
		"150",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"CRO", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"2100",
		"",
		"",
		"2250",
		"",
		"",
		"",
		"",
		"No",
	],
	// ... other data rows
];

// Fake data for the expanded sub-table
const februarySubTableData = [
	[
		"",
		"Management", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"1148",
		"",
		"",
		"548",
		"",
		"",
		"",
		"",
		"No",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"- Opt", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"775",
		"",
		"",
		"325",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0.5",
		"150",
		"75",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"", // Empty cell for Additional Data 1
		"",
		"", // Empty cell for Sub Task 1
		"George",
		"5",
		"125",
		"625",
		"2",
		"125",
		"250",
		"",
		"",
		"",
		"",
		"",
	],

	[
		"",
		"", // Empty cell for Task 1
		"- Reporting", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"150",
		"",
		"",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"Jack",
		"1",
		"150",
		"150",
		"0",
		"150",
		"0",
		"",
		"",
		"",
		"",
		"",
	],
	[
		"",
		"CRO", // Empty cell for Task 1
		"", // Empty cell for Sub Task 1
		"",
		"",
		"",
		"2100",
		"",
		"",
		"2250",
		"",
		"",
		"",
		"",
		"No",
	],
	// ... other data rows
];

const TableCellNoPadding = styled(TableCell)({
	paddingLeft: 0,
	paddingRight: 0,
	paddingTop: 5,
	paddingBottom: 5,
});

function JobsFinancialTable() {
	return (
		<TableContainer component={Paper}>
			<Table style={{ minWidth: "100%" }} aria-label="custom table">
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCellNoPadding
								key={column}
								style={{
									textAlign: "center",
									cursor: "pointer",
									width: "7%",
									paddingRight: 10,
								}}
							>
								{column}
							</TableCellNoPadding>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{[januaryData, februaryData].map((monthData, monthIndex) => (
						<React.Fragment key={`month-${monthIndex}`}>
							{monthData.map((row, rowIndex) => (
								<TableRow key={`row-${monthIndex}-${rowIndex}`}>
									{row.map((cell, cellIndex) => (
										<TableCell
											key={`cell-${monthIndex}-${rowIndex}-${cellIndex}`}
											style={{
												textAlign: "center",
												width: "7%",
												paddingLeft: 0,
												backgroundColor: "#3a2462",
												color: "white",
											}}
										>
											{cellIndex === 0 ? (
												<span
													style={{
														display: "flex",
														alignItems: "center",
														cursor: "pointer",
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
								<TableCellNoPadding colSpan={15}>
									<Table style={{ minWidth: "100%" }}>
										<TableBody>
											{monthIndex === 0
												? januarySubTableData.map((subRow, subRowIndex) => (
														<TableRow key={`sub-row-${monthIndex}-${subRowIndex}`}>
															{" "}
															{subRow.map((subCell, subCellIndex) => (
																<TableCellNoPadding
																	key={`sub-cell-${monthIndex}-${subRowIndex}-${subCellIndex}`}
																	style={{
																		textAlign: "center",
																		width: "7%",
																		paddingRight: "1.5%",
																	}}
																>
																	{subCell}
																</TableCellNoPadding>
															))}
														</TableRow>
												  ))
												: februarySubTableData.map((subRow, subRowIndex) => (
														<TableRow key={`sub-row-${monthIndex}-${subRowIndex}`}>
															{subRow.map((subCell, subCellIndex) => (
																<TableCellNoPadding
																	key={`sub-cell-${monthIndex}-${subRowIndex}-${subCellIndex}`}
																	style={{
																		textAlign: "center",
																		width: "7%",
																		paddingRight: "1.5%",
																	}}
																>
																	{subCell}
																</TableCellNoPadding>
															))}
														</TableRow>
												  ))}
										</TableBody>
									</Table>
								</TableCellNoPadding>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default JobsFinancialTable;
