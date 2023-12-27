import supabase from "@config/supaBaseClient";
import { AllocateHoursView } from "types";

export type groupedAllocateHours = {
	[key: number]: { [key: number]: AllocateHoursView };
};

export const getAllAllocatedHours = async (userID: number, month: number) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.order("job_id", { ascending: true })
			.eq("month", month)
			.eq("user_id", userID);

		if (error) {
			console.error("Error fetching all allocated hours: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all allocated hours: ", error);
	}
};

export const getUserAllocatedHoursPerMonth = async (
	userID: number,
	month: number
) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.eq("user_id", userID)
			.eq("month", month)
			.order("job_id", { ascending: true });

		if (error) {
			console.error("Error fetching users allocated hours for Job: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching users allocated hours for Job: ", error);
	}
};

export const getJobAllocatedHoursPerMonth = async (
	jobID: number
	// month: number
) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.order("job_id", { ascending: true })
			.eq("job_id", jobID)
			.neq("hours", -1);
		// .eq("month", month);
		if (error) {
			console.error("Error fetching job allocated hours: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching job allocated hours: ", error);
	}
};

export const getJobAllocatedHoursPerMonthPerUser = async (
	year: number,
	month: number,
	userId: string,
	jobId: number,
	taskId: number
) => {
	// console.log({ jobId });
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.eq("year", year)
			.eq("month", month)
			.eq("user_id", userId)
			.eq("job_id", jobId)
			.eq("task_id", taskId);
		if (error) {
			console.error("Error fetching job allocated hours per user: ", error);
			return;
		}

		return data;
	} catch (error) {
		console.error("Error fetching job allocate hours per user: ", error);
	}
};

export const getJobAllocatedHoursPerMonthPerJob = async (
	year: number,
	month: number,
	jobsId: number,
	taskId: number
) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.eq("year", year)
			.eq("month", month)
			.eq("job_id", jobsId)
			.eq("task_id", taskId);
		if (error) {
			console.error("Error fetching Job Allocated Hours Per Month: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Job Allocated Hours Per Month: ", error);
	}
};
