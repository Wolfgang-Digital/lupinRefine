import supabase, { PostgrestError } from "@config/supaBaseClient";
import { UsersOverview } from "types";

export type UsersData = UsersOverview;

export const getAllUsers = async (): Promise<UsersData[] | undefined> => {
  try {
    const { data, error } = (await supabase
      .from("user_dept_join")
      .select("*")
      .order("user_email", { ascending: true })) as unknown as {
      data: UsersData[];
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
