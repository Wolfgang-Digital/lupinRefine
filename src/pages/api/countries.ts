import supabase from "../../config/supaBaseClient";
import { Country } from "types";

export const getAllCountries = async (): Promise<Country[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from("countries")
			.select("*")
			.order("id", { ascending: true })) as unknown as {
			data: Country[];
			error: unknown;
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
