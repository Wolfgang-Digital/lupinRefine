import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobNames } from "types/index";

export type AllJobNames = JobNames;

export const getJobNames = async (): Promise<AllJobNames[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("job_names")
			.select("*")
			.order("job_name_name", { ascending: true })) as unknown as {
			data: AllJobNames[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching Job Names data: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Job Names data: ", error);
	}
};

export const getJobName = async (
	jobNameId: number
): Promise<AllJobNames[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("job_names")
			.select("job_name_name")
			.eq("job_name_id", jobNameId)) as unknown as {
			data: AllJobNames[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching Job Name data: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Job Name data: ", error);
	}
};
