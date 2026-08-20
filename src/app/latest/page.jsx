// app/latest/page.jsx - ✅ Latest Page
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestPosts } from '@/lib/wordpress';

export default async function LatestPage() {
  const posts = await getLatestPosts(50); // 50 latest posts

  if (!posts || posts.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-400">कोई पोस्ट नहीं</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ताज़ा खबरें</h1>
       
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="group">
            <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              
              {/* Image */}
              <div className="relative w-full h-56 bg-gray-200">
                {post.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                    <span className="text-white text-4xl">📰</span>
                  </div>
                )}
                {/* Category Badge */}
                {post.categories?.nodes?.[0] && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {post.categories.nodes[0].name}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span>
                    {new Date(post.date).toLocaleDateString('hi-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-red-600 transition line-clamp-3">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {post.excerpt.replace(/<[^>]*>/g, '').slice(0, 100)}...
                  </p>
                )}
                <div className="mt-4 inline-block text-red-600 font-semibold text-sm group-hover:underline">
                  और पढ़ें →
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      
    </div>
  );
}