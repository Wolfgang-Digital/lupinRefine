import supabase from "@config/supaBaseClient";
// import { AllocateHours } from "types/index";

export const PostAllocateHoursEntry = async ({
	jobTaskId: job_task_id,
	month: month,
	year: year,
	userId: user_id,
	jobId: job_id,
	taskId: task_id,
	hours: hours,
}: {
	jobTaskId: number;
	month: number;
	year: number;
	userId: string;
	jobId: number;
	taskId: number;
	hours: number;
}) => {
	try {
		const { data, error } = await supabase.from("allocate_hours").insert([
			{
				job_task_id,
				month,
				year,
				user_id,
				job_id,
				task_id,
				hours,
			},
		]);
		if (error) {
			console.error("Error posting allocate hours entry: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error posting allocate hours entry: ", error);
	}
};
