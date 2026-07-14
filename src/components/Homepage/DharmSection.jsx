// components/Homepage/DharmSection.jsx - ✅ Fixed - Better Duplicate Removal

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function DharmSection({ religiousData, rasifalData }) {
  
  const allPosts = [...(religiousData || []), ...(rasifalData || [])];
  
  const seen = new Set();
  const uniquePosts = allPosts.filter(post => {
    const key = post.slug || post.id;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
  
  
  const dharmPosts = uniquePosts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);


  if (!dharmPosts.length) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto py-2">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
          <h2 className="text-[20px] font-bold">धर्म</h2>
        </div>

        <Link
          href="/category/religious"
          className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
        >
          और भी
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-gray-50 p-3">

        {/* Left Featured */}
        {dharmPosts[0] && (
          <Link
            href={`/post/${dharmPosts[0].slug}`}
            className="block group"
          >
            <div className="relative h-[280px] overflow-hidden">
              <Image
                src={dharmPosts[0].featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                alt={dharmPosts[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-3 text-base sm:text-2xl font-bold leading-snug group-hover:text-red-600 transition-colors">
              {dharmPosts[0].title}
            </h3>
          </Link>
        )}

        {/* Right News List */}
        <div>
          {dharmPosts.slice(1, 5).map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="flex gap-3 py-3 border-b border-gray-300 last:border-b-0 group"
            >
              <div className="relative w-[120px] h-[70px] flex-shrink-0 overflow-hidden">
                <Image
                  src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="text-sm sm:text-base leading-relaxed group-hover:text-red-600 transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}