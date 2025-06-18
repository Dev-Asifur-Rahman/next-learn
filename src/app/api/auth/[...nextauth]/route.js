import loginUser from "@/actions/auth/loginUser";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // user = {email:credentials.email,password:credentials.password}
        const user = await loginUser(credentials);
        if (user) {
          // if you console it will show user but in front end it will send next auths built in object error null
          return {
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.profileImage,
            location: user.location,
            joinedAt: user.joinedAt,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
