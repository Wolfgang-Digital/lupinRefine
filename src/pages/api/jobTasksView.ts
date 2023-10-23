import supabase from "@config/supaBaseClient";
// import { JobTasksView } from "types";

export const getAllTasks = async () => {
	try {
		const { data, error } = await supabase.from("tasks").select("*");
		if (error) {
			console.error("Error fetching all Tasks: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all Tasks: ", error);
	}
};

export const getAllJobTasks = async (jobId: number) => {
	try {
		const { data, error } = await supabase
			.from("job_tasks_view")
			.select("*")
			.order("job_id", { ascending: true })
			.eq("job_id", jobId);
		if (error) {
			console.error("Error fetching all Job Tasks: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all Job Tasks: ", error);
	}
};

export const PostJobTaskEntry = async ({
	jobId: job_id,
	taskId: task_id,
}: {
	jobId: number;
	taskId: number;
}) => {
	try {
		const { data, error } = await supabase.from("job_tasks").insert([
			{
				job_id,
				task_id,
			},
		]);
		if (error) {
			console.error("Error posting job_task entry: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error posting job_task entry: ", error);
	}
};
