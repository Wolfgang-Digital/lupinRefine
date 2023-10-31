import supabase, { PostgrestError } from "@config/supaBaseClient";
import { JobsOverview, GetAllJobsWithProjects } from "types";

export type JobsData = JobsOverview;
export type JobsDataWithProjects = GetAllJobsWithProjects;

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

export const getJobByProjectId = async (
	clientId: string,
	projectId: string
) => {
	try {
		const { data, error } = await supabase
			.from("jobs")
			.select("job_id")
			.eq("job_client_id", clientId)
			.eq("project_id", projectId);
		let jobIds: number[] = [];
		if (error) {
			console.error("Error fetching project jobs: ", error);
			return;
		}
		if (data) {
			console.log(data);
			jobIds = data?.map((projectJob) => projectJob.job_id || 0);
			// console.log(jobIds);
		}
		const { data: jobData, error: jobError } = await supabase
			.from("jobs")
			.select("job_id, job_name, job_name_id")
			.in("job_id", jobIds);

		if (jobError) {
			console.error("Error fetching jobs 1: ", error);
			return;
		}
		return jobData;
	} catch (error) {
		console.error("Error fetching jobs: ", error);
	}
};

export const getAllJobsWithProjectsQuery = async (): Promise<
	JobsDataWithProjects[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("jobs_overview_with_projects")
			.select("*")
			.order("client_name", { ascending: true })) as unknown as {
			data: JobsDataWithProjects[];
			error: PostgrestError;
		};

		if (error) {
			console.error("Error fetching Jobs data with projects: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Jobs data with projects: ", error);
	}
};

export const CreateJob = async () => {};
