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
		return data;
	} catch (error) {
		console.error("Error fetching task name: ", error);
	}
};

export const CreateJob = async () => {};
