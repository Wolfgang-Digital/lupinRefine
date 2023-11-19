import supabase from "../../config/supaBaseClient";
import { TimesheetRowsView2 } from "types";

type Task = {
	[key: string]: TimesheetRowsView2;
};

export type GroupedFinancialData = {
	[key: number]: Task;
};
// TODO: add job id, task id, user id, to the grouping here, remove the other grouping on clientjobinfotab
export const groupFinancialTableData = (
	financialData: TimesheetRowsView2[],
	month: number
) => {
	const groupedData = financialData
		.filter((data) => {
			return new Date(data.date || new Date()).getMonth() === month;
		})
		.reduce((acc, curr) => {
			const { task_id, user_id } = curr as TimesheetRowsView2;
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
		}, {} as GroupedFinancialData);
	return groupedData;
};

export const getFinancialTable = async (clientId: number) => {
	try {
		const { data, error } = await supabase
			.from("timesheet_rows_view")
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

export const getFinancialTable2 = async (clientId: number) => {
	try {
		const { data, error } = await supabase
			.from("timesheet_rows_view_2")
			.select("*")
			.order("id", { ascending: true })
			.eq("client_id", clientId);
		if (error) {
			console.error("Error fetching clients2: ", error);
			return;
		}
		// console.log({ clientId });
		return data;
	} catch (error) {
		console.error("Error fetching clients : ", error);
	}
};
