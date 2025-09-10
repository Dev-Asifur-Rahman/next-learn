import { Bannerbear } from "bannerbear";
const { NextResponse } = require("next/server");

export async function POST(req) {
  const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);
  const images = await bb.create_image("2j8dyQZWNE9pb7A9Lm", {
    modifications: [
      {
        name: "signature",
        text: "You can change this text",
        color: null,
        background: null,
      },
      {
        name: "date",
        text: "You can change this text",
        color: null,
        background: null,
      },
      {
        name: "subtitle",
        text: "You can change this text",
        color: null,
        background: null,
      },
      {
        name: "name",
        text: "You can change this text",
        color: null,
        background: null,
      },
    ],
    webhook_url: `${process.env.NEXTAUTH_URL}/api/student/bannerbear-webhook`,
    transparent: false,
    metadata: null,
  });
  return NextResponse.json({
    success: true,
    image: images,
  });
}
