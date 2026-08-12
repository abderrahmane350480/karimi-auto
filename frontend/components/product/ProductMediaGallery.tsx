"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductMediaGalleryProps {
  images: string[];
  arabicName: string;
}

export default function ProductMediaGallery({
  images,
  arabicName,
}: ProductMediaGalleryProps) {
  const galleryImages = images.length > 1 ? images.slice(1) : images;
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-border">
        <Image
          src={galleryImages[selected] ?? galleryImages[0]}
          alt={arabicName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {galleryImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selected === idx
                  ? "border-accent"
                  : "border-transparent"
              }`}
              aria-label={`صورة ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`${arabicName} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
