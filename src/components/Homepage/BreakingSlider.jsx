// components/Homepage/BreakingSlider.jsx - Client Component
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BreakingSlider({ breakingNews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ Sabhi posts
  const allNews = breakingNews;

  if (allNews.length === 0) return null;

  // ✅ 4 items visible, 1-1 slide hoga
  const itemsPerView = 4;
  
  // ✅ Total slides = total news - 3 (kyunki 4 items visible hain)
  const totalSlides = Math.max(1, allNews.length - itemsPerView + 1);

  const nextSlide = () => {
    if (isTransitioning || currentIndex >= totalSlides - 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // ✅ Transition end par enable karo
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  // ✅ Visible items ko calculate karo
  const getVisibleItems = () => {
    const start = currentIndex;
    const end = start + itemsPerView;
    return allNews.slice(start, end);
  };

  const visibleItems = getVisibleItems();

  // ✅ Slide position calculate karo
  const getSlidePosition = () => {
    return -currentIndex * (100 / itemsPerView);
  };

  return (
    <div className="mt-8 relative">
      {/* Header - BREAKING heading with arrows */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
         <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
          ब्रेकिंग
        </h3>
        
        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0 || isTransitioning}
            className={`rounded-full cursor-pointer p-1.5 transition-all duration-300 ${
              currentIndex === 0 || isTransitioning
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= totalSlides - 1 || isTransitioning}
            className={`rounded-full cursor-pointer p-1.5 transition-all duration-300 ${
              currentIndex >= totalSlides - 1 || isTransitioning
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider - Smooth slide animation */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${getSlidePosition()}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allNews.map((post, index) => (
            <div 
              key={post.id} 
              className="flex-shrink-0 w-1/4 px-1.5"
            >
              <Link href={`/post/${post.slug}`}>
                <article className="group relative h-[230px] overflow-hidden rounded-md bg-gray-200">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  
                  <div className="absolute bottom-0 p-3">
                    <h3 className="text-white text-sm font-bold leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentIndex(index);
                }
              }}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-red-600" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}