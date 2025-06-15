import NavBar from "@/components/NavBar";
import "./globals.css";
import { Link } from 'next/link';

export const metadata = {
  title: {
    default: "NextLearn",
    template: "%s",
  },
  icons : {
    icon : '/next-learn-favicon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar></NavBar>

        <section className="border w-full">
          <p className="">App Layout</p>
          <div>{children}</div>
        </section>
      </body>
    </html>
  );
}
