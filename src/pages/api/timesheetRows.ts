import supabase, { PostgrestError } from "@config/supaBaseClient";
import { TimesheetRowsView, TimesheetRowsView2 } from "types";

export const getAllTimesheetRows = async (): // userID: number
Promise<TimesheetRowsView[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("all_timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("id", { ascending: true })) as unknown as {
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

export const getAllTimesheetRows2 = async (): Promise<
	TimesheetRowsView2[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("all_timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("job_id", { ascending: true })) as unknown as {
			data: TimesheetRowsView2[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching timesheet rows 2: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching timesheet rows 2: ", error);
	}
};

export const getAllTimesheetRowsV2 = async (): Promise<
	TimesheetRowsView[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("id", { ascending: true })) as unknown as {
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

export const getAllTimesheetRows2V2 = async (): Promise<
	TimesheetRowsView2[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_2")
			.select("*")
			.order("name", { ascending: true })
			.order("id", { ascending: true })) as unknown as {
			data: TimesheetRowsView2[];
			error: PostgrestError;
		};

		if (error) {
			console.error("Error fetching timesheet rows 2: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching timesheet rows 2: ", error);
	}
};
