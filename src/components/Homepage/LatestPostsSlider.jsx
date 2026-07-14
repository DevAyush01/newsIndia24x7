"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SuperfastSlider({ posts }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const excerpt =
    currentPost.excerpt?.replace(/<[^>]*>/g, "").slice(0, 140) || "";

  return (
    <section className="py-10">
      <div className="max-w-[430px] mx-auto relative h-[760px]">

        {/* OUTER BOX HALF WHITE HALF BLUE */}
        <div className="absolute inset-0">
          <div className="h-1/2 bg-white" />
          <div className="h-1/2 bg-[#08204a]" />
        </div>

        {/* LOGO */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
          <h2 className="text-red-600 font-bold text-xl">
            NewsIndia24x7
          </h2>
        </div>

        {/* FLOATING CARD */}
        <div className="absolute top-16 left-4 right-4 z-20 bg-white rounded-[38px] overflow-hidden shadow-2xl">

          {/* Top Image */}
          <div className="relative h-[260px]">

            {currentPost.featuredImage?.node?.sourceUrl ? (
              <Image
                src={currentPost.featuredImage.node.sourceUrl}
                alt={currentPost.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}

            {/* Home Button */}
            <Link
              href="/"
              className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white"
            >
              🏠
            </Link>

            {/* Category */}
            <div className="absolute bottom-4 left-4">
              <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {currentPost.categories?.nodes?.[0]?.name || "ताज़ा खबर"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">

            <p className="text-gray-500 text-sm">
              {new Date(currentPost.date).toLocaleDateString("hi-IN")}
            </p>

            <h2 className="text-2xl font-bold leading-tight mt-3 line-clamp-3">
              {currentPost.title}
            </h2>

            <p className="text-gray-600 mt-4 text-sm leading-7 line-clamp-4">
              {excerpt}
            </p>

            <div className="flex items-center justify-between mt-6">

              <span className="text-sm text-gray-400">
                {currentSlide + 1}/{posts.length}
              </span>

              <Link
                href={`/post/${currentPost.slug}`}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT NAVIGATION */}
        <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-30">

          <button
            onClick={prevSlide}
            className="w-11 h-11 rounded-full border border-red-500 bg-white text-red-600"
          >
            ▲
          </button>

          <div className="flex flex-col gap-3 my-5">
            {posts.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`rounded-full transition-all ${
                  currentSlide === index
                    ? "w-3 h-3 bg-red-600"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-11 h-11 rounded-full border border-red-500 bg-white text-red-600"
          >
            ▼
          </button>
        </div>

        {/* ADVERTISEMENT */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <span className="text-white text-xs tracking-widest">
            ADVERTISEMENT
          </span>
        </div>

      </div>
    </section>
  );
}