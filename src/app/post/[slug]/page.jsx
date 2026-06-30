// app/post/[slug]/page.jsx
// ✅ Server Component - No 'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostData, getRelatedPosts, getLatestPosts } from '@/lib/wordpress';
import PostContent from './PostContent'; // ✅ Client Component import

export default async function PostPage({ params }) {
  const { slug } = await params;
  
  const post = await getPostData(slug);
  
  if (!post) {
    notFound();
  }
  
  const categorySlug = post.categories?.nodes?.[0]?.slug || 'news';
  const postId = post.id;
  
  const [relatedPosts, latestNews] = await Promise.all([
    getRelatedPosts(categorySlug, postId, 7),
    getLatestPosts(8)
  ]);
  
  const categoryName = post.categories?.nodes?.[0]?.name || 'News';

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              होम
            </Link>
          </li>
         <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <li>
            <Link 
              href={`/category/${categorySlug}`} 
              className="hover:text-blue-600 transition"
            >
              {categoryName}
            </Link>
          </li>
         <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <li className="text-gray-700 font-medium line-clamp-1">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            
            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full h-64 md:h-96 bg-gray-200">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                  className="object-cover"
                  priority
                  unoptimized={true}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block">
                    {categoryName}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                <span>
                  {new Date(post.date).toLocaleDateString('hi-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                {post.author?.node?.name && (
                  <>
                    <span>|</span>
                    <span>{post.author.node.name}</span>
                  </>
                )}
                {post.categories?.nodes?.length > 0 && (
                  <>
                    <span>|</span>
                    <span>
                      {post.categories.nodes.map((cat, index) => (
                        <span key={cat.slug}>
                          <Link 
                            href={`/category/${cat.slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            {cat.name}
                          </Link>
                          {index < post.categories.nodes.length - 1 && ', '}
                        </span>
                      ))}
                    </span>
                  </>
                )}
              </div>

              {/* ✅ Content with Read More - Client Component */}
              <PostContent content={post.content} />
              
              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Share this article:</h3>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://newsindia24x7.com/post/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Facebook
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://newsindia24x7.com/post/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://newsindia24x7.com/post/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">
                संबंधित समाचार
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => {
                  const rowIndex = Math.floor(index / 3);
                  const colIndex = index % 3;
                  
                  let showItem = true;
                  if (rowIndex === 0 && colIndex === 2) showItem = false;
                  if (rowIndex === 2 && colIndex === 2) showItem = false;
                  
                  if (!showItem) return null;
                  
                  return (
                    <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                        <div className="relative w-full h-48 bg-gray-200">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized={true}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100"></div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="text-sm font-semibold group-hover:text-red-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <span className="text-xs text-gray-400 block mt-1">
                            {new Date(post.date).toLocaleDateString('hi-IN', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to Category */}
          <div className="mt-6 text-center">
            <Link 
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
            >
              ← {categoryName} श्रेणी में और समाचार देखें
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN - Latest News */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
            <h3 className="text-lg font-bold text-gray-800 border-b-2 border-red-600 pb-2 mb-4">
              ताज़ा समाचार
            </h3>
            
            <div className="space-y-4">
              {latestNews.map((news, index) => (
                <Link 
                  key={news.id} 
                  href={`/post/${news.slug}`}
                  className="block group hover:bg-gray-50 rounded-lg transition p-2 -mx-2"
                >
                  <div className="flex gap-3">
                    <span className="text-red-600 font-bold text-sm min-w-[20px]">
                      {index + 1}.
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {news.title}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(news.date).toLocaleDateString('hi-IN', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <Link 
                href="/category/news-latest"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition"
              >
                सभी ताज़ा समाचार देखें →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}