import { Bannerbear } from "bannerbear";
import { NextResponse } from "next/server";

export async function POST(req) {
  const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);

  const images = await bb.create_image("2j8dyQZWNE9pb7A9Lm", {
    modifications: [
      { name: "signature", text: "Your Signature" },
      { name: "date", text: "2025-09-15" },
      { name: "subtitle", text: "Certificate Subtitle" },
      { name: "name", text: "John Doe" },
    ],
    webhook_url: `${process.env.WEBHOOK_URL}/api/student/bannerbear-webhook`,
    transparent: false,
  });

  return NextResponse.json({
    success: true,
    uid: images.uid,
    status: images.status,
  });
}
