import React, { useEffect, useState } from "react";
import {
	// Accordion,
	// AccordionDetails,
	// AccordionSummary,
	Paper,
	// Toolbar,
	// Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { getAllJobTasks } from "@pages/api/jobTasksView";
import { JobTasksView } from "types";

type RowData = JobTasksView;

const columns = [{ field: "task_name", headerName: "Task", width: 300 }];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CollapsibleTasksGrid({ jobId }: { jobId?: number }) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const jobTasksTable = await getAllJobTasks(jobId || 0);

			if (jobTasksTable) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = jobTasksTable.map((item: JobTasksView) => ({
					...item,
					id: item.id,
					job_id: item.job_id,
					task_name: item.task_name,
				}));
				setFetchedRows(mappedData);
			}
		}
		fetchData();
	}, []);

	return (
		<div style={{ height: "100%", width: "100%", overflow: "auto" }}>
			<Paper>
				<DataGrid
					rows={fetchedRows}
					columns={columns}
					components={{ Toolbar: CustomToolbar }}
					hideFooter
					autoHeight
				/>
			</Paper>
		</div>
	);
}

export default CollapsibleTasksGrid;
