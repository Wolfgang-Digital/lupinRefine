import supabase from '../../config/supaBaseClient';
import { Job } from 'types';

export const getAllJobs = async (): Promise<Job[] | undefined> => {
	try {
		const { data, error } = (await supabase
			.from('jobs')
			.select('*')
			.order('job_id', { ascending: true })) as unknown as {
			data: Job[];
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

export const CreateJob = async () => {};
