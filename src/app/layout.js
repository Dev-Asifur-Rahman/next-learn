import "./globals.css";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import ContextProvider from "@/providers/ContextProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import BProgressLoader from "@/providers/BProgressLoader";
import ConditionalNav from "@/components/ConditionalNav";

export const metadata = {
  title: {
    default: "NextLearn",
    template: "%s",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body>
          <ContextProvider>
            <BProgressLoader>
              <ConditionalNav></ConditionalNav>
              <section className="w-full">
                {/* <p>{JSON.stringify(session)}</p> */}
                {/* <UserInfo></UserInfo> */}
                <div>{children}</div>
              </section>
            </BProgressLoader>
          </ContextProvider>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
