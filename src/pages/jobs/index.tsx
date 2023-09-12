import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { Typography, styled } from "@mui/material";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import { getAllJobs, JobsData } from "@api/jobs";
import JobDetail from "./JobDetail";
import {
	AddNewJobButton,
	ButtonContainer,
	JobsContainer,
} from "./StyledComponents";
// import { JobsOverview } from "types";

const JobList: React.FC = () => {
	// const router = useRouter();
	const [jobs, setJobs] = useState<JobsData[]>([]);
	const [selectedJob, setSelectedJob] = useState<JobsData | null>(null);

	useEffect(() => {
		const fetchJobs = async () => {
			const jobsResponse = await getAllJobs();
			if (jobsResponse) {
				setJobs(jobsResponse);
			}
		};
		fetchJobs();
		// console.log(jobs);
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
	const columns: (GridColDef & { field: keyof JobsData })[] = [
		{ field: "job_id", headerName: "Job ID", width: 200 },
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
		{ field: "job_name", headerName: "Job Name", width: 200 },
		{ field: "job_type_name", headerName: "Job Type", width: 200 },
		{ field: "tier_name", headerName: "Client Tier", width: 200 },
		{ field: "currency_symbol", headerName: "Currency", width: 200 },
	];

	const rows = jobs.map((job) => ({
		id: job.job_id,
		job_id: job.job_id,
		client_name: job.client_name,
		job_name: job.job_name,
		job_type_name: job.job_type_name,
		tier_name: job.tier_name,
		currency_symbol: job.currency_symbol,
		status: job.status_code_name,
		department: job.department_name,
	}));
	return (
		<>
			<JobsContainer>
				<Typography gutterBottom variant="h6" component="div">
					Job List
				</Typography>
				<ButtonContainer>
					<AddNewJobButton size="small" variant="contained">
						Add New Job
					</AddNewJobButton>
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
					// onCellClick={(params) => router.push(`/jobs/${params.id}`)}
				/>
				{selectedJob && <JobDetail job={selectedJob} onClose={handleCloseDialog} />}
			</JobsContainer>
		</>
	);
};

export default JobList;
