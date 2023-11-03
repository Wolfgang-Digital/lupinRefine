import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getFinancialTable,
	groupFinancialTableData,
	GroupedFinancialData,
} from "@api/financialTable";
import { TimesheetRowsView } from "types";
import { WeekButton } from "@styled-components/timesheet";
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import JobsFinancialTable from "@components/JobsFinancialTable";
type RowData = TimesheetRowsView & {
	month: number;
	job: string;
	actualValue: number;
	allocatedValue: number;
};

const columns = [
	{ field: "project_id", headerName: "Project ID", width: 100 },
	{ field: "project_name", headerName: "Project", width: 100 },
	{ field: "allocated", headerName: "Allocated: ", width: 100 },
	{ field: "hours", headerName: "Hours", width: 75 },
	{ field: "rate", headerName: "Rate", width: 75 },
	{ field: "allocatedValue", headerName: "Value", width: 100 },
	{ field: "actuals", headerName: "Actuals: ", width: 100 },
	{ field: "time", headerName: "Hours", width: 75 },
	{ field: "actualRate", headerName: "Rate", width: 75 },
	{ field: "actualValue", headerName: "Value", width: 100 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const groupByJobId = (data: TimesheetRowsView[]) => {
	const projectData = new Map();

	data.forEach((entry: TimesheetRowsView) => {
		const projectId = entry.project_id;
		if (projectData.has(projectId)) {
			// If the project_id is already in the map, update the time and rate
			const existingProject = projectData.get(projectId);
			existingProject.hours += entry.hours;
			existingProject.time += entry.time;
			existingProject.rate += entry.rate;
			existingProject.allocatedValue += (entry.rate || 0) * (entry?.hours || 0);
			existingProject.actualValue += (entry.rate || 0) * (entry?.time || 0);
			existingProject.count++;
		} else {
			// If the project_id is not in the map, add a new entry
			projectData.set(projectId, {
				...entry,
				project_id: projectId,
				time: entry.time,
				rate: entry.rate,
				actualRate: entry.rate,
				allocatedValue: (entry.rate || 0) * (entry?.hours || 0),
				actualValue: (entry.rate || 0) * (entry?.time || 0),
				count: 1,
			});
		}
	});

	// Calculate the average rate for each project
	projectData.forEach((project) => {
		project.rate /= project.count;
	});

	// Convert the Map back to an array
	const result = Array.from(projectData.values());
	return result;
};
function JobsInfoGrid({ clientId }: { clientId?: number }) {
	const [financialData, setFinancialData] = useState<TimesheetRowsView[]>([]);
	const [filteredFinancialData, setFilteredFinancialData] = useState<
		TimesheetRowsView[]
	>([]);

	const [selectedMonth, setSelectedMonth] = useState(9);
	const [selectedProject, setSelectedProject] = useState<RowData | null>(null);
	const [openDialog, setOpenDialog] = useState(false);

	function fetchGroupedData(
		financialTable: TimesheetRowsView[],
		selectedMonth: number
	) {
		const myArr: TimesheetRowsView[] = [];
		const copyFinancialData = [...financialTable.map((item) => ({ ...item }))];
		const groupedData: GroupedFinancialData = groupFinancialTableData(
			copyFinancialData,
			selectedMonth
		);
		Object.values(groupedData).forEach((item) => {
			Object.values(item).forEach((myItem) => {
				myArr.push(myItem);
			});
		});
		const groupedArr = groupByJobId(myArr);
		setFilteredFinancialData(groupedArr);
	}

	useEffect(() => {
		fetchGroupedData(financialData, selectedMonth);
	}, [selectedMonth]);

	useEffect(() => {
		async function fetchData() {
			const financialTable = await getFinancialTable(clientId || 0);
			if (financialTable) {
				setFinancialData(financialTable);
				fetchGroupedData(financialTable, selectedMonth);
			}
		}

		fetchData();
	}, []);

	const handleProjectClick = (rowData: RowData) => {
		setSelectedProject(rowData);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedProject(null);
	};

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
		<div
			style={{
				height: "100%",
				width: "100%",
				overflow: "auto",
			}}
		>
			<div style={{ display: "flex", paddingTop: "20px" }}>
				<WeekButton
					onClick={() => {
						setSelectedMonth(selectedMonth - 1);
					}}
				>
					Previous month
				</WeekButton>
				<div
					style={{
						paddingLeft: "20px",
						paddingRight: "20px",
						paddingTop: "8px",
					}}
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

			<div style={{ paddingTop: "20px" }}>
				<DataGrid
					rows={filteredFinancialData}
					columns={columns.map((col) => ({
						...col,
						editable: true,
					}))}
					components={{
						Toolbar: CustomToolbar,
					}}
					hideFooter
					autoHeight
					getRowId={(row) => row.id || 0}
					onCellClick={(params) => {
						if (params.field === "project_name") {
							handleProjectClick(params.row as RowData);
						}
					}}
				/>
			</div>
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullScreen
				maxWidth="lg"
				PaperProps={{ style: { width: "100%" } }}
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="close"
							onClick={handleCloseDialog}
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{selectedProject?.project_name} - Financials
						</Typography>
						<Button autoFocus color="inherit">
							Save
						</Button>
					</Toolbar>
				</AppBar>
				{selectedProject && (
					<>
						<DialogContent>
							<JobsFinancialTable
								projectId={selectedProject.project_id || 0}
								clientId={clientId || 0}
							/>
						</DialogContent>
						<DialogActions></DialogActions>
					</>
				)}
			</Dialog>
		</div>
	);
}

export default JobsInfoGrid;
