import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req) {
  // Get dynamic data from request body
  const { name, courseName, date } = await req.json();

  const imageUrl = "http://localhost:3000/images/certificate.png";

  // Build dynamic description
  const description = `This certificate is proudly presented for the successful completion of the ${courseName} on NextLearn. The recipient has demonstrated dedication, commitment to learning, and the ability to acquire valuable knowledge and practical skills for personal and professional growth.`;

  const html = `
  <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          position: relative;
        }
        .container {
          position: relative;
          width: 1440px;
          height: 1024px;
        }
        .certificate-bg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .name {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
        }
        .description {
          position: absolute;
          bottom: 31%;
          width: 100%;
          padding: 0 6%;
          font-size: 1.3rem;
          line-height: 1.6;
          text-align: center;
        }
        .date {
          position: absolute;
          bottom: 16%;
          left: 24%;
          transform: translateX(-50%);
        }
        .signature {
          position: absolute;
          bottom: 16%;
          right: 24.5%;
          transform: translateX(50%);
          font-weight: bold;
          font-size: 1.8rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="${imageUrl}" class="certificate-bg" />
        <p class="name">${name}</p>
        <p class="description">${description}</p>
        <p class="date">${date}</p>
        <p class="signature">Asif</p>
      </div>
    </body>
  </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const imageBuffer = await page.screenshot({ type: "png", fullPage: true });

  await browser.close();

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "inline; filename=certificate.png",
    },
  });
}
