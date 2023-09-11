import supabase from "../../config/supaBaseClient";

export const getJobsDropdown = async () => {
	try {
		const { data, error } = await supabase
			.from("timesheet_jobsresponse_dropdown")
			.select("job_id, job_name, client_name");
		if (error) {
			console.error("Error fetching jobs:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching jobs:", error);
	}
};

export const CreateJob = async () => {};
