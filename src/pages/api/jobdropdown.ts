import supabase from "../../config/supaBaseClient";

export const jobsDropdown = async () => {
	try {
		const { data, error } = await supabase
			.from("timesheet_jobsresponse_dropdown")
			.select("*")
			.order("job_id", { ascending: true });

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
