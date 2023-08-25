import supabase from '../../config/supaBaseClient';
import { Wolfgangers } from 'types';

export const getAllUsers = async (): Promise<Wolfgangers[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from('wolfgangers')
			.select('*')
			.order('user_id', { ascending: true })) as unknown as {
			data: Wolfgangers[];
			error: unknown;
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
