module.exports = {
	experimental: {
		newNextLinkBehavior: true,
	},
	env: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
	},
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/dashboard1',
	// 			permanent: true,
	// 		},
	// 	];
	// },
};
