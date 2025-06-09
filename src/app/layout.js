import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata = {
  title : {
    default : 'NextLearn',
    template : '%s'
  }
  
  
}

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
