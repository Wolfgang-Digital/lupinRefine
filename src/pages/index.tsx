import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
export default function Index() {
	// const router = useRouter();
	useEffect(() => {
		console.log('pushing');
		// router.push('/dashboard');
	}, []);

	return <>index</>;
}

Index.noLayout = true;
