import supabase, { PostgrestError } from "@config/supaBaseClient";
import {
	AllTimesheetRowsView,
	TimesheetRowsView,
	TimesheetRowsTest,
} from "types";

export const getAllTimesheetRows = async (
	userID: number
): Promise<TimesheetRowsView[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("timesheet_rows_view_v6")
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

export const getAllTimesheetRowsFinancial = async ({
	projectId,
	clientId,
}: {
	projectId: number;
	clientId: number;
}): Promise<AllTimesheetRowsView[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("all_timesheet_rows_view")
			.select("*")
			.order("name", { ascending: true })
			.order("job_id", { ascending: true })
			.eq("client_id", clientId)
			.eq("project_id", projectId)) as unknown as {
			data: AllTimesheetRowsView[];
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
