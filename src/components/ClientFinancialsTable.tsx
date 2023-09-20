import React from "react";
import { useEffect, useState } from "react";
// import {
// 	Accordion,
// 	AccordionDetails,
// 	AccordionSummary,
// 	Paper,
// 	Typography,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

type RowData = FinancialTable & {
	month: string;
	// date: string;
	// value: number;
	// budgetToInvoice: number;
	// invoiced: number;
	// balRemaining: number;
	// balanced: boolean;
};

// function createData(
// 	id: number,
// 	month: string,
// 	job: string,
// 	task: string,
// 	staff: string,
// 	hours: number,
// 	rate: number,
// 	value: number,
// 	budgetToInvoice: number,
// 	invoiced: number,
// 	balRemaining: number,
// 	balanced: boolean
// ): RowData {
// 	return {
// 		id,
// 		month,
// 		job,
// 		task,
// 		staff,
// 		hours,
// 		rate,
// 		value,
// 		budgetToInvoice,
// 		invoiced,
// 		balRemaining,
// 		balanced,
// 	};
// }

const columns = [
	{ field: "job_id", headerName: "Job ID", width: 100 },
	{ field: "job_name", headerName: "Job", width: 350 },
	{ field: "task_name", headerName: "Task", width: 250 },
	{ field: "user_name", headerName: "Staff", width: 150 },
	{ field: "time", headerName: "Hours", width: 100 },
	{ field: "rate", headerName: "Rate", width: 100 },
	{ field: "value", headerName: "Value", width: 100 },
	// { field: "budgetToInvoice", headerName: "Budget to Invoice", width: 150 },
	// { field: "invoiced", headerName: "Invoiced", width: 120 },
	// { field: "balRemaining", headerName: "Bal Remaining", width: 150 },
	// { field: "balanced", headerName: "Balanced", width: 120, type: "boolean" },
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
	const [financialData, setFinancialData] = useState<FinancialTable[]>([]);
	const [filteredFinancialData, setFilteredFinancialData] = useState<
		FinancialTable[]
	>([]);

	const [selectedMonth, setSelectedMonth] = useState(6);

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
					(item: FinancialTable) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						month: formatDate(item.date?.toString() || new Date().toString()), // Format the month name
						job: item.job_name,
						task: item.task_name,
						staff: item.user_name,
						hours: item.time,
						// rate: item.rate,
						// value: 0, // Add to table
						// budgetToInvoice: 0, // Add to table
						// invoiced: 0, // Add to table
						// balRemaining: 0, // Add to table
						// balanced: false, // Add to table
					})
				);
				setFetchedRows(mappedData);
			}
		}

		fetchData();
	}, []);

	// Function to format the date
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return `${date.toLocaleString("default", {
			month: "long",
		})} ${date.getFullYear()}`;
	}

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
			<button
				onClick={() => {
					setSelectedMonth(selectedMonth - 1);
				}}
			>
				Previous month
			</button>
			selectedMonth: {selectedMonth}
			<button
				onClick={() => {
					setSelectedMonth(selectedMonth + 1);
				}}
			>
				Next month
			</button>
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
	);
}

export default CollapsibleGrid;
