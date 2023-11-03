import React from "react";
import { useEffect, useState } from "react";
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

type RowData = TimesheetRowsView & {
	month: number;
};

const columns = [
	{ field: "job_id", headerName: "Job ID", width: 100 },
	{ field: "job_name", headerName: "Job", width: 200 },
	{ field: "task_name", headerName: "Task", width: 250 },
	{ field: "user_name", headerName: "Staff", width: 150 },
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

function CollapsibleGrid({ clientId }: { clientId?: number }) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [financialData, setFinancialData] = useState<TimesheetRowsView[]>([]);
	const [filteredFinancialData, setFilteredFinancialData] = useState<
		TimesheetRowsView[]
	>([]);

	const [selectedMonth, setSelectedMonth] = useState(9);

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
		setFilteredFinancialData(myArr);
	}

	useEffect(() => {
		fetchGroupedData(financialData, selectedMonth);
	}, [selectedMonth]);

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const financialTable = await getFinancialTable(clientId || 0);
			if (financialTable) {
				setFinancialData(financialTable);
				fetchGroupedData(financialTable, selectedMonth);
			}
			if (financialTable) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = financialTable.map(
					(item: TimesheetRowsView) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						month: new Date(
							item.date?.toString() || new Date().toString()
						).getMonth(), // Format the month name
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

	const groupedRows: { [key: string]: RowData[] } = {};

	// Group the fetched rows by month
	fetchedRows.forEach((row) => {
		if (!groupedRows[row.month]) {
			groupedRows[row.month] = [];
		}
		groupedRows[row.month].push(row);
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
	// console.log(selectedMonth);
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
			<div style={{ paddingTop: "20px" }}>
				<DataGrid
					rows={filteredFinancialData}
					columns={columns.map((col) => ({
						...col,
						editable: true, // Set all columns as editable
					}))}
					components={{
						Toolbar: CustomToolbar,
					}}
					hideFooter
					autoHeight
					getRowId={(row) => row.id || 0}
				/>
			</div>
		</div>
	);
}

export default CollapsibleGrid;
