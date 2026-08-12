import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let paramsToSign: Record<string, unknown> = {};
  try {
    const body = await request.json();
    if (body && typeof body.paramsToSign === "object" && body.paramsToSign !== null) {
      paramsToSign = body.paramsToSign;
    }
  } catch {
    // fall through with empty params
  }

  if (typeof paramsToSign.timestamp !== "number") {
    paramsToSign.timestamp = Math.round(Date.now() / 1000);
  }
  if (typeof paramsToSign.folder !== "string" || paramsToSign.folder.length === 0) {
    paramsToSign.folder = "portfolio";
  }

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }

  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

  return NextResponse.json({ signature, api_key: apiKey });
}
