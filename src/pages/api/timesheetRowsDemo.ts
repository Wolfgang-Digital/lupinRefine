import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobsDropdownViewDemo } from "types";

export type TimesheetDataDemo = JobsDropdownViewDemo;

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
