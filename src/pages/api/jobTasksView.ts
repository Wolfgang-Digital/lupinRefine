import supabase from "@config/supaBaseClient";
// import { JobTasksView } from "types";

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
