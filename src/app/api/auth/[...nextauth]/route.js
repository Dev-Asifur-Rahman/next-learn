import loginUser from "@/actions/auth/loginUser";
import mongoDb, { collections } from "@/lib/mongoConnect";
import dayjs from "dayjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const gmail = user?.email;
        const students = mongoDb(collections.student);
        const admins = mongoDb(collections.admin);
        const instructors = mongoDb(collections.instructor);

        const [student, admin, instructor] = await Promise.all([
          students.findOne({ email: gmail }),
          admins.findOne({ email: gmail }),
          instructors.findOne({ email: gmail }),
        ]);

        if (!student && !admin && !instructor) {
          const count = await students.countDocuments();
          const student_data = {
            userId: `s${String(count + 1).padStart(3, "0")}`,
            name: user?.name,
            email: gmail,
            role: "student",
            profileImage: user?.image,
            location: null,
            joinedAt: dayjs().tz("Asia/Dhaka").format(),
            enrolledCourses: [],
          };

          await students.insertOne(student_data);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const email = user?.email;
        const students = mongoDb(collections.student);
        const admins = mongoDb(collections.admin);
        const instructors = mongoDb(collections.instructor);

        const [student, admin, instructor] = await Promise.all([
          students.findOne({ email }),
          admins.findOne({ email }),
          instructors.findOne({ email }),
        ]);

        const dbUser = admin || instructor || student;

        if (dbUser) {
          token._id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user && token) {
          session.user._id = token._id;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture || token.image;
          session.user.role = token.role;
        }
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
