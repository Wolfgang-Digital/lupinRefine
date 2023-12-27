import supabase from "../../config/supaBaseClient";

export const getJobsDropdown = async () => {
	try {
		const { data, error } = await supabase
			.from("timesheet_jobsresponse_dropdown")
			.select("job_name, client_name");
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
	jobsId: jobs_id,
	taskId: task_id,
	selectedDate: selectedDate,
	rate,
	month,
	year,
}: {
	staffId: string;
	timeSpent: number;
	notes: string;
	projectId: number;
	jobsId: number;
	taskId: number;
	selectedDate: string;
	rate: number;
	month: number;
	year: number;
}) => {
	try {
		const { data, error } = await supabase.from("timesheet_rows").insert([
			{
				staff_id,
				time: timeSpent,
				notes,
				jobs_id,
				task_id,
				date: selectedDate,
				rate,
				project_id,
				month,
				year,
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
