"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function CloudImage(props: ImageProps) {
  const { className, alt, ...imageProps } = props;
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 grid place-items-center bg-gradient-to-br from-teal-500/20 via-sky-500/10 to-violet-500/20",
          className
        )}
      >
        <ImageOff className="h-10 w-10 text-slate-500" />
      </div>
    );
  }

  return <Image {...imageProps} alt={alt} className={className} onError={() => setFailed(true)} />;
}
