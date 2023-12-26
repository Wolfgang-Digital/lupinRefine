import { TimesheetRowsView, MonthlyTimesheetRowsView } from "types";

type Task = {
	task_id: number;
	task_name: string;
	time: number;
	hours?: number;
};

type Job = {
	// job_id: number;
	jobs_id: number;
	job_name: string;
	job_name_id: number;
	tasks: Task[];
};
type Project = {
	project_id: number | null;
	project_name: string;
	jobs: Job[];
};
type Client = {
	client_id: number;
	client_name: string;
	projects: Project[];
};

export type GroupedTimesheets = Client[];
export type MonthlyGroupedTimesheets = Client[];

export const groupMonthlyTimesheets = (
	timesheets: MonthlyTimesheetRowsView[]
) => {
	return timesheets.reduce((acc, curr) => {
		const existingClientEntry = acc.find(
			(entry: Client) => entry.client_id === curr.client_id
		);
		if (existingClientEntry) {
			const existingProjectEntry = existingClientEntry.projects.find(
				(project: Project) => project.project_id === curr.project_id
			);
			if (existingProjectEntry) {
				const existingJobEntry = existingProjectEntry.jobs.find(
					(job: Job) => job.jobs_id === curr.jobs_id
				);
				if (existingJobEntry) {
					const existingTaskEntry = existingJobEntry.tasks.find(
						(task: Task) => task.task_id === curr.task_id
					);
					if (existingTaskEntry) {
						existingTaskEntry.time += curr.time || 0;
					} else {
						existingJobEntry.tasks.push({
							task_id: curr?.task_id || 0,
							task_name: curr?.task_name || "",
							time: curr?.time || 0,
							hours: curr?.hours || 0,
						});
					}
				} else {
					existingProjectEntry.jobs.push({
						// job_id: curr?.job_id || 0,
						jobs_id: curr?.jobs_id || 0,
						job_name: curr?.job_name || "",
						job_name_id: curr?.job_name_id || 0,
						tasks: [
							{
								task_id: curr?.task_id || 0,
								task_name: curr?.task_name || "",
								time: curr?.time || 0,
								hours: curr?.hours || 0,
							},
						],
					});
				}
			} else {
				existingClientEntry.projects.push({
					project_id: curr?.project_id || 0,
					project_name: curr?.project_name || "",
					jobs: [
						{
							// job_id: curr?.job_id || 0,
							jobs_id: curr?.jobs_id || 0,
							job_name: curr?.job_name || "",
							job_name_id: curr?.job_name_id || 0,
							tasks: [
								{
									task_id: curr?.task_id || 0,
									task_name: curr?.task_name || "",
									time: curr?.time || 0,
									hours: curr?.hours || 0,
								},
							],
						},
					],
				});
			}
		} else {
			acc.push({
				client_name: curr?.name || "",
				client_id: curr?.client_id || 0,
				projects: [
					{
						project_id: curr?.project_id || 0,
						project_name: curr?.project_name || "",
						jobs: [
							{
								// job_id: curr?.job_id || 0,
								jobs_id: curr?.jobs_id || 0,
								job_name: curr?.job_name || "",
								job_name_id: curr?.job_name_id || 0,
								tasks: [
									{
										task_id: curr?.task_id || 0,
										task_name: curr?.task_name || "",
										time: curr?.time || 0,
										hours: curr?.hours || 0,
									},
								],
							},
						],
					},
				],
			});
		}
		return acc;
	}, [] as GroupedTimesheets);
};

export const groupTimesheets = (timesheets: TimesheetRowsView[]) => {
	return timesheets.reduce((acc, curr) => {
		const existingClientEntry = acc.find(
			(entry: Client) => entry.client_id === curr.client_id
		);

		if (existingClientEntry) {
			const existingProjectEntry = existingClientEntry.projects.find(
				(project: Project) => project.project_id === curr.project_id
			);
			if (existingProjectEntry) {
				const existingJobEntry = existingProjectEntry.jobs.find(
					(job: Job) => job.jobs_id === curr.jobs_id
				);
				if (existingJobEntry) {
					const existingTaskEntry = existingJobEntry.tasks.find(
						(task: Task) => task.task_id === curr.task_id
					);
					if (existingTaskEntry) {
						existingTaskEntry.time += curr.time || 0;
					} else {
						existingJobEntry.tasks.push({
							task_id: curr?.task_id || 0,
							task_name: curr?.task_name || "",
							time: curr?.time || 0,
							hours: curr?.hours || 0,
						});
					}
				} else {
					existingProjectEntry.jobs.push({
						// job_id: curr?.job_id || 0,
						jobs_id: curr?.jobs_id || 0,
						job_name: curr?.job_name || "",
						job_name_id: curr?.job_name_id || 0,
						tasks: [
							{
								task_id: curr?.task_id || 0,
								task_name: curr?.task_name || "",
								time: curr?.time || 0,
								hours: curr?.hours || 0,
							},
						],
					});
				}
			} else {
				existingClientEntry.projects.push({
					project_id: curr?.project_id || 0,
					project_name: curr?.project_name || "",
					jobs: [
						{
							// job_id: curr?.job_id || 0,
							jobs_id: curr?.jobs_id || 0,
							job_name: curr?.job_name || "",
							job_name_id: curr?.job_name_id || 0,
							tasks: [
								{
									task_id: curr?.task_id || 0,
									task_name: curr?.task_name || "",
									time: curr?.time || 0,
									hours: curr?.hours || 0,
								},
							],
						},
					],
				});
			}
		} else {
			acc.push({
				client_name: curr?.name || "",
				client_id: curr?.client_id || 0,
				projects: [
					{
						project_id: curr?.project_id || 0,
						project_name: curr?.project_name || "",
						jobs: [
							{
								// job_id: curr?.job_id || 0,
								jobs_id: curr?.jobs_id || 0,
								job_name: curr?.job_name || "",
								job_name_id: curr?.job_name_id || 0,
								tasks: [
									{
										task_id: curr.task_id || 0,
										task_name: curr.task_name || "",
										time: curr.time || 0,
										hours: curr.hours || 0,
									},
								],
							},
						],
					},
				],
			});
		}
		return acc;
	}, [] as GroupedTimesheets);
};
