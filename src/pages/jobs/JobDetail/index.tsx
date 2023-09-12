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
import { JobsData } from "@api/jobs";
import { JobsOverview } from "types";
import {
	TabContainer,
	TabContentContainer,
	TabPanelContainer,
} from "../StyledComponents";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface JobDetailProps {
	job: JobsData;
	onClose: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onClose }) => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const jobInfoFields: { label: string; field: keyof JobsOverview }[] = [
		{ label: "Job ID", field: "job_id" },
		{ label: "Client Name", field: "client_name" },
		{ label: "Job Name", field: "job_name" },
		{ label: "Job Type", field: "job_type_name" },
		{ label: "Tier", field: "tier_name" },
		{ label: "Currency", field: "currency_symbol" },
	];

	return (
		<>
			<Dialog
				fullScreen
				open={true}
				onClose={onClose}
				TransitionComponent={Transition}
				PaperProps={{ style: { marginLeft: "10%", width: "90%" } }}
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
							{`${job?.client_name}: ${job?.job_name}`}
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
											label={field.label}
											value={job?.[field.field] || ""}
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
							</Paper>
						</Container>
					</TabPanelContainer>
				</TabContentContainer>
			</Dialog>
		</>
	);
};

export default JobDetail;
