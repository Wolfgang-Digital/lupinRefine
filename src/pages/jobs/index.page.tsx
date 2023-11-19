import React, { useState, useEffect } from "react";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import { Typography, styled } from "@mui/material";
import {
	// getAllJobs,
	// JobsData,
	getAllJobsWithProjectsQuery,
	JobsDataWithProjects,
} from "@api/jobs";
import JobDetail from "./JobDetail";
import { ButtonContainer, JobsContainer } from "@styled-components/jobs";

// Import the AddJob component
import AddJob from "./AddJob";

const JobList: React.FC = () => {
	const [jobs, setJobs] = useState<JobsDataWithProjects[]>([]);
	const [selectedJob, setSelectedJob] = useState<JobsDataWithProjects | null>(
		null
	);

	useEffect(() => {
		const fetchJobs = async () => {
			const jobsResponse = await getAllJobsWithProjectsQuery();
			if (jobsResponse) {
				setJobs(jobsResponse);
			}
		};
		fetchJobs();
	}, []);

	const handleJobClick = (params: GridCellParams) => {
		setSelectedJob(params.row);
	};

	const handleCloseDialog = () => {
		setSelectedJob(null);
	};

	const HoverableCell = styled("div")({
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			textDecoration: "underline",
			fontWeight: "bold",
		},
	});

	const columns: (GridColDef & { field: keyof JobsDataWithProjects })[] = [
		{
			field: "client_name",
			headerName: "Client Name",
			width: 200,
			renderCell: (params: GridRenderCellParams) => (
				<HoverableCell onClick={() => handleJobClick(params)}>
					{params.value || ""}
				</HoverableCell>
			),
		},
		{ field: "project_name", headerName: "Project Name", width: 200 },
		{ field: "job_name_name", headerName: "Job Name", width: 200 },
		// { field: "job_type_name", headerName: "Job Type", width: 200 },
		{ field: "tier_name", headerName: "Client Tier", width: 200 },
		{ field: "job_id", headerName: "Job ID", width: 200 },
		// { field: "job_id", headerName: "Job ID", width: 200 },
		// { field: "currency_symbol", headerName: "Currency", width: 200 },
	];

	const rows = jobs.map((job) => ({
		id: job.job_id,
		job_id: job.job_id,
		client_name: job.client_name,
		project_name: job.project_name,
		project_id: job.project_id,
		job_name_name: job.job_name_name,
		job_name_id: job.job_name_id,
		job_name: job.job_name_name,
		job_type_name: job.job_type_name,
		tier_name: job.tier_name,
		currency_symbol: job.currency_symbol,
		status: job.status_code_name,
		department: job.department_name,
	}));

	return (
		<>
			<JobsContainer>
				<Typography gutterBottom variant="h5" component="div">
					Job List
				</Typography>
				<ButtonContainer>
					{/* Use the AddJob component to add a new job */}
					<AddJob
						onAddJob={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				</ButtonContainer>

				<DataGrid
					rows={rows}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					getRowId={(row) => row.id}
					onCellClick={(params: GridCellParams) => {
						if (params.field == "name") {
							handleJobClick(params);
						}
					}}
				/>

				{selectedJob && <JobDetail job={selectedJob} onClose={handleCloseDialog} />}
			</JobsContainer>
		</>
	);
};

export default JobList;
