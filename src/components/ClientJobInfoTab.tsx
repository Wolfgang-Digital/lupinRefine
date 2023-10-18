import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getFinancialTable,
	groupFinancialTableData,
} from "@api/financialTable";
import { FinancialTable } from "types";
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

type RowData = FinancialTable & {
	month: string;
	job: string;
};

const columns = [
	{ field: "project_id", headerName: "Project ID", width: 100 },
	{ field: "project_name", headerName: "Project", width: 100 },
	{ field: "allocated", headerName: "Allocated: ", width: 100 },
	{ field: "time", headerName: "Hours", width: 75 },
	{ field: "rate", headerName: "Rate", width: 75 },
	{ field: "value", headerName: "Value", width: 100 },
	{ field: "actuals", headerName: "Actuals: ", width: 100 },
	{ field: "time", headerName: "Hours", width: 75 },
	{ field: "rate", headerName: "Rate", width: 75 },
	{ field: "value", headerName: "Value", width: 100 },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function JobsInfoGrid({ clientId }: { clientId?: number }) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [financialData, setFinancialData] = useState<FinancialTable[]>([]);
	const [filteredFinancialData, setFilteredFinancialData] = useState<
		FinancialTable[]
	>([]);

	const [selectedMonth, setSelectedMonth] = useState(9);
	const [selectedJob, setSelectedJob] = useState<RowData | null>(null);
	const [openDialog, setOpenDialog] = useState(false);

	function fetchGroupedData(
		financialTable: FinancialTable[],
		selectedMonth: number
	) {
		const myArr: FinancialTable[] = [];
		const copyFinancialData = [...financialTable.map((item) => ({ ...item }))];
		const groupedData = groupFinancialTableData(copyFinancialData, selectedMonth);
		Object.values(groupedData).forEach((item) => {
			Object.values(item).forEach((myItem) => {
				myArr.push(myItem);
			});
		});
		setFilteredFinancialData(myArr);
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
			if (financialTable) {
				const mappedData: RowData[] = financialTable.map(
					(item: FinancialTable) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						month: formatDate(item.date?.toString() || new Date().toString()),
						job: item.job_name,
						task: item.task_name,
						staff: item.user_name,
						hours: item.time,
					})
				);
				setFetchedRows(mappedData);
			}
		}

		fetchData();
	}, []);

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return `${date.toLocaleString("default", {
			month: "long",
		})} ${date.getFullYear()}`;
	}

	const groupedRows: { [key: string]: RowData[] } = {};

	fetchedRows.forEach((row) => {
		if (!groupedRows[row.month]) {
			groupedRows[row.month] = [];
		}
		groupedRows[row.month].push(row);
	});

	const handleJobClick = (rowData: RowData) => {
		setSelectedJob(rowData);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedJob(null);
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
	console.log(filteredFinancialData);
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
							handleJobClick(params.row as RowData);
						}
					}}
				/>
			</div>
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				fullScreen
				maxWidth="lg"
				PaperProps={{ style: { marginLeft: "5%", width: "100%" } }}
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
							{selectedJob?.job_name} - Financials
						</Typography>
						<Button autoFocus color="inherit">
							Save
						</Button>
					</Toolbar>
				</AppBar>
				{selectedJob && (
					<>
						<DialogContent>
							<JobsFinancialTable />
						</DialogContent>
						<DialogActions></DialogActions>
					</>
				)}
			</Dialog>
		</div>
	);
}

export default JobsInfoGrid;
