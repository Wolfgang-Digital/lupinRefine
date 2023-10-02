import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
	month: string,
	task: string,
	subtask: string,
	staff: string,
	hours: number,
	rate: number,
	value: number,
	hours2: number,
	rate2: number,
	value2: number,
	bdgttoinvoice: number,
	invoiced: number,
	used: number,
	balremain: number,
	bal: boolean
) {
	return {
		month,
		task,
		subtask,
		staff,
		hours,
		rate,
		value,
		hours2,
		rate2,
		value2,
		bdgttoinvoice,
		invoiced,
		used,
		balremain,
		bal,
		history: [
			{
				task: "Management",
				subtask: "Opt",
				staff: "Liam",
			},
		],
	};
}

function Row(props: { row: ReturnType<typeof createData> }) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{row.month}
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="center">{row.task}</TableCell>
				<TableCell align="center">{row.subtask}</TableCell>
				<TableCell align="center">{row.staff}</TableCell>
				<TableCell align="center">{row.hours}</TableCell>
				<TableCell align="center">{row.rate}</TableCell>
				<TableCell align="center">{row.value}</TableCell>
				<TableCell align="center">{row.hours2}</TableCell>
				<TableCell align="center">{row.rate2}</TableCell>
				<TableCell align="center">{row.value2}</TableCell>
				<TableCell align="center">{row.bdgttoinvoice}</TableCell>
				<TableCell align="center">{row.invoiced}</TableCell>
				<TableCell align="center">{row.used}</TableCell>
				<TableCell align="center">{row.balremain}</TableCell>
				<TableCell align="center"></TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={16}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 2 }}>
							<Table size="small">
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.task}>
											<TableCell style={{ paddingLeft: 100 }} align="left">
												{historyRow.task}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [
	createData(
		"Jan",
		"",
		"",
		"",
		28,
		148,
		4148,
		21.5,
		151,
		3248,
		4448,
		4448,
		3248,
		1200,
		false
	),
];

function JobsFinancialTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						{/* Add the 'task', 'subtask', and 'staff' headers */}
						<TableCell align="left">Month</TableCell>
						<TableCell align="center">Task</TableCell>
						<TableCell align="center">Subtask</TableCell>
						<TableCell align="center">Staff</TableCell>
						<TableCell align="center">Hours</TableCell>
						<TableCell align="center">Rate</TableCell>
						<TableCell align="center">Value</TableCell>
						<TableCell align="center">Hours2</TableCell>
						<TableCell align="center">Rate2</TableCell>
						<TableCell align="center">Value2</TableCell>
						<TableCell align="center">Bdgt To Invoice</TableCell>
						<TableCell align="center">Invoiced</TableCell>
						<TableCell align="center">Used</TableCell>
						<TableCell align="center">Bal Remain</TableCell>
						<TableCell align="center">Bal</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.month} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default JobsFinancialTable;
