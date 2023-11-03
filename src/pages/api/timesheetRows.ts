import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobsDropdownViewDemo, TimesheetRowsView } from "types";

export type TimesheetData = JobsDropdownViewDemo;
export type TimesheetDataDemo = JobsDropdownViewDemo;

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
			.from("timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("job_id", { ascending: true })) as unknown as {
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

export const getAllTimesheetRowsDemo = async (): Promise<
	TimesheetDataDemo[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_demo")
			.select("*")
			.order("job_id", { ascending: true })) as unknown as {
			data: TimesheetDataDemo[];
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
