import supabase, { PostgrestError } from "@config/supaBaseClient";
// import { id } from "date-fns/locale";
// import { CLIENT_RENEG_WINDOW } from "tls";
import { GetAllJobsWithProjects, GetAllJobsWithProjects2 } from "types";

export type JobsDataWithProjects = GetAllJobsWithProjects;
export type JobsDataWithProjects2 = GetAllJobsWithProjects2;

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
			// console.log(data);
			jobIds = data?.map((projectJob) => projectJob.job_id || 0);
			// console.log(jobIds);
		}
		const { data: jobData, error: jobError } = await supabase
			.from("jobs")
			.select("job_id, job_name, id, job_name_id")
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

export const getAllJobsWithProjectsQuery2 = async (): Promise<
	JobsDataWithProjects2[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from("jobs_overview_with_projects_2")
			.select("*")
			.order("client_name", { ascending: true })) as unknown as {
			data: JobsDataWithProjects2[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching Jobs data with projects 2: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching Jobs data with projects 2 :", error);
	}
};

export const PostJobEntry = async ({
	jobNameId: job_name_id,
	jobName: job_name,
	clientId: job_client_id,
	projectId: project_id,
	jobId: job_id,
	jobCurrencyId: job_currency_id,
	jobType: job_type,
	jobStatus: job_current_status,
	jobDepartment: job_department_id,
}: {
	jobNameId: number;
	jobName: string;
	clientId: number;
	projectId: number;
	jobId: number;
	jobCurrencyId: number;
	jobType: number;
	jobStatus: number;
	jobDepartment: number;
}) => {
	try {
		const { data, error } = await supabase.from("jobs").insert([
			{
				job_name_id,
				job_name,
				job_client_id,
				project_id,
				job_id,
				job_currency_id,
				job_type,
				job_current_status,
				job_department_id,
			},
		]);
		if (error) {
			console.error("Error posting job entry: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error posting time entry: ", error);
	}
};

export const CreateJob = async () => {};
