import React from 'react';
import { ErrorComponent } from '@refinedev/mui';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export default function CatchAll() {
	return <ErrorComponent />;
}

export const getServerSideProps: GetServerSideProps<object> = async (
	context
) => {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session) {
		return {
			props: {},
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
