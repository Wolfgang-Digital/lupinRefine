import supabase, { PostgrestError } from "@config/supaBaseClient";
import { Tasks } from "types";

export type TaskData = Tasks;

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
			.eq("jobs_id", jobId);
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

export const getTaskName = async (
	taskId: number
): Promise<TaskData[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("tasks")
			.select("task_name")
			.eq("task_id", taskId)) as unknown as {
			data: TaskData[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching task name: ", error);
			return;
		}
		// console.log(data);
		return data;
	} catch (error) {
		console.error("Error fetching task name: ", error);
	}
};

export const CreateJob = async () => {};
