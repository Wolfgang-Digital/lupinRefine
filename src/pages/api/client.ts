import supabase from '../../config/supaBaseClient';
import { Client, Currency, Wolfgangers, Tier } from 'types';

export type ClientData = Client & Currency & Wolfgangers & Tier;
export const getAllClients = async (): Promise<ClientData[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from('client')
			.select(
				'*, wolfgangers (user_id, user_name), currency (currency_id, currency_symbol), tier (tier_id, tier_name)'
			)
			.order('id', { ascending: true })) as unknown as {
			data: ClientData[];
			error: any;
		};
		if (error) {
			console.error('Error fetching clients:', error);
			return;
		}
		console.log({ data });
		return data;
	} catch (error) {
		console.error('Error fetching clients:', error);
	}
};
