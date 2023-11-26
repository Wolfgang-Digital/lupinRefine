import supabase from "../../config/supaBaseClient";

export const clientsWithJobsDropdown = async () => {
	try {
		const { data, error } = await supabase.from("clients_with_jobs").select("*");

		if (error) {
			console.error("Error fetching jobs:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching jobs:", error);
	}
};

export const CreateJobDropdown = async () => {};
