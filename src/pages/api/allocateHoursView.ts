import supabase from "@config/supaBaseClient";
import { AllocateHoursView } from "types";

export type groupedAllocateHours = {
	[key: number]: { [key: number]: AllocateHoursView };
};

export const getAllAllocatedHours = async (jobId: number) => {
	try {
		const { data, error } = await supabase
			.from("allocate_hours_view")
			.select("*")
			.order("job_id", { ascending: true })
			.eq("job_id", jobId);

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
