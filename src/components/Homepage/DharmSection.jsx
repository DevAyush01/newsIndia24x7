// components/Homepage/DharmSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DharmSection({ religiousData, rasifalData }) {
  // Agar dono data empty hai toh empty state
  if ((!religiousData || religiousData.length === 0) && (!rasifalData || rasifalData.length === 0)) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md overflow-hidden">
          <div className="flex items-center justify-between border-b-2 border-red-600 px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
              <h2 className="text-2xl font-bold text-black">धर्म</h2>
              <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 ml-1">
                आध्यात्म
              </span>
            </div>
            <Link 
              href="/category/religious" 
              className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
            >
              और भी 
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>
          <p className="text-gray-500 text-center py-8">कोई धर्म समाचार नहीं</p>
        </div>
      </div>
    );
  }

  const religiousMain = religiousData?.[0] || null;
  const religiousOthers = religiousData?.slice(1, 4) || [];
  const rasifalPosts = rasifalData?.slice(0, 6) || [];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white shadow-md overflow-hidden">
        
        {/* Header - Same as Manoranjan */}
        <div className="flex items-center justify-between border-b-2 border-red-600 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            <h2 className="text-2xl font-bold text-black">धर्म</h2>
            <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 ml-1">
              आध्यात्म
            </span>
          </div>
          <Link 
            href="/category/religious" 
            className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
          >
            और भी 
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        <div className="p-6">
          {/* TWO COLUMN LAYOUT: Left - Religious, Right - Rasifal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: Religious Posts */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2 mb-4 border-b border-red-200 pb-2">
                अध्यात्म
              </h3>
              
              {religiousMain ? (
                <Link href={`/post/${religiousMain.slug}`} className="block group">
                  <div className="relative w-full h-48 md:h-56 bg-gray-200 overflow-hidden">
                    {religiousMain.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={religiousMain.featuredImage.node.sourceUrl}
                        alt={religiousMain.title}
                        fill
                        className="object-fill group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50">
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1">
                      अध्यात्म
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mt-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {religiousMain.title}
                  </h4>
                  {religiousMain.excerpt && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {religiousMain.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{new Date(religiousMain.date).toLocaleDateString('hi-IN', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}</span>
                  </div>
                </Link>
              ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-50">
                  <span className="text-4xl">🕉️</span>
                  <p className="mt-2"></p>
                </div>
              )}

              {/* Religious Other Posts (small) */}
              {religiousOthers.length > 0 && (
                <div className="mt-4 space-y-2">
                  {religiousOthers.map((post) => (
                    <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                      <div className="flex gap-3 hover:bg-red-50 p-2 transition-colors">
                        <div className="relative w-20 h-16 flex-shrink-0 bg-gray-200 overflow-hidden">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-100">
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold group-hover:text-red-600 transition-colors line-clamp-2">
                            {post.title}
                          </h5>
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

            {/* RIGHT COLUMN: Rasifal Posts */}
            <div>
              <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-4 border-b border-purple-200 pb-2">
                राशिफल
              </h3>

              {rasifalPosts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {rasifalPosts.map((post) => (
                    <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden hover:shadow-md transition-shadow border border-purple-100">
                        <div className="relative w-full h-32 bg-gray-200">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h5 className="text-sm font-semibold group-hover:text-purple-600 transition-colors line-clamp-2">
                            {post.title}
                          </h5>
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
              ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-50">
                  <p className="mt-2">कोई राशिफल उपलब्ध नहीं</p>
                </div>
              )}

              {/* Rasifal View All Link */}
              {rasifalPosts.length > 0 && (
                <div className="mt-4 text-center">
                  <Link 
                    href="/category/rasifal" 
                    className="text-sm text-purple-600 hover:text-purple-800 hover:underline inline-flex items-center gap-1"
                  >
                    सभी राशिफल देखें <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}