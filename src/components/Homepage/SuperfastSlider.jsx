// components/Homepage/SuperfastSlider.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default function SuperfastSlider({ posts, initialSlug }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (initialSlug && posts?.length > 0) {
      const index = posts.findIndex(
        (post) => post.slug === initialSlug
      );

      if (index !== -1) {
        setCurrentSlide(index);
      }
    }
  }, [initialSlug, posts]);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + posts.length) % posts.length
    );
  };

  const getTimeAgo = (date) => {
  const diff = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const mins = Math.floor(diff / 60);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours} hrs ago`;
  if (mins > 0) return `${mins} min ago`;

  return "Just now";
};

  const excerpt =
    currentPost.excerpt
      ?.replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .slice(0, 180) || "";

  const imageUrl =
    currentPost.featuredImage?.node?.sourceUrl || null;

  const categoryName =
    currentPost.categories?.nodes?.[0]?.name ||
    currentPost.category?.name ||
    currentPost.categories?.edges?.[0]?.node?.name ||
    "ताज़ा खबर";

  return (
    <section className="py-10">
      <div className="max-w-[380px] mx-auto relative h-[650px]">

        {/* Background */}
        <div className="absolute inset-0">
          <div className="h-[55%] bg-white" />
          <div className="h-[45%] bg-[#08204a]" />
        </div>

   <div className="relative z-30 flex items-center justify-center gap-3 mb-6">

  <Image
    src="/news-indiaLogo.png"
    alt="News India 24x7"
    width={42}
    height={42}
    priority
  />

   <div className="flex flex-col items-center leading-none">
   <span className="text-red-600 font-black text-[28px] tracking-tighter leading-none" style={{ fontStyle: "italic" }}>

                सुपरफास्ट

              </span>

              <div className="flex items-center justify-center gap-1 mt-0.5">

                <span className="text-gray-700 font-bold text-[12px] tracking-[0.2em] uppercase">NEWS</span>

                <span className="flex gap-px">

                  {[12, 9, 7].map((h, i) => (

                    <span key={i} className="inline-block w-px bg-red-500" style={{ height: h }}></span>

                  ))}

                </span>

              </div>
</div>



</div>

        {/* Main Card */}
        {/* Main Card */}
<div className="relative mx-4 bg-white rounded-[40px] overflow-hidden shadow-xl">
<div className="relative h-[220px] overflow-visible rounded-t-[40px]">

  {imageUrl ? (
    <Image
      src={imageUrl}
      alt={currentPost.title}
      fill
      className="object-cover"
      priority
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
      <span className="text-5xl text-white">📰</span>
    </div>
  )}

  {/* Home Button */}
  <Link
    href="/"
    className="absolute top-4 left-4 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
  >
    ...
  </Link>

  {/* Floating Category */}
  <div className="absolute -bottom-3 left-4 z-30">
    <span className="bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
      {categoryName}
    </span>
  </div>

  {/* Floating Share */}
  <button
    className="
      absolute
      -bottom-5
      right-4
      z-[9000]
      w-11
      h-11
      rounded-full
      bg-white
      shadow-xl
      flex
      items-center
      justify-center
      cursor-pointer
    "
  >
    <svg
      className="w-5 h-5 text-gray-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.59 13.51l6.83 3.98M15.42 6.51l-6.83 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zm12 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>

</div>

  {/* Content */}
  <div className="p-6">

    

<p className="text-gray-400 text-sm">
  {getTimeAgo(currentPost.date)}
</p>

    {/* Title */}
    <h2 className="text-[18px] font-bold leading-[26px] mt-3 line-clamp-3 text-black">
      {currentPost.title}
    </h2>

    {/* Excerpt */}
    <p className="text-[15px] text-black mt-2  line-clamp-3">
      {excerpt}
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between mt-8">

      <span className="text-sm text-gray-500">
        {currentSlide + 1}/{posts.length}
      </span>

      <Link
        href={`/post/${currentPost.slug}`}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-all duration-300"
      >
        Read More
      </Link>

    </div>
  </div>
</div>

        {/* Desktop Navigation */}
        <div className="absolute right-[-55px] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-30">

          <button
            onClick={prevSlide}
            className="w-11 h-11 cursor-pointer rounded-full border border-red-500 bg-white text-red-600 flex items-center justify-center hover:bg-red-50 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <div className="flex flex-col gap-3 my-5">
            {posts.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentSlide(index)
                }
                className={`rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-3 h-3 bg-red-600"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-11 h-11 cursor-pointer rounded-full border border-red-500 bg-white text-red-600 flex items-center justify-center hover:bg-red-50 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden absolute bottom-[-60px] left-0 right-0 flex justify-center items-center gap-4">

          <button
            onClick={prevSlide}
            className="w-10 h-10 cursor-pointer rounded-full bg-white border border-gray-300 flex items-center justify-center"
          >
            ←
          </button>

          <div className="flex gap-2">
            {posts.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentSlide(index)
                }
                className={`rounded-full transition-all ${
                  currentSlide === index
                    ? "w-6 h-2 bg-red-600"
                    : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 cursor-pointer rounded-full bg-white border border-gray-300 flex items-center justify-center"
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}