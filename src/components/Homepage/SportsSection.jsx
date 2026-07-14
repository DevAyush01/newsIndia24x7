// components/Homepage/SportsSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SportsSection({ sportsData }) {
  // Agar data nahi hai
  if (!sportsData || sportsData.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between border-b-2 border-red-600 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
              <h2 className="text-2xl font-bold text-black">खेल</h2>
            </div>
            <Link 
              href="/category/sports" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              और देखें <span>→</span>
            </Link>
          </div>
          <p className="text-gray-500 text-center py-8">कोई खेल समाचार नहीं</p>
        </div>
      </div>
    );
  }

  const mainPost = sportsData[0];
  const sidePosts = sportsData.slice(1, 5);
  const bottomPosts = sportsData.slice(5, 9);

  return (
   <div className="container mx-auto ">
  {/* Header */}
  <div className="flex justify-between items-center mb-3">
    <div className="flex items-center gap-2">
                <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />

       <h2 className="text-[20px] font-bold text-black">खेल</h2>
    </div>

    <Link
      href="/category/sports"
      className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
    >
      और भी 
      <span className="group-hover:translate-x-1 transition">→</span>
    </Link>
  </div>

  {/* Main Box */}
  <div className="border-[8px] border-gray-700 p-3">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* Left Headlines */}
      <div>
        {sportsData.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="block py-3 border-b border-gray-300 last:border-b-0"
          >
            <h3 className="text-sm sm:text-[14px] font-medium leading-relaxed hover:text-red-600">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>

      {/* Center Featured */}
      {sportsData[3] && (
        <Link
          href={`/post/${sportsData[3].slug}`}
          className="block"
        >
          <div className="relative h-[160px]">
            <Image
              src={sportsData[3].featuredImage?.node?.sourceUrl}
              alt={sportsData[3].title}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="font-bold text-sm sm:text-base  mt-1 leading-snug">
            {sportsData[3].title}
          </h3>
        </Link>
      )}

      {/* Right Featured */}
      {sportsData[4] && (
        <Link
          href={`/post/${sportsData[4].slug}`}
          className="block"
        >
          <div className="relative h-[160px]">
            <Image
              src={sportsData[4].featuredImage?.node?.sourceUrl}
              alt={sportsData[4].title}
              fill
              className="object-contain"
            />
          </div>

         <h3 className="font-bold text-sm sm:text-base mt-1 leading-snug">
            {sportsData[4].title}
          </h3>
        </Link>
      )}

    </div>
  </div>
</div>
  );
}