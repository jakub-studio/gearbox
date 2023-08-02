import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				return { id: "admin" };
			}
		})
	],
	callbacks: {
		signIn(params) {
			console.log("signIn", params);
			return Promise.resolve(true);
		},
	}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
