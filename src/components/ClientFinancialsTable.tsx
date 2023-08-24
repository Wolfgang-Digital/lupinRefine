import * as React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Paper,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from '@mui/x-data-grid';
import supabase from 'src/config/supaBaseClient';

type RowData = {
	id: number;
	month: string;
	job: string;
	task: string;
	staff: string;
	hours: number;
	rate: number;
	value: number;
	budgetToInvoice: number;
	invoiced: number;
	balRemaining: number;
	balanced: boolean;
};

function createData(
	id: number,
	month: string,
	job: string,
	task: string,
	staff: string,
	hours: number,
	rate: number,
	value: number,
	budgetToInvoice: number,
	invoiced: number,
	balRemaining: number,
	balanced: boolean
): RowData {
	return {
		id,
		month,
		job,
		task,
		staff,
		hours,
		rate,
		value,
		budgetToInvoice,
		invoiced,
		balRemaining,
		balanced,
	};
}

const columns = [
	{ field: 'job', headerName: 'Job', width: 150 },
	{ field: 'task', headerName: 'Task', width: 150 },
	{ field: 'staff', headerName: 'Staff', width: 150 },
	{ field: 'hours', headerName: 'Hours', width: 100 },
	{ field: 'rate', headerName: 'Rate', width: 100 },
	{ field: 'value', headerName: 'Value', width: 100 },
	{ field: 'budgetToInvoice', headerName: 'Budget to Invoice', width: 150 },
	{ field: 'invoiced', headerName: 'Invoiced', width: 120 },
	{ field: 'balRemaining', headerName: 'Bal Remaining', width: 150 },
	{ field: 'balanced', headerName: 'Balanced', width: 120, type: 'boolean' },
];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

function CollapsibleGrid() {
	const [fetchedRows, setFetchedRows] = React.useState<RowData[]>([]);

	React.useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const { data, error } = await supabase
				.from('timesheet_rows_byuser_v4')
				.select(
					'id, job_id, client_name, job_name, task_name, time, user_name, date, rate'
				);
			console.log('Adsada');

			if (error) {
				console.error('Error fetching data:', error);
			} else {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = data.map((item: any) => ({
					id: item.id,
					month: formatDate(item.date), // Format the month name
					job: item.job_name,
					task: item.task_name,
					staff: item.user_name,
					hours: item.time,
					rate: item.rate,
					value: 0, // Add to table
					budgetToInvoice: 0, // Add to table
					invoiced: 0, // Add to table
					balRemaining: 0, // Add to table
					balanced: false, // Add to table
				}));
				setFetchedRows(mappedData);
			}
		}

		fetchData();
	}, []);

	// Function to format the date
	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return `${date.toLocaleString('default', {
			month: 'long',
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
		<div style={{ height: 400, width: '100%' }}>
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
									editable: true, // Set all columns as editable
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

export default CollapsibleGrid;
