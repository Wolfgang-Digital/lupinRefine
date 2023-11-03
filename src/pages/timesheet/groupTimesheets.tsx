import { TimesheetRowsViewV6 } from "types";

type Task = {
	task_id: number;
	task_name: string;
	time: number;
	hours?: number;
};

type Job = {
	job_id: number;
	job_name: string;
	job_name_id: number;
	tasks: Task[];
};
type Client = {
	client_id: number;
	client_name: string;
	project_id: number;
	project_name: string;
	jobs: Job[];
};

export type GroupedTimesheets = Client[];

export const groupTimesheets = (timesheets: TimesheetRowsViewV6[]) => {
	return timesheets.reduce((acc, curr) => {
		const existingClientEntry = acc.find(
			(entry) => entry.client_id === curr.client_id
		);

		if (existingClientEntry) {
			const existingProjectEntry = acc.find(
				(project) =>
					project.project_id === curr.project_id &&
					project.client_id === curr.client_id
			);
			if (existingProjectEntry) {
				const existingJobEntry = existingProjectEntry.jobs.find(
					(job) => job.job_id === curr.job_id
				);
				if (existingJobEntry) {
					const existingTaskEntry = existingJobEntry.tasks.find(
						(task) => task.task_id === curr.task_id
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
						job_id: curr?.job_id || 0,
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
				existingClientEntry.jobs.push({
					job_id: curr?.job_id || 0,
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
			acc.push({
				client_name: curr?.name || "",
				client_id: curr?.client_id || 0,
				project_id: curr?.project_id || 0,
				project_name: curr?.project_name || "",
				jobs: [
					{
						job_id: curr?.job_id || 0,
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
			});
		}
		return acc;
	}, [] as GroupedTimesheets);
};
