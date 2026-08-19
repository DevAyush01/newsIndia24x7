"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPostsByCategory, getLatestPosts } from "@/lib/wordpress";

// Category tabs data
const CATEGORIES = [
  { slug: "national", label: "देश" },
  { slug: "world", label: "दुनिया" },
  { slug: "sports", label: "खेल" },
  { slug: "entertainment", label: "मनोरंजन" },
];

export default function LiveTvPage() {
  const [activeCategory, setActiveCategory] = useState("national");
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);

  // Fetch latest posts on mount - 10 posts
  useEffect(() => {
    async function fetchLatest() {
      setLatestLoading(true);
      try {
        const posts = await getLatestPosts(10); // ✅ 10 posts
        setLatestPosts(posts || []);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        setLatestPosts([]);
      } finally {
        setLatestLoading(false);
      }
    }
    fetchLatest();
  }, []);

  // Fetch category posts when active category changes - 5 posts
  useEffect(() => {
    async function fetchCategoryPosts() {
      setLoading(true);
      try {
        const posts = await getPostsByCategory(activeCategory, 5);
        setCategoryPosts(posts || []);
      } catch (error) {
        console.error("Error fetching category posts:", error);
        setCategoryPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryPosts();
  }, [activeCategory]);

  return (
    <section className="container max-w-7xl mx-auto py-4 px-4">
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT - YouTube Live TV */}
        <div className="col-span-12 lg:col-span-9">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-red-600 font-bold text-sm tracking-wide uppercase">
              NewsIndia24x7 लाइव
            </span>
            <span className="bg-red-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>

          {/* YouTube Player */}
          <div className="relative bg-black overflow-hidden border border-gray-200">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/VECLDoKDOOk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                allowFullScreen
                title="NewsIndia24x7 Live TV"
              />
            </div>
          </div>

          {/* Category News Section */}
          <div className="mt-8">
            {/* Top Navigation - खबरें LEFT | Categories CENTER | और भी RIGHT */}
            <div className="flex items-center border-b border-gray-300 overflow-x-auto whitespace-nowrap mb-6">
              {/* LEFT - खबरें with Red Bar Design */}
              <div className="flex items-center mr-4 flex-shrink-0">
                <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                <span className="text-xl font-bold text-black">
                  खबरें
                </span>
              </div>

              {/* CENTER - Categories */}
              <div className="flex-1 flex justify-center items-center gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-3 py-3 cursor-pointer text-[15px] transition-all duration-200 flex-shrink-0 ${
                      activeCategory === cat.slug
                        ? "text-red-600 border-b-2 border-red-600 font-semibold"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* RIGHT - और भी - Routes to current active category page */}
              <Link
                href={`/category/${activeCategory}`}
                className="text-[15px] font-semibold text-black hover:text-red-600 transition-colors flex-shrink-0 ml-2"
              >
                और भी
              </Link>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-[16/10]"></div>
                    <div className="h-5 bg-gray-200 mt-3 rounded"></div>
                    <div className="h-5 bg-gray-200 mt-2 rounded w-4/5"></div>
                  </div>
                ))}
              </div>
            ) : categoryPosts.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                इस कैटेगरी में कोई खबर नहीं है
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                {categoryPosts.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="group"
                  >
                    <article>
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-[15px] leading-7 font-bold text-black group-hover:text-red-600 transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - Latest News - 10 items */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white">
            {/* Header */}
            <div className="pb-2.5 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                लेटेस्ट
              </h3>
            </div>

            {/* Latest News List - 10 items */}
            {latestLoading ? (
              <div className="py-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 animate-pulse">
                    <div className="w-[100px] h-[66px] bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {latestPosts.slice(0, 10).map((post, index) => {
                  const titleParts = post.title.split(':');
                  const hasCategory = titleParts.length > 1;
                  const category = hasCategory ? titleParts[0].trim() : '';
                  const headline = hasCategory ? titleParts.slice(1).join(':').trim() : post.title;

                  return (
                    <Link key={post.id} href={`/post/${post.slug}`}>
                      <div className={`flex items-start gap-3 py-5 hover:bg-red-50 transition-colors group ${
                        index !== 9 ? 'border-b border-gray-200' : ''
                      }`}>
                        {/* Left - Image */}
                        {post.featuredImage?.node?.sourceUrl ? (
                          <div className="relative w-[100px] h-[66px] overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-[100px] h-[66px] flex-shrink-0 bg-gray-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Right - Category Bold + Title */}
                        <div className="flex-1 min-w-0">
                          {hasCategory ? (
                            <h4 className="text-sm text-gray-800 group-hover:text-red-600 transition-colors leading-relaxed">
                              <span className="font-bold">{category}:</span>{' '}
                              <span>{headline}</span>
                            </h4>
                          ) : (
                            <h4 className="text-[15px] font-normal text-gray-800 group-hover:text-red-600 transition-colors leading-relaxed">
                              {post.title}
                            </h4>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}