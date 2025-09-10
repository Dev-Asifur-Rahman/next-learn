import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  console.log("Webhook received:", data.image_url); 
  return NextResponse.json({ success: true });
}
