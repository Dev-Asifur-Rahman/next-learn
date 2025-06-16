import NavBar from "@/components/NavBar";
import "./globals.css";
import { Link } from "next/link";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import UserInfo from "@/components/UserInfo";
import ContextProvider from "@/providers/ContextProvider";

export const metadata = {
  title: {
    default: "NextLearn",
    template: "%s",
  },
  icons: {
    icon: "/next-learn-favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <ContextProvider>
          <body>
            <NavBar></NavBar>
            <section className="border w-full">
              <p className="">App Layout</p>
              <UserInfo></UserInfo>
              <div>{children}</div>
            </section>
          </body>
        </ContextProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
