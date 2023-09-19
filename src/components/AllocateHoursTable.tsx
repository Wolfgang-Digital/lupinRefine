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
import { getAllAllocatedHours } from "@pages/api/allocateHoursView";
import { AllocateHoursView } from "types";

type RowData = AllocateHoursView;

const columns = [
	{ field: "job_id", headerName: "Job ID", width: 150 },
	{ field: "job_name", headerName: "Job", width: 150 },
	{ field: "task_name", headerName: "Task", width: 150 },
	{ field: "user_name", headerName: "User", width: 150 },
	{ field: "hours", headerName: "Hours", width: 150 },
	{ field: "month", headerName: "Month", width: 150 },
	{ field: "year", headerName: "Year", width: 150 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CollapsibleHoursGrid() {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const allocateHoursTable = await getAllAllocatedHours();

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
						year: item.year,
						month: item.month,
					})
				);
				setFetchedRows(mappedData);
			}
		}
		fetchData();
	}, []);

	const groupedRows: { [key: string]: RowData[] } = {};

	// Group the fetched rows by month
	fetchedRows.forEach((row) => {
		if (!groupedRows[row.month]) {
			groupedRows[row.month] = [];
		}
		groupedRows[row.month].push(row);
	});

	return (
		<div style={{ height: 400, width: "100%" }}>
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
