import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
  const imageUrl = "http://localhost:3000/images/certificate.png";

  const html = `
  <html>
    <body style="margin:0; padding:0;">
      <img src="${imageUrl}" 
           style="width:100%; height:100%; display:block;" />
    </body>
  </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const imageBuffer = await page.screenshot({ type: "png" });

  await browser.close();

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=certificate.png",
    },
  });
}
