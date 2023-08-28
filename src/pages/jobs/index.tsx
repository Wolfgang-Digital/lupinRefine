import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { getAllJobs } from 'src/pages/api/jobs';
import { Job } from 'types';

const jobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	useEffect(() => {
		async function fetchJobs() {
			const jobsResponse = await getAllJobs();
			if (jobsResponse) {
				setJobs(jobsResponse);
			}
		}
		fetchJobs();
	}, []);

	const columns: (GridColDef & { field: keyof Job })[] = [
		{ field: 'job_name', headerName: 'job name', width: 200 },
		{ field: 'job_type', headerName: 'job type', width: 200 },
		{ field: 'job_start_date', headerName: 'job start date', width: 200 },
	];
	return (
		<div style={{ height: '160vh!important', width: '100%' }}>
			<Typography gutterBottom variant='h6' component='div'>
				Job List
			</Typography>
			<DataGrid
				rows={jobs}
				columns={columns}
				getRowId={(row: Job) => row.job_id}
			/>
		</div>
	);
};

export default jobList;
