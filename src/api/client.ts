import supabase, { PostgrestError } from "../config/supaBaseClient";
import { Client, Currency, Users, Tier, ClientOverview } from "types";

// export type ClientData = Client & Currency & Users & Tier;
export type ClientData = ClientOverview;
export const getAllClients = async (): Promise<ClientData[] | undefined> => {
  try {
    const { data, error } = (await supabase
      .from("client_overview")
      .select("*")
      .order("id", { ascending: true })) as unknown as {
      data: ClientData[];
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
