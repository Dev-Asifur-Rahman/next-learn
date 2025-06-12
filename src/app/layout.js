

import NavBar from "@/components/NavBar";
import "./globals.css";
import { Context } from "@/Context";

export const metadata = {
  title: {
    default: "NextLearn",
    template: "%s",
  },
};

export default function RootLayout({ children }) {
  const greet = 'hello'
  const Provider = {greet};
  return (
    <html lang="en">
      <body>
        <NavBar></NavBar>
        <Context.Provider value={Provider}>
          <section className="border w-full">
            <p className="">App Layout</p>
            <div>{children}</div>
          </section>
        </Context.Provider>
      </body>
    </html>
  );
}
