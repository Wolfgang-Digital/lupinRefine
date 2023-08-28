import supabase from '../../config/supaBaseClient';

export const getAllJobs = async () => {
	try {
		const { data, error } = await supabase
			.from('jobs')
			.select('*')
			.order('job_id', { ascending: true });

		if (error) {
			console.error('Error fetching clients:', error);
			return;
		}
		return data;
	} catch (error) {
		console.error('Error fetching clients:', error);
	}
};

export const CreateJob = async () => {};
