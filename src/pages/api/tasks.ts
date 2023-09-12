import supabase from "../../config/supaBaseClient";
// import { JobTask } from "types";

export const getAllTasks = async () => {
	try {
		const { data, error } = await supabase
			.from("tasks")
			.select("task_id, task_name");
		if (error) {
			console.error("Error fetching tasks:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
	}
};

export const getTaskByJobId = async (jobId: string) => {
	try {
		const { data, error } = await supabase
			.from("job_tasks")
			.select("task_id")
			.eq("job_id", jobId);
		let taskIds: number[] = [];
		if (error) {
			console.error("Error fetching job tasks:", error);
			return;
		}
		if (data) {
			taskIds = data?.map((jobTask) => jobTask.task_id || 0);
		}
		const { data: taskData, error: taskError } = await supabase
			.from("tasks")
			.select("task_id, task_name")
			.in("task_id", taskIds);

		if (taskError) {
			console.error("Error fetching tasks:", error);
			return;
		}
		return taskData;
	} catch (error) {
		console.error("Error fetching tasks:", error);
	}
};

export const CreateJob = async () => {};
