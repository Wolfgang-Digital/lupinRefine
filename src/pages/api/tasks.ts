import supabase from "../../config/supaBaseClient";

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

export const CreateJob = async () => {};
