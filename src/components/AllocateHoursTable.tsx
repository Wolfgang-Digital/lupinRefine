import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Paper,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getAllAllocatedHours,
	getJobAllocatedHoursPerMonth,
} from "@pages/api/allocateHoursView";
import { AllocateHoursView } from "types";
import { WeekButton } from "@styled-components/timesheet";

type RowData = AllocateHoursView;

const columns = [
	// { field: "job_id", headerName: "Job ID", width: 150 },
	// { field: "job_name", headerName: "Job", width: 150 },
	{ field: "task_name", headerName: "Task", width: 300 },
	{ field: "user_name", headerName: "Wolfganger", width: 150 },
	{ field: "hours", headerName: "Hours Allocated", width: 150 },
	// { field: "month", headerName: "Month", width: 150 },
	// { field: "year", headerName: "Year", width: 150 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CollapsibleHoursGrid({ jobId }: { jobId?: number }) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [selectedMonth, setSelectedMonth] = useState(9);

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const allocateHoursTable = await getJobAllocatedHoursPerMonth(jobId || 0, 9);

			if (allocateHoursTable) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = allocateHoursTable.map(
					(item: AllocateHoursView) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						job_name: item.job_name,
						task_name: item.task_name,
						user_name: item.user_name,
						hours: item.hours,
						// year: item.year,
						// month: item.month,
					})
				);
				setFetchedRows(mappedData);
				console.log(fetchedRows);
			}
		}
		fetchData();
	}, []);

	const groupedRows: { [key: string]: RowData[] } = {};
	// Group the fetched rows by month
	fetchedRows.forEach((row) => {
		if (!groupedRows[row.month || 0]) {
			groupedRows[row.month || 0] = [];
		}
		groupedRows[row.month || 0].push(row);
	});

	const monthNames: string[] = [
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

	const monthName = monthNames[selectedMonth];

	return (
		<div style={{ height: "100%", width: "100%", overflow: "auto" }}>
			<div style={{ display: "flex", paddingTop: "20px" }}>
				<WeekButton
					onClick={() => {
						setSelectedMonth(selectedMonth - 1);
					}}
				>
					Previous month
				</WeekButton>
				<div
					style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "8px" }}
				>
					{monthName}
				</div>
				<WeekButton
					onClick={() => {
						setSelectedMonth(selectedMonth + 1);
					}}
				>
					Next month
				</WeekButton>
			</div>
			{Object.keys(groupedRows).map((month) => (
				<Accordion key={month}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>{month}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Paper>
							<DataGrid
								rows={groupedRows[month]}
								columns={columns.map((col) => ({
									...col,
									editable: true,
								}))}
								components={{
									Toolbar: CustomToolbar,
								}}
								hideFooter
								autoHeight
							/>
						</Paper>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
}

export default CollapsibleHoursGrid;
