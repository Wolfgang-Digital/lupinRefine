import React from 'react';
import { ErrorComponent } from '@refinedev/mui';
import { GetServerSideProps } from 'next';
export default function CatchAll() {
	return <ErrorComponent />;
}

export const getServerSideProps: GetServerSideProps<object> = async () => {
	return {
		props: {},
	};
};
