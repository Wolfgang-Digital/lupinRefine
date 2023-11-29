import supabase, { PostgrestError } from "@config/supaBaseClient";
import { TimesheetRowsView } from "types";

export const getAllTimesheetRows = async (): // userID: number
Promise<TimesheetRowsView[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("all_timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("job_id", { ascending: true })) as unknown as {
			// .eq("user_id", userID))
			data: TimesheetRowsView[];
			error: PostgrestError;
		};

		if (error) {
			console.error("Error fetching timesheet rows: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching timesheet rows: ", error);
	}
};
export const getAllTimesheetRowsV2 = async (): Promise<
	TimesheetRowsView[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_v2")
			.select("*")
			.order("name", { ascending: true })
			.order("jobs_id", { ascending: true })) as unknown as {
			data: TimesheetRowsView[];
			error: PostgrestError;
		};
		console.log("timesheetrows", { data });
		if (error) {
			console.error("Error fetching timesheet rows: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching timesheet rows: ", error);
	}
};

export const deleteTimeEntry = async (id: number) => {
	try {
		console.log("Deleting time entry with ID:", id);
		const { data, error } = await supabase
			.from("timesheet_rows")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("Error deleting time entry:", error);
		} else {
			console.log("Time entry deleted successfully:", id, data);
		}
	} catch (error) {
		console.error("Error deleting time entry:", error);
	}
};

export const updateTimeEntry = async (
	id: number,
	time: number | null,
	notes: string | null
) => {
	try {
		const { data, error } = await supabase
			.from("timesheet_rows")
			.update({
				time: time !== null ? time : undefined,
				notes: notes !== null ? notes : undefined,
			})
			.eq("id", id);

		if (error) {
			console.error("Error updating time entry:", error);
		} else {
			console.log("Time entry updated successfully:", data);
		}
	} catch (error) {
		console.error("Error updating time entry:", error);
	}
};
