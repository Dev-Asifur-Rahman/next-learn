import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import path from "path";
import mongoDb, { collections } from "@/lib/mongoConnect";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { pusher } from "@/lib/pusher";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(req) {
  const { name, courseName, email, courseId } = await req.json();
  const fontPath = path.join(process.cwd(), "public", "fonts", "cochin.ttf");

  const description = `This certificate is proudly presented for the successful completion of the ${courseName} on NextLearn. The recipient has demonstrated dedication, commitment to learning, and the ability to acquire valuable knowledge and practical skills for personal and professional growth.`;

  // dimensions
  const width = 3717;
  const height = 2625;

  const html = `
  <html>
    <head>
      <style>
      @font-face {
          font-family: 'Cochin';
          src: url('file://${fontPath}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: transparent;
        }
        .container {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          font-family: 'Cochin', Arial, sans-serif;
        }
        .certificate-bg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .name {
          position: absolute;
          top: 42%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 100px;
          font-weight: 600;
          text-align: center;
        }
        .description {
          position: absolute;
          width: 87%;
          bottom: 24%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 90px;
          line-height: 1.4;
        }
        .date {
          position: absolute;
          bottom: 13%;
          left: 19%;
          font-size : 75px;
          font-weight : 500 ;
          transform: translateX(-50%);
        }
        .signature {
          position: absolute;
          bottom: 13%;
          right: 24.5%;
          transform: translateX(50%);
          font-weight: 600;
          font-size: 80px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="http://localhost:3000/images/certificate.png" class="certificate-bg" />
        <p class="name">${name}</p>
        <p class="description">${description}</p>
        <p class="date">${dayjs().tz("Asia/Dhaka").format()}</p>
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

  // Set viewport same as PNG size
  await page.setViewport({ width, height });
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.evaluate(() => {
    document.body.style.background = "transparent";
  });

  // Screenshot full page with transparent background
  // const imageBuffer = await page.screenshot({
  //   type: "png",
  //   omitBackground: true,
  //   clip: { x: 0, y: 0, width: width, height: height },
  // });

  const pdfBuffer = await page.pdf({
    printBackground: true,
    width: `${width}px`,
    height: `${height}px`,
  });

  await browser.close();

  const students = await mongoDb(collections.student);

  const student = await students.findOne({ email: email });


  const alreadyHasCertificate = student.certificates.some(
    (c) => c.courseId === courseId
  );
//  check already certificate is generated 
  if (!alreadyHasCertificate) {
    const result = await students.updateOne(
      { email: email },
      {
        $push: {
          certificates: {
            courseId: courseId,
            certificate: pdfBuffer,
            createdAt: dayjs().tz("Asia/Dhaka").format(),
          },
        },
      },
      { upsert: false }
    );
    if (result.matchedCount === 1) {
      await pusher.trigger("certificate", "certificate-ready", {});
      return NextResponse.json({success : true})
    }
  }
  else{
    return NextResponse.json({success : false,message : 'Certificate is Already Generated'})
  }
}

// use this if you want to see it in a new tab
// uncomment screenshot and uncomment front end page of my certificates

// use application/png for generate png image

// return new NextResponse(imageBuffer, {
//   headers: {
//     "Content-Type": "application/png",
//     "Content-Disposition": "inline; filename=certificate.pdf",
//   },
// });
