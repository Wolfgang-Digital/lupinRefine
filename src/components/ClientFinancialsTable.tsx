import React from "react";
import { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getFinancialTable2,
	groupFinancialTableData,
	GroupedFinancialData,
} from "@api/financialTable";
import { TimesheetRowsView2 } from "types";
import { WeekButton } from "@styled-components/timesheet";

type RowData = TimesheetRowsView2 & {
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
	const [financialData, setFinancialData] = useState<TimesheetRowsView2[]>([]);
	const [filteredFinancialData, setFilteredFinancialData] = useState<
		TimesheetRowsView2[]
	>([]);

	const [selectedMonth, setSelectedMonth] = useState(9);

	useEffect(() => {
		fetchGroupedData2(financialData, selectedMonth);
	}, [selectedMonth]);

	function fetchGroupedData2(
		financialTable2: TimesheetRowsView2[],
		selectedMonth: number
	) {
		const myArr: TimesheetRowsView2[] = [];
		const copyFinancialData2 = [...financialTable2.map((item) => ({ ...item }))];
		const groupedData2: GroupedFinancialData = groupFinancialTableData(
			copyFinancialData2,
			selectedMonth
		);
		Object.values(groupedData2).forEach((item) => {
			Object.values(item).forEach((myItem) => {
				myArr.push(myItem);
			});
		});
		setFilteredFinancialData(myArr);
	}

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const financialTable2 = await getFinancialTable2(clientId || 0);
			if (financialTable2) {
				setFinancialData(financialTable2);
				fetchGroupedData2(financialTable2, selectedMonth);
			}
			if (financialTable2) {
				// Map the fetched data to match the RowData type
				const mappedData2: RowData[] = financialTable2.map(
					(item: TimesheetRowsView2) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						month: new Date(
							item.date?.toString() || new Date().toString()
						).getMonth(),
						job: item.job_name_name,
						task: item.task_name,
						staff: item.user_name,
						hours: item.time,
					})
				);
				setFetchedRows(mappedData2);
			}
		}

		fetchData();
	}, []);

	const groupedRows2: { [key: string]: RowData[] } = {};

	// Group the fetched rows by month
	fetchedRows.forEach((row) => {
		if (!groupedRows2[row.month]) {
			groupedRows2[row.month] = [];
		}
		groupedRows2[row.month].push(row);
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
