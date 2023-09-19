import supabase from "../../config/supaBaseClient";

export const getFinancialTable = async () => {
	try {
		const { data, error } = await supabase
			.from("timesheet_rows_view")
			.select("*")
			// .eq("client_name", "*Wolfgang Digital")
			.order("id", { ascending: true });
		if (error) {
			console.error("Error fetching clients:", error);
			return;
		}
		console.log({ data });
		return data;
	} catch (error) {
		console.error("Error fetching clients:", error);
	}
};
