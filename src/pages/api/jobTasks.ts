import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobTask } from "types/index";

export const getJobTasks = async (
	jobId: number
): Promise<JobTask[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("job_tasks")
			.select("*")
			.eq("job_id", jobId)
			.order("id", { ascending: true })) as unknown as {
			data: JobTask[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching JobTasks data: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching JobTasks data: ", error);
	}
};
