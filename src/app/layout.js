import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <section className="border w-full">
          Hello
          <div>{children}</div>
        </section>
      </body>
    </html>
  );
}
