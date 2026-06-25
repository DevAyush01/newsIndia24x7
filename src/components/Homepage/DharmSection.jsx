// components/Homepage/DharmSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DharmSection({ religiousData, rasifalData }) {
  // Agar dono data empty hai toh empty state
  if ((!religiousData || religiousData.length === 0) && (!rasifalData || rasifalData.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between border-b-2 border-orange-600 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
              <span>🕉️</span> धर्म
            </h2>
            <Link 
              href="/category/religious" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              और देखें <span>→</span>
            </Link>
          </div>
          <p className="text-gray-500 text-center py-8"></p>
        </div>
      </div>
    );
  }

  const religiousMain = religiousData?.[0] || null;
  const religiousOthers = religiousData?.slice(1, 4) || [];
  const rasifalPosts = rasifalData?.slice(0, 6) || [];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-orange-600 px-6 py-3">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <span>🕉️</span> धर्म 
          </h2>
          <Link 
            href="/category/religious" 
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
          >
            और देखें <span>→</span>
          </Link>
        </div>

        <div className="p-6">
          {/* TWO COLUMN LAYOUT: Left - Religious, Right - Rasifal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: Religious Posts */}
            <div>
              <h3 className="text-lg font-semibold text-orange-700 flex items-center gap-2 mb-4 border-b border-orange-200 pb-2">
                <span>🕉️</span> अध्यात्म
              </h3>
              
              {religiousMain ? (
                <Link href={`/post/${religiousMain.slug}`} className="block group">
                  <div className="relative w-full h-48 md:h-56 bg-gray-200 rounded-lg overflow-hidden">
                    {religiousMain.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={religiousMain.featuredImage.node.sourceUrl}
                        alt={religiousMain.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-50 to-yellow-50">
                        <span className="text-6xl">🕉️</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      अध्यात्म
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mt-2 group-hover:text-orange-600 transition-colors line-clamp-2">
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
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                  <span className="text-4xl">🕉️</span>
                  <p className="mt-2"></p>
                </div>
              )}

              {/* Religious Other Posts (small) */}
              {religiousOthers.length > 0 && (
                <div className="mt-4 space-y-2">
                  {religiousOthers.map((post) => (
                    <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                      <div className="flex gap-3 hover:bg-orange-50 p-2 rounded-lg transition-colors">
                        <div className="relative w-20 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-orange-100">
                              <span className="text-xl">🕉️</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold group-hover:text-orange-600 transition-colors line-clamp-2">
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
                <span>🔮</span> राशिफल 
              </h3>

              {rasifalPosts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {rasifalPosts.map((post) => (
                    <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-purple-100">
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
                              <span className="text-4xl">🔮</span>
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
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                  <span className="text-4xl">🔮</span>
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