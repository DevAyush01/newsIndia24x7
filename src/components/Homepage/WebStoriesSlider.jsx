// components/Homepage/WebStoriesSlider.jsx - ✅ Client Component

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function WebStoriesSlider({ stories }) {
  const sliderRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // ✅ Check scroll position to show/hide buttons
  const checkScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setShowLeft(scrollLeft > 20);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // ✅ Initial check
    checkScroll();

    // ✅ Add scroll event listener
    slider.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
      <div className="border border-gray-300 rounded-md bg-white p-4">
    <div className="relative">
      {/* ✅ Left Button - Only show when scrolled right */}
      {showLeft && (
        <button
          onClick={scrollLeft}
          className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* ✅ Right Button - Only show when there's more content */}
      {showRight && (
        <button
          onClick={scrollRight}
          className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* ✅ Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story) => {
          const imageUrl =
            story?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            story?.featured_image_url ||
            "";

          const title =
            story?.title?.rendered ||
            story?.title ||
            "Web Story";

          return (
            <Link
              key={story.id}
              href={`/web-stories/${story.slug}`}
             className="flex-shrink-0 w-[138px]"
            >
<article className="bg-white border border-gray-300 rounded overflow-hidden hover:shadow-md transition">
                  <div className="relative h-[185px] w-full bg-gray-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* ✅ Play Icon Badge
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div> */}
                </div>

                <div className="px-2 py-2">
  <h3 className="text-[15px] sm:text-[13px] font-bold leading-5 line-clamp-3 text-black">
                    {title}
                  </h3>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* ✅ CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
    </div>

  );
}