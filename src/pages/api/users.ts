import supabase, { PostgrestError } from "@config/supaBaseClient";
import { UsersOverview } from "types";

export type UserData = UsersOverview;

export const getAllUsers = async (): Promise<UserData[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("user_dept_join")
			.select("*")
			.order("user_id", { ascending: true })) as unknown as {
			data: UserData[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching users:", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching users:", error);
	}
};

export const getUserName = async (
	userId: string
): Promise<UserData[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("users")
			.select("user_name")
			.eq("user_id", userId)) as unknown as {
			data: UserData[];
			error: PostgrestError;
		};
		if (error) {
			console.error("Error fetching user name: ", error);
			return;
		}
		return data;
	} catch (error) {
		console.error("Error fetching user name: ", error);
	}
};
