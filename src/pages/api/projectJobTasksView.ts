import supabase from "@config/supaBaseClient";

export const getAllProjectJobTasks = async (
	projectId: number,
	jobId: number
) => {
	try {
		const { data, error } = await supabase
			.from("project_job_task_view")
			.select("*")
			.eq("project_id", projectId)
			.eq("job_id", jobId)
			.order("task_name", { ascending: true });
		if (error) {
			console.error("Error fetching all Project Job Tasks: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all Project Job Tasks: ", error);
	}
};
