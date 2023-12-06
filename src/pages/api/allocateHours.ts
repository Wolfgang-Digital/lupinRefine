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
	rate: rate,
}: {
	jobTaskId: number;
	month: number;
	year: number;
	userId: string;
	jobId: number;
	taskId: number;
	hours: number;
	rate: number;
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
				rate,
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

export const deleteAllocateHoursEntry = async (id: number) => {
	try {
		console.log("Deleting Allocate Hours entry with ID: ", id);
		const { data, error } = await supabase
			.from("allocate_hours")
			.delete()
			.eq("id", id);
		if (error) {
			console.error("Error deleting Allocate Hours entry: ", error);
		} else {
			console.log("Allocate Hours entry deleted sucessfully: ", id, data);
		}
	} catch (error) {
		console.error("Error deleting Allocate Hours entry: ", error);
	}
};

export const updateAllocateHoursEntry = async ({
	id: id,
	userId: user_id,
	taskId: task_id,
	month: month,
	hours: hours,
	rate: rate,
}: {
	id: number;
	userId: string;
	taskId: number;
	month: number;
	hours: number;
	rate: number;
}) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours")
			.update({
				user_id,
				task_id,
				month,
				hours,
				rate,
			})
			.eq("id", id);

		if (error) {
			console.error("Error update Allocate Hours entry: ", error);
		} else {
			console.log("Allocate Hours entry updated successfully: ", data);
		}
	} catch (error) {
		console.error("Error updating Allocate Hours entry: ", error);
	}
};
