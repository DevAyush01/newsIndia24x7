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
    <div className="container max-w-7xl mx-auto ">
      <div className="bg-white overflow-hidden">
        
        {/* Header - Same as Manoranjan */}
        <div className="flex items-center justify-between border-b-2 border-red-600 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            <h2 className="text-2xl font-bold text-black">खेल</h2>
            <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full ml-1">
              स्पोर्ट्स
            </span>
          </div>
          <Link 
            href="/category/sports" 
            className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
          >
            और भी 
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Post - Large */}
            <div className="md:col-span-2">
              <Link href={`/post/${mainPost.slug}`} className="group block">
                <div className="relative  overflow-hidden bg-gray-900">
                  <div className="relative h-[320px] md:h-[400px]">
                    {mainPost.featuredImage?.node?.sourceUrl ? (
                      <>
                        <Image
                          src={mainPost.featuredImage.node.sourceUrl}
                          alt={mainPost.title}
                          fill
                          className="object-fill transition-transform duration-500 group-hover:scale-105"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-800 to-red-700 flex items-center justify-center">
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        खेल
                      </span>
                    </div>
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight line-clamp-2 drop-shadow-lg">
                        {mainPost.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                        <span>{new Date(mainPost.date).toLocaleDateString("hi-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Posts */}
            <div className="space-y-4">
              {sidePosts.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                  <div className="flex gap-3 hover:bg-gray-50 p-2  transition-colors">
                    <div className="relative w-28 h-20 flex-shrink-0 bg-gray-200  overflow-hidden">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="112px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString('hi-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          {bottomPosts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 pt-6 border-t border-gray-200">
              {bottomPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                  <div className="bg-gray-50  overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative w-full h-36 bg-gray-200">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          fill
                          className="object-fill group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-semibold group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString('hi-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}