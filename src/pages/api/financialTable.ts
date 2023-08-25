import supabase from '../../config/supaBaseClient';
import { FinancialTable } from 'types';

export const getFinancialTable = async (): Promise<
	FinancialTable[] | undefined
> => {
	try {
		const { data, error } = (await supabase
			.from('timesheet_rows_byuser_v4')
			.select(
				'id, job_id, client_name, job_name, task_name, time, user_name, date, rate'
			)
			.order('id', { ascending: true })) as unknown as {
			data: FinancialTable[];
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
