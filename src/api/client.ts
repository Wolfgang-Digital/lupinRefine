import supabase, { PostgrestError } from "../config/supaBaseClient";
import { Client, Currency, Users, Tier } from "types";

export type ClientData = Client & Currency & Users & Tier;
export const getAllClients = async (): Promise<ClientData[] | undefined> => {
  try {
    const { data, error } = (await supabase
      .from("client")
      .select(
        "*, users (user_id, user_name), currency (currency_id, currency_symbol), tier"
      )
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
