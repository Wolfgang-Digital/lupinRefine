import supabase from '@config/supaBaseClient';

export const getAllUsers = async () => {
	try {
		const { data, error } = await supabase
			.from('users')
			.select('*')
			.order('user_id', { ascending: true });
		if (error) {
			console.error('Error fetching clients:', error);
			return;
		}
		return data;
	} catch (error) {
		console.error('Error fetching clients:', error);
	}
};
