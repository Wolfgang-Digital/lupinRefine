import supabase, { PostgrestError } from "@config/supaBaseClient";
import { ProjectJobsView } from "types/index";

export type ProjectJobs = ProjectJobsView;

export const getProjectJobs = async (
	projectId: number
): Promise<ProjectJobs[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("project_jobs_view")
			.select("*")
			.eq("project_id", projectId)
			.order("job_name_name", { ascending: true })) as unknown as {
			data: ProjectJobs[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching all Project Jobs: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching all Project Jobs: ", error);
	}
};

// export const getProjectJobs = async (projectId: number) => {
// 	try {
// 		const { data, error } = await supabase
// 			.from("Project_jobs_view")
// 			.select("*")
// 			.eq("project_id", projectId)
// 			.order("job_name", { ascending: true });
// 		if (error) {
// 			console.error("Error fetching all Project Jobs: ", error);
// 			return;
// 		}
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching all Project Jobs: ", error);
// 	}
// };
