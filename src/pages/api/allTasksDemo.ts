// import supabase, { PostgrestError } from "@config/supaBaseClient";
// import { AllTasksDemo } from "types";

// export const getAllJobTasksDemo = async (): Promise<
// 	AllTasksDemo[] | undefined
// > => {
// 	try {
// 		const { data, error } = (await supabase
// 			.from("all_tasks_demo")
// 			.select("*")
// 			.order("job_id", { ascending: true })) as unknown as {
// 			data: AllTasksDemo[];
// 			error: PostgrestError;
// 		};

// 		if (error) {
// 			console.error("Error fetching all tasks: ", error);
// 			return;
// 		}
// 		return data;
// 	} catch (error) {
// 		console.error("Error fetching all tasks: ", error);
// 	}
// };
