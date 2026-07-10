"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function BreakingSectionTop({ breakingNews }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!breakingNews?.length) return null;
  if (!isVisible) return null;

  const mainBreaking = breakingNews[0];

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="w-full py-3 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-red-600 rounded-full h-10 flex items-center px-5 text-white overflow-hidden">
          
          {/* Breaking Label */}
          <div className="shrink-0 font-black italic text-2xl uppercase">
            BREAKING NEWS
          </div>

          {/* Divider */}
          <div className="mx-5 h-6 w-px bg-white/70 shrink-0" />

          {/* News Text */}
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <Link
              href={`/post/${mainBreaking.slug}`}
              className="font-semibold text-lg hover:text-white"
            >
              {mainBreaking.title}
            </Link>
          </div>

          {/* Close Icon */}
          <button onClick={handleClose} className="ml-4 shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
            <X size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}