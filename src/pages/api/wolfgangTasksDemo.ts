import supabase, { PostgrestError } from "@config/supaBaseClient";
import { WolfgangTasksDemo } from "types";

export const getAllWolfgangTasksDemo = async (): Promise<
	WolfgangTasksDemo[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("wolfgang_jobs_demo")
			.select("*")
			.order("job_id", { ascending: true })) as unknown as {
			data: WolfgangTasksDemo[];
			error: PostgrestError;
		};

		if (error) {
			console.error("Error fetching all tasks: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all tasks: ", error);
	}
};
