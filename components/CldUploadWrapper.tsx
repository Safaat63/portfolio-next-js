"use client";

import Image from "next/image";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";

type CldUploadWrapperProps = {
  value: string;
  onUploaded: (url: string) => void;
  label?: string;
};

export function CldUploadWrapper({ value, onUploaded, label = "Image" }: CldUploadWrapperProps) {
  return (
    <div>
      <span className="label-field">{label}</span>
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {value ? (
            <Image
              src={value}
              alt="Upload preview"
              fill
              sizes="144px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="grid h-full w-full place-items-center p-2 text-center text-[11px] text-slate-500">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <CldUploadWidget
            signatureEndpoint="/api/cloudinary-signature"
            options={{ folder: "portfolio" }}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const info = result.info;
              if (typeof info === "object" && info !== null && "secure_url" in info) {
                const secureUrl = (info as { secure_url?: string }).secure_url;
                if (secureUrl) onUploaded(secureUrl);
              }
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="btn-ghost !py-2">
                <ImagePlus className="h-4 w-4" />
                Upload
              </button>
            )}
          </CldUploadWidget>

          {value && (
            <button
              type="button"
              onClick={() => onUploaded("")}
              className="inline-flex items-center gap-1 text-xs text-rose-300 transition-colors hover:text-rose-200"
            >
              <X className="h-3 w-3" />
              Remove image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
