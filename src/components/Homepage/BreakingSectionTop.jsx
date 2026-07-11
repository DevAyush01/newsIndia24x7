"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function BreakingSectionTop({ breakingNews }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!breakingNews?.length) return null;
  if (!isVisible) return null;

  const mainBreaking = breakingNews[0];

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
 <div className="w-full  bg-white border-b border-gray-200 sm:py-3 sm:border-b-0">
  <div className="max-w-6xl mx-auto sm:px-4">

  {/* Mobile */}
<div className="sm:hidden bg-red-600 h-9 flex items-center text-white py-6">

  {/* Breaking Label */}
  <div className="px-1 h-full flex flex-col justify-center items-end bg-red-600 shrink-0">
    <span className="font-black italic text-[13px] leading-none">BREAKING</span>
    <span className="font-black italic text-[13px] leading-none">NEWS</span>
  </div>

  {/* Divider */}
  <div className="w-px h-10 bg-white/70 mx-2 shrink-0" />

  {/* News */}
  <div className="flex-1 overflow-hidden">
    <Link
      href={`/post/${mainBreaking.slug}`}
      className="block 
       font-bold text-[13px]"
    >
      {mainBreaking.title}
    </Link>
  </div>


</div>

    {/* Desktop */}
    <div className="hidden sm:flex bg-red-600 rounded-full h-10 items-center px-5 text-white overflow-hidden">

      <div className="font-black italic text-2xl uppercase shrink-0">
        BREAKING NEWS
      </div>

      <div className="mx-5 h-6 w-px bg-white/70" />

      <div className="flex-1 overflow-hidden">
        <Link
          href={`/post/${mainBreaking.slug}`}
          className="block truncate font-semibold text-lg"
        >
          {mainBreaking.title}
        </Link>
      </div>

      <button onClick={handleClose} className="ml-4 cursor-pointer">
        <X size={20} />
      </button>

    </div>

  </div>
</div>
  );
}