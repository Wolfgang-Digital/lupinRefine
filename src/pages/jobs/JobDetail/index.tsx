import React, { useState } from "react";
import {
	TextField,
	Typography,
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Tabs,
	Container,
	CssBaseline,
	Paper,
	Slide,
	Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import {
	// JobsData,
	JobsDataWithProjects,
} from "@api/jobs";
import {
	// JobsOverview,
	GetAllJobsWithProjects,
} from "types";
import {
	TabContainer,
	TabContentContainer,
	TabPanelContainer,
} from "@styled-components/jobs";

import CollapsibleGrid from "@components/ClientFinancialsTable";
import CollapsibleHoursGrid from "@components/AllocateHoursTable";
import CollapsibleTasksGrid from "@components/JobTasksTable";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface JobDetailProps {
	job: JobsDataWithProjects;
	onClose: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
	const [tabValue, setTabValue] = useState(0);
	console.log({ job });
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const jobInfoFields: { label: string; field: keyof GetAllJobsWithProjects }[] =
		[
			{ label: "Job ID", field: "client_id" },
			{ label: "Client Name", field: "client_name" },
			{ label: "Project Name", field: "project_name" },
			{ label: "Job Name", field: "job_name_name" },
			// { label: "Job Name", field: "job_name" },
			{ label: "Job Type", field: "job_type_name" },
			{ label: "Tier", field: "tier_name" },
			// { label: "Currency", field: "currency_symbol" },
		];

	return (
		<>
			<Dialog
				fullScreen
				open={true}
				onClose={onClose}
				TransitionComponent={Transition}
				PaperProps={{ style: { marginLeft: "10%", width: "100%" } }}
			>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={onClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{`${job?.client_name}: ${job?.job_name_name}`}
						</Typography>
						<Button autoFocus color="inherit" onClick={onClose}>
							Save
						</Button>
					</Toolbar>
				</AppBar>
				{/* Tabs */}
				<TabContainer>
					<Tabs
						value={tabValue || 0}
						onChange={handleTabChange}
						aria-label="Job Tabs"
					>
						<Tab label="Job Info" />
						<Tab label="Financials" />
						<Tab label="Tasks" />
						<Tab label="Allocations" />
					</Tabs>
				</TabContainer>

				{/* Tab Content */}
				<TabContentContainer>
					<TabPanelContainer
						role="tabpanel"
						hidden={tabValue !== 0}
						id={`tabpanel-0`}
						aria-labelledby={`tab-0`}
					>
						{/* Job Info Tab Content */}
						<Container component="main" maxWidth="lg">
							<CssBaseline />
							<Paper elevation={3} sx={{ padding: "20px" }}>
								<Typography component="h1" variant="h5">
									Edit Job Info
								</Typography>
								<form>
									{jobInfoFields.map((field) => (
										<TextField
											key={field?.field}
											margin="normal"
											fullWidth
											label={field?.label}
											value={job?.[field?.field] || ""}
											// onChange={9e) => () => {}}
										/>
									))}
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										sx={{ mt: 3 }}
									>
										Save Changed
									</Button>
								</form>
							</Paper>
						</Container>
					</TabPanelContainer>

					<TabPanelContainer
						role="tabpanel"
						hidden={tabValue !== 1}
						id={`tabpanel-1`}
						aria-labelledby={`tab-1`}
					>
						<Container component="main" maxWidth="lg">
							<CssBaseline />
							<Paper elevation={3} sx={{ padding: "20px" }}>
								<Typography component="h1" variant="h5">
									Financial Details
								</Typography>
								{/* <ClientFinancials clientId={client?.id || 0} /> */}
								<CollapsibleGrid clientId={job?.job_id || 0} />
							</Paper>
						</Container>
					</TabPanelContainer>

					<TabPanelContainer
						role="tabpanel"
						hidden={tabValue !== 2}
						id={`tabpanel-1`}
						aria-labelledby={`tab-1`}
					>
						<Container component="main" maxWidth="lg">
							<CssBaseline />
							<Paper elevation={3} sx={{ padding: "20px" }}>
								<Typography component="h1" variant="h5">
									Tasks
								</Typography>
								<CollapsibleTasksGrid
									projectId={job?.project_id || 0}
									jobId={job?.job_name_id || 0}
								/>
							</Paper>
						</Container>
					</TabPanelContainer>

					<TabPanelContainer
						role="tabpanel"
						hidden={tabValue !== 3}
						id={`tabpanel-1`}
						aria-labelledby={`tab-1`}
					>
						<Container component="main" maxWidth="lg">
							<CssBaseline />
							<Paper elevation={3} sx={{ padding: 3 }}>
								<Typography component="h1" variant="h5">
									Allocations
								</Typography>

								<CollapsibleHoursGrid
									projectId={job?.project_id || 0}
									jobId={job?.job_id || 0}
									jobNameId={job?.job_name_id || 0}
								/>
							</Paper>
						</Container>
					</TabPanelContainer>
				</TabContentContainer>
			</Dialog>
		</>
	);
};

export default JobDetail;
