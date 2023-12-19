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
	allocatedRate: allocated_rate,
	effectiveRate: effective_rate,
}: {
	jobTaskId: number;
	month: number;
	year: number;
	userId: string;
	jobId: number;
	taskId: number;
	hours: number;
	allocatedRate: number;
	effectiveRate: number;
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
				allocated_rate,
				effective_rate,
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

export const markAllocationAsCompleted = async ({
	job_id,
	task_id,
	user_id,
}: {
	job_id: number;
	task_id: number;
	user_id: string;
}) => {
	// Update the completed field in the allocate_hours table
	// for the record that matches the job_id, task_id, and user_id
	try {
		const { data, error } = await supabase
			.from("allocate_hours")
			.update({ completed: true })
			.match({
				job_id,
				task_id,
				user_id,
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			});
		if (error) {
			console.error("Error marking allocation as completed: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error marking allocation as completed: ", error);
	}
};

export const updateAllocateHoursEntry = async ({
	id: id,
	userId: user_id,
	taskId: task_id,
	month: month,
	hours: hours,
	allocatedRate: allocated_rate,
	effectiveRate: effective_rate,
}: {
	id: number;
	userId: string;
	taskId: number;
	month: number;
	hours: number;
	allocatedRate: number;
	effectiveRate: number;
}) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours")
			.update({
				user_id,
				task_id,
				month,
				hours,
				allocated_rate,
				effective_rate,
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

export const markAllocationAsUncompleted = async ({
	job_id,
	task_id,
	user_id,
}: {
	job_id: number;
	task_id: number;
	user_id: string;
}) => {
	// Update the completed field in the allocate_hours table
	// for the record that matches the job_id, task_id, and user_id
	try {
		const { data, error } = await supabase
			.from("allocate_hours")
			.update({ completed: false })
			.match({
				job_id,
				task_id,
				user_id,
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			});
		if (error) {
			console.error("Error marking allocation as completed: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error marking allocation as completed: ", error);
	}
};

export const changeAllocation = async ({
	updatedData,
	job_id,
	task_id,
	user_id,
}: {
	updatedData: {
		allocated_rate?: number;
		hours?: number;
		effective_rate?: number; // Add this line
	};
	job_id: number;
	task_id: number;
	user_id: string;
}) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours")
			.update({
				...updatedData,
			})
			.match({
				job_id,
				task_id,
				user_id,
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
			});
		if (error) {
			console.error("Error changing allocation: ", error);
			return;
		}
		console.log(job_id, task_id, user_id);
		return data;
	} catch (error) {
		console.error("Error changing allocation: ", error);
	}
};
