import "next-auth";

declare module "next-auth" {
	interface Session {
		id_token?: string;
		user: {
			role?: string;
			name?: string;
			image?: string;
			email?: string;
			id?: string;
		};
	}
}
