import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, withStyles } from "@mui/material";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

import { TimesheetRowsView } from "@types";

//  get rows for "Allocated Tasks"
import { getAllAllocatedHours } from "@pages/api/allocateHoursView";

import { getAllTimesheetRows } from "@pages/api/timesheetRows";

import { getTaskByJobId } from "@pages/api/tasks";
import { useEffect } from "react";

function createData(
	job: string,
	task: string,
	usedvallocated: string,
	hrsremaining: number,
	daysleft: number,
	completed: string,
	timer: string,
	history: [{ task_name: string; time: string; hours: number }]
) {
	return {
		job,
		task,
		usedvallocated,
		hrsremaining,
		daysleft,
		completed,
		timer,
		history: [
			{
				task_name: "Opt",
				time: 1,
				hours: 3,
			},
			{
				task_name: "Reporting",
				time: 1.5,
				hours: 4,
			},
			{
				task_name: "Reviews",
				time: 0.5,
				hours: 2,
			},
		],
	};
}

async function fetchTasksAndJobsWithFilter() {
	try {
		const allocatedHoursResponse = await getAllAllocatedHours(57, 10);
		const timesheetResponse = await getAllTimesheetRows(57);
		// console.log(allocatedHoursResponse);
		// console.log(timesheetResponse);

		if (!allocatedHoursResponse || !timesheetResponse) {
			throw new Error("Error fetching data");
		}
		for (let i: number = 0; i < allocatedHoursResponse.length; i++) {
			for (let j: number = 0; j < timesheetResponse.length; j++) {
				if (timesheetResponse[j].job_id === allocatedHoursResponse[i].job_id) {
					if (
						timesheetResponse[j].task_name === allocatedHoursResponse[i].task_name
					) {
						// console.log(timesheetResponse[j]);
						const task_name = timesheetResponse[j].name;
						const time = timesheetResponse[j].name;
						const hours = timesheetResponse[j].job_id;
						console.log(
							createData(
								timesheetResponse[j].name || "",
								timesheetResponse[j].task_name || "",
								`${timesheetResponse[j].time} of ${allocatedHoursResponse[i].hours}`,
								allocatedHoursResponse[i].hours ||
									0 - Math.floor(timesheetResponse[j].time || 0),
								0,
								" ",
								" ",
								{ task_name, time, hours }
								// [
								// 	{
								// 		timesheetResponse[j].task_name,
								// 		timesheetResponse[j].time,
								// 		allocatedHoursResponse[i].hours,
								// 	},
								// ]
							)
						);
					}
				}
			}
		}
	} catch (error) {
		console.error("Error fetching jobs and tasks: ", error);
	}
}

fetchTasksAndJobsWithFilter();

function Row(props: { row: ReturnType<typeof createData> }) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.job}
				</TableCell>
				<TableCell align="right">{row.task}</TableCell>
				<TableCell align="right">{row.usedvallocated}</TableCell>
				<TableCell align="right">{row.hrsremaining}</TableCell>
				<TableCell align="right">{row.daysleft}</TableCell>
				<TableCell align="right">
					<Checkbox />
				</TableCell>
				<TableCell align="right">
					<MoreTimeIcon />
				</TableCell>
			</TableRow>
			<TableRow sx={{ [`& .${tableCellClasses.root}`]: { borderBottom: "none" } }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow></TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.task_name}>
											<TableCell />
											<TableCell />
											<TableCell />
											<TableCell component="th" scope="row" width={"150"}>
												{historyRow.task_name}
											</TableCell>
											<TableCell>
												{historyRow.time} of {historyRow.hours}
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
	createData("Abbey Seals: Google Ads", " ", " ", 7.5, 29, " ", " "),
	createData("Camile Thai: Social", " ", " ", 7.5, 29, " ", " "),
	createData("Wolfgang Digital: Admin", " ", " ", 7.5, 29, " ", " "),
	createData("Wolfgang Digital: Lupin Project", " ", " ", 7.5, 29, " ", " "),
];

export default function CollapsibleTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell>&nbsp;</TableCell>
						<TableCell>Job</TableCell>
						<TableCell align="right">Task</TableCell>
						<TableCell align="right">Used v Allocated</TableCell>
						<TableCell align="right">Overall Hrs Remaining</TableCell>
						<TableCell align="right">Days Left</TableCell>
						<TableCell align="right">Completed</TableCell>
						<TableCell align="right">Timer</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<Row key={row.job} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
