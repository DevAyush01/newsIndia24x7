// components/Homepage/WorldSection.jsx - ✅ Updated with Desh/Crime Style

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WorldSection({ worldData }) {
  if (!worldData || worldData.length === 0) {
    return null;
  }

  return (
    <section className="w-full  bg-white overflow-hidden">
      
      {/* Header - Desh Style */}
      <div className="flex items-center justify-between mb-3  ">
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
          <h2 className="text-[20px] font-bold text-black">विश्व</h2>
        </div>
        <Link
          href="/category/world"
          className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
        >
          और भी
         <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      <div className="space-y-5">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* BIG NEWS - Featured */}
          {worldData[0] && (
            <Link
              href={`/post/${worldData[0].slug}`}
              className="group block"
            >
              <div className="relative h-[250px] overflow-hidden">
                {worldData[0].featuredImage?.node?.sourceUrl ? (
                  <>
                    <Image
                      src={worldData[0].featuredImage.node.sourceUrl}
                      alt={worldData[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-800 to-blue-700 flex items-center justify-center">
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[21px] font-bold">
                    {worldData[0].title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* RIGHT SIDE - 2 Small News */}
          <div className="flex flex-col">
            {worldData.slice(1, 3).map((post, index) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className={`group ${
                  index === 0 ? "pb-4 border-b border-gray-200" : "pt-4"
                }`}
              >
                <div className="flex gap-4">
                  <div className="relative w-[165px] h-[109px] shrink-0 overflow-hidden">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="165px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      </div>
                    )}
                  </div>
                  <h3 className="text-[17px] font-extrabold text-black group-hover:text-red-600">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* BOTTOM SECTION - 2 News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-gray-200 pt-5">
          {worldData.slice(3, 5).map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group"
            >
              <div className="flex gap-4">
                <div className="relative w-[165px] h-[109px] shrink-0 overflow-hidden">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="165px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    </div>
                  )}
                </div>
                <h3 className="text-[18px] leading-7 font-bold text-black group-hover:text-red-600">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}