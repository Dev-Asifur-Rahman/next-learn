import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import path from "path";

export async function POST(req) {
  // get the image
  const certificate_bg = path.join(
    process.cwd(),
    "public",
    "images",
    "certificate.png"
  );

  // certificate template

  const html = `
  <html>
   <body style='margin:0; padding:0;
        width:1123px; height:794px;
        background-image: url('file://${certificate_bg}');
        background-size: cover;
        position: relative;
        font-family: Arial, sans-serif;'>

   </body>
  </html>
  `;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const imageBuffer = await page.screenshot({ type: "png", fullPage: true });

  await browser.close();

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=certificate.png",
    },
  });
}
