import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
});

export { handlers, signIn, signOut, auth };