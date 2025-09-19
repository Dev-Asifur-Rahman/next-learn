
import { pusher } from "@/lib/pusher";
import { Bannerbear } from "bannerbear";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);

    const uid = data.uid;

    const finalImage = await bb.get_image(uid);

    if (finalImage?.status === "completed") {
      console.log(finalImage)
      await pusher.trigger("certificate",'certificate-ready',{
        success: true,
        finalImage
      })
    } else {
      console.log("Image not ready yet:", uid);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
