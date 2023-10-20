import supabase from "../../config/supaBaseClient";
import { TimesheetRowsView } from "types";

export type groupedFinancialData = {
	[key: number]: { [key: number]: TimesheetRowsView };
};
// TODO: add job id, task id, user id, to the grouping here, remove the other grouping on clientjobinfotab
export const groupFinancialTableData = (
	financialData: TimesheetRowsView[],
	month: number
) => {
	const groupedData = financialData
		.filter((data) => {
			return new Date(data.date || new Date()).getMonth() === month;
		})
		.reduce((acc, curr) => {
			const { task_id, user_id } = curr;
			if (!task_id || !user_id) return acc;
			if (acc && !acc[task_id]) {
				acc[task_id] = { [user_id]: curr };
			} else if (acc && acc[task_id] && !acc[task_id][user_id]) {
				acc[task_id][user_id] = curr;
			} else if (acc && acc[task_id] && acc[task_id][user_id]) {
				let time = Number(acc[task_id][user_id].time) || 0;
				time += Number(curr.time) || 0;
				acc[task_id][user_id].time = time;
			}
			return acc;
		}, {} as groupedFinancialData);
	return groupedData;
};

export const getFinancialTable = async (clientId: number) => {
	try {
		const { data, error } = await supabase
			.from("timesheet_rows_view_v6")
			.select("*")
			// .eq("client_name", "*Wolfgang Digital")
			.order("id", { ascending: true })
			.eq("client_id", clientId);
		if (error) {
			console.error("Error fetching clients:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching clients:", error);
	}
};
