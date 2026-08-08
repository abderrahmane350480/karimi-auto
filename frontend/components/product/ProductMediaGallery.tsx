"use client";

import { useState } from "react";

interface ProductMediaGalleryProps {
  images: string[]; // Replace with real images before launch
  arabicName: string;
}

export default function ProductMediaGallery({
  images,
  arabicName,
}: ProductMediaGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — Replace with real product image before launch */}
      <div
        className="img-placeholder w-full aspect-square rounded-2xl text-sm"
        role="img"
        aria-label={arabicName}
      >
        <div className="text-center px-6">
          <div className="text-6xl mb-3">🚗</div>
          <span className="text-white/80 text-sm font-arabic">{arabicName}</span>
          <br />
          <span className="text-white/40 text-xs mt-1 block">
            صورة توضيحية — تُستبدل قبل الإطلاق
          </span>
        </div>
      </div>

      {/* Thumbnails — Replace with real product images before launch */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg img-placeholder border-2 transition-colors ${
                selected === idx
                  ? "border-accent"
                  : "border-transparent"
              }`}
              aria-label={`صورة ${idx + 1}`}
            >
              <span className="text-white/60 text-xs">{idx + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
