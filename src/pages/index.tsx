import React from 'react';

import { GetServerSideProps } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export default function Index() {
	return <>index</>;
}

Index.noLayout = true;

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
		redirect: {
			destination: '/login',
			permanent: false,
		},
	};
};
