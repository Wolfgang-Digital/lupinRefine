import supabase, { PostgrestError } from "@config/supaBaseClient";
import { TimesheetRowsView, TimesheetRowsTest } from "types";

export const getAllTimesheetRows = async (): Promise<
	TimesheetRowsView[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_v5")
			.select("*")
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

export const getAllTimesheetRowsV2 = async (): Promise<
	TimesheetRowsTest[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_test")
			.select("*")
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
