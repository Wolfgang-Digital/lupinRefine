import supabase from "@config/supaBaseClient";

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
