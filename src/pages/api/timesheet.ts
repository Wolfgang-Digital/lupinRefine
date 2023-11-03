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

export const PostTimeEntry = async ({
	staffId: staff_id,
	timeSpent,
	notes,
	projectId: project_id,
	jobId: job_id,
	taskId: task_id,
	selectedDate: selectedDate,
	rate,
}: {
	staffId: number;
	timeSpent: number;
	notes: string;
	projectId: number;
	jobId: number;
	taskId: number;
	selectedDate: string;
	rate: number;
}) => {
	try {
		const { data, error } = await supabase.from("timesheet_rows").insert([
			{
				staff_id,
				time: timeSpent,
				notes,
				job_id,
				task_id,
				date: selectedDate,
				rate,
				project_id,
			},
		]);
		if (error) {
			console.error("Error posting time entry:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error posting time entry:", error);
	}
};
export const CreateJob = async () => {};
