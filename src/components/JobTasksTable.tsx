import React, { useEffect, useState } from "react";
import {
	Button,
	Grid,
	MenuItem,
	// Accordion,
	// AccordionDetails,
	// AccordionSummary,
	Paper,
	TextField,
	Typography,
	// Toolbar,
	// Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import {
	getAllJobTasks,
	getAllTasks,
	PostJobTaskEntry,
} from "@pages/api/jobTasksView";
import { getAllProjectJobTasks } from "@pages/api/projectJobTasksView";
import {
	// JobTasksView,
	// GetAllJobsWithProjects,
	ProjectJobTasksView,
} from "types";

type RowData = ProjectJobTasksView;

type TaskOption = {
	label: string;
	value: string;
};

type JobTaskEntry = {
	job_id: number;
	task_id: number;
};

const columns = [{ field: "task_name", headerName: "Task", width: 300 }];

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}
function CollapsibleTasksGrid({
	projectId,
	jobId,
}: {
	projectId?: number;
	jobId?: number;
}) {
	const [fetchedRows, setFetchedRows] = useState<RowData[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [tasks, setTasks] = useState<TaskOption[]>([]);
	const taskOptions: TaskOption[] = [];
	const [jobTaskEntries, setJobTaskEntries] = useState<JobTaskEntry[]>([]);

	useEffect(() => {
		// Fetch data from Supabase and update the fetchedRows state
		async function fetchData() {
			const jobTasksTable = await getAllJobTasks(jobId || 0);
			console.log({ jobTasksTable });
			const getTasks = await getAllTasks();
			const getProjectJobTasks = await getAllProjectJobTasks(
				projectId || 0,
				jobId || 0
			);
			console.log(getProjectJobTasks);
			console.log(jobId);
			if (getProjectJobTasks) {
				getTasks?.forEach((task) => {
					taskOptions.push({
						label: task.task_name || "",
						value: task.task_id?.toString() || "0",
					});
				});
			}
			setTasks(taskOptions);
			// console.log(taskOptions);

			if (getProjectJobTasks) {
				// Map the fetched data to match the RowData type
				const mappedData: RowData[] = getProjectJobTasks.map(
					(item: ProjectJobTasksView) => ({
						...item,
						id: item.id,
						job_id: item.job_id,
						task_name: item.task_name,
					})
				);
				setFetchedRows(mappedData);
				// console.log(mappedData);
			}
		}
		fetchData();
	}, []);

	function saveTaskEntry() {
		const dataToPost = {
			jobId: 3551,
			taskId: 2,
		};
		const response = PostJobTaskEntry(dataToPost);
		console.log(response);
	}
	// Function to handle "Add Task" button click
	const handleAddTaskClick = () => {
		setShowForm(true);
	};

	// Function to handle form submission
	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const newJobTaskEntry: JobTaskEntry = {
			job_id: 3551,
			task_id: 1,
		};

		setJobTaskEntries([...jobTaskEntries, newJobTaskEntry]);
	};

	return (
		<>
			<div style={{ height: "100%", width: "100%", overflow: "auto" }}>
				<Grid container spacing={2}>
					{/* First column */}
					<Grid item xs={8}>
						<Paper>
							<DataGrid
								rows={fetchedRows}
								columns={columns}
								components={{ Toolbar: CustomToolbar }}
								hideFooter
								autoHeight
							/>
						</Paper>
					</Grid>
					{/* Second Column */}
					<Grid item xs={4}>
						<Paper
							variant="outlined"
							style={{ textAlign: "center", padding: "30px" }}
						>
							{showForm ? (
								<form onSubmit={handleFormSubmit}>
									<TextField
										label="Date"
										style={{
											width: "100%",
											marginBottom: "20px",
											textAlign: "left",
										}}
									/>
									<TextField
										select
										value={""}
										label="Select Task"
										style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}
									>
										{tasks.map((task) => (
											<MenuItem key={task.value} value={task.value}>
												{task.label}
											</MenuItem>
										))}
									</TextField>
									<Button
										variant="contained"
										color="primary"
										type="submit"
										style={{ padding: "10px" }}
										onClick={saveTaskEntry}
									>
										Save Task Entry
									</Button>
								</form>
							) : (
								<>
									<Button
										variant="contained"
										color="primary"
										onClick={handleAddTaskClick}
										style={{ padding: "10px" }}
									>
										Add Task
									</Button>
									<Typography variant="body1" style={{ padding: "30px" }}>
										Add a task to the displayed job.
									</Typography>
								</>
							)}
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default CollapsibleTasksGrid;
