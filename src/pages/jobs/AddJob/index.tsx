import React, { useEffect, useState } from "react";
import {
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Tabs,
	Tab,
	Container,
	CssBaseline,
	Paper,
	TextField,
	Typography,
	MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import { getAllClients } from "@pages/api/client";
// import { ClientOption } from "@pages/timesheet/index.page";
import { getProjectJobs } from "@pages/api/projectJobsView";
import { getAllProjects } from "@pages/api/projects";
// import { getJobNames } from "@pages/api/jobNames";
import { PostJobEntry } from "@pages/api/jobs";
import { getJobName } from "@src/pages/api/jobNames";

interface AddJobProps {
	onAddJob: () => void;
	size?: "small" | "medium" | "large"; // Add size as an optional prop
}

type ClientOptions = {
	label: string;
	value: number;
};

type ProjectOptions = {
	label: string;
	value: number;
};

type JobOptions = {
	label: string;
	value: number;
};

const AddJob: React.FC<AddJobProps> = ({ size = "small" }) => {
	const [open, setOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSelectedClient("");
		setSelectedProject("");
		setSelectedJob("");
		setOpen(false);
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const buttonSize =
		size === "small" ? "small" : size === "medium" ? "medium" : "large";

	// const jobInfoFields = [
	// 	{ label: "Job Name", field: "jobName" },
	// 	{ label: "Client Name", field: "clientName" },
	// 	{ label: "Job Type", field: "jobType" },
	// 	{ label: "Client Tier", field: "clientTier" },
	// 	// Add more fields as needed
	// ];

	const [clients, setClients] = useState<ClientOptions[]>([]);
	const clientOptions: ClientOptions[] = [];
	const [selectedClient, setSelectedClient] = useState("");
	const [projects, setProjects] = useState<ProjectOptions[]>([]);
	const projectOptions: ProjectOptions[] = [];
	const [selectedProject, setSelectedProject] = useState("");
	const [jobs, setJobs] = useState<JobOptions[]>([]);
	const jobOptions: JobOptions[] = [];
	const [selectedJob, setSelectedJob] = useState("");

	useEffect(() => {
		async function fetchData() {
			const getClients = await getAllClients();
			if (getClients) {
				getClients?.forEach((client) => {
					clientOptions.push({
						label: client.name || "",
						value: client.id || 0,
					});
				});
			}
			setClients(clientOptions);
			const getProjects = await getAllProjects();
			if (getProjects) {
				getProjects?.forEach((project) => {
					projectOptions.push({
						label: project.project_name || "",
						value: project.project_id || 0,
					});
				});
			}
			setProjects(projectOptions);
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function getJobs() {
			const getAllJobNames = await getProjectJobs(Number(selectedProject));
			if (getAllJobNames) {
				getAllJobNames?.forEach((jobName) => {
					jobOptions.push({
						label: jobName.job_name_name || "",
						value: jobName.job_name_id || 0,
					});
				});
			}
			setJobs(jobOptions);
		}
		getJobs();
	}, [selectedProject]);
	let jobName: string;
	async function saveJobEntry() {
		event?.preventDefault();

		const jobNameArr = await getJobName(Number(selectedJob));
		if (jobNameArr) {
			jobName = jobNameArr[0].job_name_name || "";
		}

		const dataToPost = {
			jobNameId: Number(selectedJob),
			jobName: jobName,
			clientId: Number(selectedClient),
			projectId: Number(selectedProject),
			jobId: Number(selectedJob),
			jobCurrencyId: 1,
			jobType: 1,
			jobStatus: 1,
			jobDepartment: 1,
		};
		const response = await PostJobEntry(dataToPost);
		console.log(`PostJobEntry ${response}`);
	}

	return (
		<>
			<Button size={buttonSize} variant="contained" onClick={handleOpen}>
				Add New Job
			</Button>

			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Add New Job
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Save
						</Button>
					</Toolbar>
				</AppBar>

				<Tabs value={tabValue} onChange={handleTabChange} aria-label="Add Job Tabs">
					<Tab label="Job Info" />
				</Tabs>

				<Container component="main" maxWidth="lg" sx={{ marginTop: "40px" }}>
					<CssBaseline />
					<Paper elevation={3} sx={{ padding: "20px" }}>
						<Typography component="h1" variant="h5">
							Job Information
						</Typography>
						<form>
							{/* {jobInfoFields.map((field) => (
								<TextField
									key={field.field}
									margin="normal"
									fullWidth
									label={field.label}
									// Add your field value and onChange handling here
								/>
							))} */}
							<TextField
								select
								value={selectedClient}
								label="Select Client"
								onChange={(event) => setSelectedClient(event.target.value)}
								style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
							>
								{clients.map((client) => (
									<MenuItem key={client.value} value={client.value}>
										{client.label}
									</MenuItem>
								))}
							</TextField>
							{selectedClient && (
								<TextField
									select
									value={selectedProject}
									label="Selecte Project"
									onChange={(event) => setSelectedProject(event.target.value)}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
								>
									{projects.map((project) => (
										<MenuItem key={project.value} value={project.value}>
											{project.label}
										</MenuItem>
									))}
								</TextField>
							)}
							{selectedProject && (
								<TextField
									select
									value={selectedJob}
									label="Select Job"
									onChange={(event) => setSelectedJob(event.target.value)}
									style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
								>
									{jobs.map((job) => (
										<MenuItem key={job.value} value={job.value}>
											{job.label}
										</MenuItem>
									))}
								</TextField>
							)}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={!selectedClient || !selectedProject || !selectedJob}
								onClick={saveJobEntry}
								sx={{ mt: 3 }}
							>
								Save Job
							</Button>
						</form>
					</Paper>
				</Container>
			</Dialog>
		</>
	);
};

export default AddJob;
