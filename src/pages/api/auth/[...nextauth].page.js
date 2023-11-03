import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import supabase from "@config/supaBaseClient";

async function handleUserInsertion(user) {
	//check user email if it exists in database
	const { data, error } = await supabase
		.from("users_new")
		.select("*")
		.eq("user_email", user.email);
	if (error) {
		console.log(error);
		return;
	}
	//if user doesn't exist, insert user into database
	if (data.length === 0) {
		const { error } = await supabase
			.from("users_new")
			.insert([
				{ user_email: user.email, user_name: user.name, user_id: user.id },
			]);
		if (error) {
			console.log(error);
			return;
		}
	}
}

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		// !!! Should be stored in .env file.
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin

			if (account) {
				token.id_token = account.id_token;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			session.id_token = token.id_token;
			return session;
		},
		async signIn({ account, profile }) {
			const { data, error } = await supabase.auth.signInWithIdToken({
				provider: "google",
				token: account.id_token,
			});
			console.log({ error });
			const userObject = { email: profile.email, name: profile.name };
			userObject.id = data.user.id;
			await handleUserInsertion(userObject);
			// account.id_token;
			const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
			if (account.provider === "google") {
				if (isProduction) {
					return profile.email.endsWith("@wolfgangdigital.com");
				}
				const devEmails = [
					"aligt55@gmail.com",
					"liam@wolfgangdigital.com",
					"polobryn@gmail.com",
				];
				return (
					devEmails.includes(profile.email) ||
					profile.email.endsWith("@wolfgangdigital.com")
				);
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
