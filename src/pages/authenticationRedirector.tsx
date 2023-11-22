import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface Props {
	session: Session | null;
}

// This function can take an additional parameter to define specific redirect behavior
export function getServerSidePropsWithAuth(
	allowedRoles: string[]
): GetServerSideProps<Props> {
	return async (context: GetServerSidePropsContext) => {
		const session = await getSession({ req: context.req });

		if (!session) {
			// Redirect to login if no user is logged in
			return {
				redirect: {
					destination: "/login",
					permanent: false,
				},
			};
		}

		// Check if the user is an admin
		if (!allowedRoles.includes(session?.user?.role || "user")) {
			// Redirect to a different page if the user doesn't have required role
			return {
				redirect: {
					destination: "/dashboard", // Use the redirectPath parameter for specific redirection
					permanent: false,
				},
			};
		}

		// If the user has the required role, return the session
		return {
			props: { session },
		};
	};
}

// usage
// export const getServerSideProps = getServerSidePropsWithAuth("admin");
