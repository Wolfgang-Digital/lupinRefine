import supabase from "@config/supaBaseClient";

export const getAllProjects = async () => {
	try {
		const { data, error } = await supabase
			.from("projects")
			.select("project_id, project_name");
		if (error) {
			console.error("Error fetching projects: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching tasks: ", error);
	}
};

export const getProjectbyClientId = async (clientId: string) => {
	try {
		const { data, error } = await supabase
			.from("jobs")
			.select("project_id")
			.eq("job_client_id", clientId);
		let projectIds: number[] = [];
		if (error) {
			console.error("Error fetching client projects: ", error);
			return;
		}
		if (data) {
			projectIds = data?.map((clientProject) => clientProject.project_id || 0);
		}
		const { data: projectData, error: projectError } = await supabase
			.from("project")
			.select("project_id, project_name")
			.in("project_id", projectIds);
		if (projectError) {
			console.error("Error fetching projects 1: ", error);
			return;
		}
		return projectData;
	} catch (error) {
		console.error("Error fetching projects: ", error);
	}
};
