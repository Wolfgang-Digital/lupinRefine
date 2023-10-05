import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobsOverview } from "types";

export type JobsData = JobsOverview;

export const getAllJobs = async (): Promise<JobsData[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("jobs_overview")
			.select("*")
			.order("client_name", { ascending: true })) as unknown as {
			data: JobsData[];
			error: PostgrestError;
		};

		if (error) {
			console.error("Error fetching clients:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching clients:", error);
	}
};

export const getJob = async ({ id }: { id: string }) => {
	try {
		const { data, error } = await supabase
			.from("jobs")
			.select("*")
			.eq("job_id", id)
			.single();

		if (error) {
			console.error("Error fetching clients:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching clients:", error);
	}
};

export const CreateJob = async () => {};
