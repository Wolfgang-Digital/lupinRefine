import supabase from "@config/supaBaseClient";

export const getAllProjectJobTasks = async (
	projectId: number,
	jobNameId: number
) => {
	try {
		const { data, error } = await supabase
			.from("project_job_task_view")
			.select("*")
			.eq("project_id", projectId)
			.eq("job_id", jobNameId)
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

export const getProjectJobTaskForDayDialog = async (
	projectId: number,
	jobNameId: number
) => {
	try {
		const { data, error } = await supabase
			.from("project_job_task_view")
			.select("*")
			.eq("project_id", projectId)
			.eq("job_id", jobNameId);
		if (error) {
			console.error("Error fetching Project Job Task for Day Dialog: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Project Job Task for Day Dialog: ", error);
	}
};
