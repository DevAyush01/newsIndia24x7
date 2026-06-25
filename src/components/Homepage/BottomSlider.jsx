// components/Homepage/BottomSlider.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BottomSlider({ sliderData }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Agar data nahi hai toh empty state
  if (!sliderData || sliderData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 border-b-2 border-red-600 pb-3 mb-4">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">LIVE</span>
            <h2 className="text-xl font-bold text-gray-700">कोई समाचार उपलब्ध नहीं</h2>
          </div>
        </div>
      </div>
    );
  }

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const currentPost = sliderData[currentSlide];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        

        {/* Slider Content */}
        <div className="relative">
          <Link href={`/post/${currentPost.slug}`} className="block group">
            <div className="relative w-full h-64 md:h-80 lg:h-[70vh] bg-gray-200">
              {currentPost.featuredImage?.node?.sourceUrl ? (
                <Image
                  src={currentPost.featuredImage.node.sourceUrl}
                  alt={currentPost.title}
                  fill
                  className="object-fill"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-6xl text-gray-300">📰</span>
                </div>
              )}
              
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2">
                  {currentPost.title}
                </h3>
                <span className="text-white/80 text-xs mt-1 inline-block">
                  {new Date(currentPost.date).toLocaleDateString('hi-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg transition-all z-10 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg transition-all z-10 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}