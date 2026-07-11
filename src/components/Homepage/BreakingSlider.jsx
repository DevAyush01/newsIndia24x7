// components/Homepage/BreakingSlider.jsx - Client Component
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BreakingSlider({ breakingNews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);

  // ✅ Screen size ke hisaab se itemsPerView set karo
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(3); // Mobile: 2 items
      } else if (width < 768) {
        setItemsPerView(2); // Tablet: 2 items
      } else if (width < 1024) {
        setItemsPerView(3); // Small desktop: 3 items
      } else {
        setItemsPerView(4); // Large desktop: 4 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // ✅ Sabhi posts
  const allNews = breakingNews;

  if (allNews.length === 0) return null;

  // ✅ Total slides calculate karo
  const totalSlides = Math.max(1, Math.ceil(allNews.length - itemsPerView + 1));

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

  // ✅ Slide position calculate karo
  const getSlidePosition = () => {
    return -currentIndex * (100 / itemsPerView);
  };

  // ✅ Item width calculate karo
  const getItemWidth = () => {
    return `${100 / itemsPerView}%`;
  };

  return (
    <div className="mt-4 sm:mt-8 relative sm:px-0 px-2">
      {/* Header - BREAKING heading with arrows */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="flex items-center gap-2 text-base sm:text-xl font-semibold text-gray-900">
          <div className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-red-600 border-t-[4px] sm:border-t-[6px] border-t-transparent border-b-[4px] sm:border-b-[6px] border-b-transparent"></div>
          ब्रेकिंग
        </h3>
        
        {/* Arrow Buttons - Mobile pe hide, desktop pe show */}
        <div className=" flex items-center gap-2">
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
          className="flex transition-transform duration-500 ease-in-out gap-1.5 sm:gap-2"
          style={{
            transform: `translateX(${getSlidePosition()}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {allNews.map((post, index) => (
            <div 
              key={post.id} 
              className="flex-shrink-0 px-0.5 sm:px-1.5"
              style={{ width: getItemWidth() }}
            >
              <Link href={`/post/${post.slug}`}>
                <article className="group relative h-[180px] sm:h-[200px] md:h-[230px] overflow-hidden rounded-md bg-gray-200">
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
                  
                  <div className="absolute bottom-0 p-2 sm:p-3">
                    <h3 className="text-white text-xs sm:text-sm font-bold leading-snug line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator - Mobile aur desktop dono pe show */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-1 sm:gap-1.5 mt-2 sm:mt-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentIndex(index);
                }
              }}
              className={`h-1 sm:h-1.5 rounded-full transition-all ${
                currentIndex === index ? "w-4 sm:w-6 bg-red-600" : "w-2 sm:w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}