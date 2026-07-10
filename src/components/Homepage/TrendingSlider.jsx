// components/TrendingSlider.jsx - ✅ Swiper with Cache

"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// ✅ Global Cache - Data ek baar fetch hoga
let cachedTags = null;
let isFetching = false;

export default function TrendingSlider() {
  const [trendingTags, setTrendingTags] = useState(cachedTags || []);
  const [loading, setLoading] = useState(!cachedTags);
  const swiperRef = useRef(null);

  useEffect(() => {
    // ✅ Agar cache hai toh turant show karo
    if (cachedTags) {
      setTrendingTags(cachedTags);
      setLoading(false);
      return;
    }

    // ✅ Agar fetch ho raha hai toh wait karo
    if (isFetching) return;
    isFetching = true;

    async function fetchTags() {
      try {
        const { getTrendingTags } = await import("@/lib/wordpress");
        const tags = await getTrendingTags(20);
        cachedTags = tags;
        setTrendingTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
        isFetching = false;
      }
    }

    fetchTags();
  }, []);

  if (loading) {
    return (
      <section className="border-t-2 border-red-600 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-10 w-28 animate-pulse rounded-full bg-zinc-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!trendingTags.length) return null;

  return (
    <section className=" bg-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Prev Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden cursor-pointer md:flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-red-500 hover:shadow-md"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Swiper Slider */}
          <div className="relative flex-1 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent" />

            <Swiper
              modules={[FreeMode]}
              freeMode
              slidesPerView="auto"
              spaceBetween={22}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {trendingTags.map((tag) => (
                <SwiperSlide key={tag.slug} className="!w-auto">
                  <Link
                    href={`/tag/${tag.slug}`}
                    className="
                      group
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-zinc-200
                      bg-white
                      px-4
                      py-1
                      text-[11px]
                      font-semibold
                      text-zinc-800
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-red-500
                      hover:text-red-600
                      hover:shadow-md
                    "
                  >
                    <span>{tag.name}</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Next Button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden cursor-pointer md:flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-red-500 hover:shadow-md"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}