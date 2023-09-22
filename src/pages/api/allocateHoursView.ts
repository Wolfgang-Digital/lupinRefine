import supabase, { PostgrestError } from "@config/supaBaseClient";
import { AllocateHoursView } from "types";

export const getAllAllocatedHours = async (): Promise<
	AllocateHoursView[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("allocate_hours_view")
			.select("*")
			.order("job_id", { ascending: true })) as unknown as {
			data: AllocateHoursView[];
			error: PostgrestError;
		};

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
			console.error("Error fetching users allocated hours for Month: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching users allocated hours for Month: ", error);
	}
};
