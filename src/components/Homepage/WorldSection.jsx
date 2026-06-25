// components/Homepage/WorldSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WorldSection({ worldData }) {
  // Agar data nahi hai toh empty state
  if (!worldData || worldData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between border-b-2 border-cyan-600 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-cyan-600">विश्व / World</h2>
            <Link 
              href="/category/world" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              और देखें →
            </Link>
          </div>
          <p className="text-gray-500 text-center py-8">कोई विश्व समाचार उपलब्ध नहीं है</p>
        </div>
      </div>
    );
  }

  const mainPost = worldData[0];
  const otherPosts = worldData.slice(1, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-cyan-600 px-6 py-3">
          <h2 className="text-2xl font-bold text-cyan-600">विश्व / World</h2>
          <Link 
            href="/category/world" 
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
          >
            और देखें →
          </Link>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Post */}
            <div className="md:col-span-2">
              <Link href={`/post/${mainPost.slug}`} className="block group">
                <div className="relative w-full h-64 md:h-72 bg-gray-200 rounded-lg overflow-hidden">
                  {mainPost.featuredImage?.node?.sourceUrl ? (
                    <Image
                      src={mainPost.featuredImage.node.sourceUrl}
                      alt={mainPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-50">
                      <span className="text-4xl text-gray-400">🌍</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    विश्व
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                  {mainPost.title}
                </h3>
                {mainPost.excerpt && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {mainPost.excerpt.replace(/<[^>]*>/g, '')}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{new Date(mainPost.date).toLocaleDateString('hi-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </Link>
            </div>

            {/* Side Posts */}
            <div className="space-y-4">
              {otherPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                  <div className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="relative w-24 h-20 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-xl text-gray-400">🌍</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold group-hover:text-cyan-600 transition-colors line-clamp-2">
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
        </div>
      </div>
    </div>
  );
}