import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		// !!! Should be stored in .env file.
		GoogleProvider({
			clientId: `686204342223-e9j1st5fhk59qfmma3va583seb9gbotq.apps.googleusercontent.com`,
			clientSecret: `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`,
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			const isProduction = process.env.env === 'production';

			if (account.provider === 'google') {
				if (isProduction) {
					return profile.email.endsWith('@wolfgangdigital.com');
				}
				const devEmails = [
					'aligt55@gmail.com',
					'liam@wolfgangdigital.com',
					'polobryn@gmail.com',
				];
				return devEmails.includes(profile.email);
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);