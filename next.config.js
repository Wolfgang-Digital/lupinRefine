module.exports = {
	experimental: {
		newNextLinkBehavior: true,
	},
	env: {
		customKey: 'my-value',
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_KEY: process.env.SUPABASE_KEY,
	},
};
