import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export type UploadSignature = {
  timestamp: number;
  signature: string;
  api_key: string;
  apiKey: string;
  cloud_name: string;
  cloudName: string;
  folder: string;
};

export function createUploadSignature(folder: string): UploadSignature {
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign: Record<string, unknown> = {
    folder,
    timestamp,
  };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret ?? "");

  return {
    timestamp,
    signature,
    api_key: apiKey!,
    apiKey: apiKey!,
    cloud_name: cloudName!,
    cloudName: cloudName!,
    folder,
  };
}

export function isCloudinaryUrl(url: string): boolean {
  return url.startsWith("https://res.cloudinary.com/");
}

export function withTransform(url: string, transform: string): string {
  if (!isCloudinaryUrl(url)) return url;
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}
