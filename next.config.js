module.exports = {
	experimental: {
		newNextLinkBehavior: true,
	},
	env: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
		NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/dashboard',
				permanent: true,
			},
		];
	},
};
