
import { Bannerbear } from "bannerbear";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const bb = new Bannerbear(process.env.BANNERBEAR_API_KEY);

    const uid = data.uid;
    console.log(uid,data?.status)

    // Get final image
    const finalImage = await bb.get_image(uid);

    if (finalImage.status === "completed") {
      console.log("🎉 Final Image Ready!");
      console.log("UID:", uid);
      console.log("Image URL:", finalImage.image_url);
      console.log("Full Object:", finalImage);
    } else {
      console.log("Image not ready yet:", uid);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
