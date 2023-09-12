import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		// !!! Should be stored in .env file.
		GoogleProvider({
			clientId: `686204342223-e9j1st5fhk59qfmma3va583seb9gbotq.apps.googleusercontent.com`,
			clientSecret: `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`,
		}),
	],
	secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};
export default NextAuth(authOptions);
