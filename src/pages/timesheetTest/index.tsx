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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox } from "@mui/material";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

interface SubTask {
	task_id: number | null;
	task_name: string | null;
	time: number | null;
	hours: number | null;
}

interface TimesheetEntries {
	name: string | null;
	hours: number | null;
	job_id: number | null;
	subTasks: SubTask[];
}

function createTimesheetEntry(
	name: string | null,
	hours: number | null,
	job_id: number | null,
	subTasks: SubTask[]
): TimesheetEntries {
	return {
		name,
		hours,
		job_id,
		subTasks,
	};
}

// Example usage
const subTasks1: SubTask[] = [
	{
		task_id: 100,
		task_name: "CRO",
		time: 2,
		hours: 4,
	},
	{
		task_id: 94,
		task_name: "Opt",
		time: 1,
		hours: 3,
	},
	{
		task_id: 98,
		task_name: "Insights",
		time: 0.5,
		hours: 2,
	},
];

const subTasks2: SubTask[] = [
	{
		task_id: 4,
		task_name: "Reviews",
		time: 1.5,
		hours: 3,
	},
	{
		task_id: 5,
		task_name: "One on Ones",
		time: 1,
		hours: 2,
	},
	{
		task_id: 36,
		task_name: "Reporting",
		time: 2,
		hours: 3,
	},
];

const subTasks3: SubTask[] = [
	{
		task_id: 97,
		task_name: "Comms",
		time: 3,
		hours: 4,
	},
	{
		task_id: 96,
		task_name: "Project Management",
		time: 1.5,
		hours: 2,
	},
	{
		task_id: 99,
		task_name: "Outsourcing - Cost & Margin",
		time: 2.25,
		hours: 3,
	},
];

const subTasks4: SubTask[] = [
	{
		task_id: 2,
		task_name: "Client Meetings",
		time: 2,
		hours: 4,
	},
	{
		task_id: 3,
		task_name: "Client Comms",
		time: 1,
		hours: 2,
	},
];

const subTasks5: SubTask[] = [
	{
		task_id: 6,
		task_name: "Big Time",
		time: 1.25,
		hours: 3,
	},
	{
		task_id: 10,
		task_name: "Team Building",
		time: 1,
		hours: 2,
	},
];

const rows2 = [
	createTimesheetEntry("Abbey Seals:Google Ads", 5.5, 3549, subTasks1),
	createTimesheetEntry("Camile Thai: Social", 3.5, 3550, subTasks2),
	createTimesheetEntry("Actavo: Google Ads", 2.25, 3551, subTasks3),
	createTimesheetEntry("Wolfgang Digital: Admin", 3, 3552, subTasks4),
	createTimesheetEntry("Wolfgang Digital: Lupin Project", 2.75, 3553, subTasks5),
];

function Row(props: { row: ReturnType<typeof createTimesheetEntry> }) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": {
						borderBottom: 1,
						borderTop: 1,
						backgroundColor: "#ddd",
						fontWeight: "bold",
					},
				}}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell
					sx={{ borderRight: 1, borderBottom: 1, fontWeight: "bold" }}
					component="th"
					scope="row"
				>
					{row.name}
				</TableCell>
				<TableCell align="right"></TableCell>
				<TableCell align="right"></TableCell>
				<TableCell
					sx={{ borderRight: 1, borderLeft: 1, borderBottom: 1, fontWeight: "bold" }}
					align="center"
				>
					{row.hours}
				</TableCell>
				<TableCell align="right"></TableCell>
				<TableCell align="right">{/* <Checkbox /> */}</TableCell>
				<TableCell align="right">{/* <MoreTimeIcon /> */}</TableCell>
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
									{row.subTasks.map((historyRow) => (
										<TableRow key={historyRow.task_id}>
											<TableCell />
											<TableCell />
											<TableCell />
											<TableCell />
											<TableCell />
											<TableCell component="th" scope="row" width={"150"}>
												{historyRow.task_name}
											</TableCell>
											<TableCell>
												{historyRow.time} of {historyRow.hours}
											</TableCell>
											<TableCell align="right">
												<Checkbox />
											</TableCell>
											<TableCell align="right">
												<MoreTimeIcon />
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

export default function CollapsibleTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow
						sx={{
							"& > *": {
								borderBottom: 1,
								borderTop: 1,
								backgroundColor: "#027860",
								fontWeight: "bold",
							},
						}}
					>
						<TableCell>&nbsp;</TableCell>
						<TableCell sx={{ borderRight: 1, borderBottom: 1, fontWeight: "bold" }}>
							Job
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Task
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Used v Allocated
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Overall Hrs Remaining
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Days Left
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Completed
						</TableCell>
						<TableCell sx={{ border: 1, fontWeight: "bold" }} align="center">
							Timer
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows2.map((row) => (
						<Row key={row.job_id} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
