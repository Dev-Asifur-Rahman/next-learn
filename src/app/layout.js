import NavBar from "@/components/NavBar";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import UserInfo from "@/components/UserInfo";
import ContextProvider from "@/providers/ContextProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: {
    default: "NextLearn",
    template: "%s",
  },
  icons: {
    icon: "/next-learn-favicon.png",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body>
          <ContextProvider>
            <NavBar></NavBar>
            <section className="border w-full">
              <p className="">App Layout</p>
              <p>{JSON.stringify(session)}</p>
              <UserInfo></UserInfo>
              <div>{children}</div>
            </section>
          </ContextProvider>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
