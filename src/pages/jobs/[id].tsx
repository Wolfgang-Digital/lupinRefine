import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getJob } from '@api/jobs';

import { Job as JobType } from 'types';

const Job: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [job, setJob] = useState<JobType | null>(null);
	useEffect(() => {
		const fetchJob = async (id: string) => {
			const job = await getJob({ id });
			if (job) {
				setJob(job);
			}
		};
		fetchJob(id as string);
	}, [id]);
	return (
		<div>
			<h1>Dynamic Page</h1>
			<p>Received ID: {id}</p>
			{Object.entries(job || {}).map(([key, value]) => (
				<p key={key}>
					{key}: {value}
				</p>
			))}
		</div>
	);
};

export default Job;
