import React, { useState, useEffect } from "react";
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import { Typography, styled, TextField } from "@mui/material";
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
	const [displayedJobs, setDisplayedJobs] = useState<JobsDataWithProjects[]>([]);
	const [searchText, setSearchText] = useState("");

	const [selectedJob, setSelectedJob] = useState<JobsDataWithProjects | null>(
		null
	);

	useEffect(() => {
		const fetchJobs = async () => {
			const jobsResponse = await getAllJobsWithProjectsQuery();
			if (jobsResponse) {
				setJobs(jobsResponse);
				setDisplayedJobs(jobsResponse);
			}
		};
		fetchJobs();
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchText = event.target.value;
		setSearchText(newSearchText);

		const filteredJobs = jobs.filter((job) => {
			// Adjust this logic to search in the desired fields
			return (
				job.client_name &&
				job.client_name.toLowerCase().includes(newSearchText.toLowerCase())
			);
		});

		setDisplayedJobs(filteredJobs);
	};

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

	//const rows = displayedJobs.map((job) => ({
	//	id: job.id,
	//	job_id: job.job_id,
	//	client_name: job.client_name,
	//	project_name: job.project_name,
	//	project_id: job.project_id,
	//	job_name_name: job.job_name_name,
	//	job_name_id: job.job_name_id,
	//	// job_name: job.job_name,
	//	job_type_name: job.job_type_name,
	//	tier_name: job.tier_name,
	//	currency_symbol: job.currency_symbol,
	//	status: job.status_code_name,
	//	department: job.department_name,
	//}));

	return (
		<>
			<JobsContainer style={{ height: "100vh", paddingBottom: "100px" }}>
				<Typography gutterBottom variant="h5" component="div">
					Job List
				</Typography>
				<ButtonContainer style={{ paddingBottom: "20px" }}>
					<TextField
						label="Search Jobs"
						variant="outlined"
						value={searchText}
						onChange={handleSearchChange}
						style={{ marginRight: "20px" }} // Adjust styling as needed
						size="small"
					/>

					<AddJob
						size="small"
						onAddJob={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				</ButtonContainer>

				<DataGrid
					style={{ height: "100%" }}
					rows={displayedJobs.map((job) => ({
						id: job.id,
						job_id: job.job_id,
						client_name: job.client_name,
						project_name: job.project_name,
						project_id: job.project_id,
						job_name_name: job.job_name_name,
						job_name_id: job.job_name_id,
						job_notes: job.job_notes,
						job_start_date: job.job_start_date,
						job_type_name: job.job_type_name,
						tier_name: job.tier_name,
						currency_symbol: job.currency_symbol,
						status: job.status_code_name,
						department: job.department_name,
					}))}
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
import { getServerSidePropsWithAuth } from "@pages/authenticationRedirector";
export const getServerSideProps = getServerSidePropsWithAuth(["admin", "user"]);
