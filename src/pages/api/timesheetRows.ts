import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobsDropdownViewDemo, TimesheetRowsView } from "types";

export type TimesheetData = JobsDropdownViewDemo;
export type TimesheetDataDemo = JobsDropdownViewDemo;

export const getAllTimesheetRows = async (
	userID: number
): Promise<TimesheetRowsView[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_v5")
			.select("*")
			.order("name", { ascending: true })
			.order("job_id", { ascending: true })
			.eq("user_id", userID)) as unknown as {
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
	TimesheetData[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_v5")
			.select("*")
			.order("job_id", { ascending: true })) as unknown as {
			data: TimesheetData[];
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
