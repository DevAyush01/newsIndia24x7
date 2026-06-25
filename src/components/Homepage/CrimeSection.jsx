// components/Homepage/CrimeSection.jsx - ✅ Server Component

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

async function getCrimePosts() {
  try {
    const query = `
      query GetCrimePosts {
        posts(first: 10, where: { categoryName: "crime" }) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `;
    
    const response = await graphqlQuery(query);
    return response?.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching crime posts:', error);
    return [];
  }
}

export default async function CrimeSection() {
  const posts = await getCrimePosts();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto py-6 px-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-red-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">क्राइम</h2>
          <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full ml-1">
            CRIME NEWS
          </span>
        </div>

        <Link
          href="/category/crime"
          className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors flex items-center gap-1 group"
        >
          और भी 
          <span className="group-hover:translate-x-1 transition">▶</span>
        </Link>
      </div>

      {/* Featured Post - Hero Style */}
      {posts[0] && (
        <div className="mb-6">
          <Link href={`/post/${posts[0].slug}`} className="group block">
            <div className="relative rounded-xl overflow-hidden bg-gray-900">
              <div className="relative h-[320px] md:h-[380px]">
                {posts[0].featuredImage?.node?.sourceUrl ? (
                  <>
                    <Image
                      src={posts[0].featuredImage.node.sourceUrl}
                      alt={posts[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-800 to-orange-700 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    क्राइम
                  </span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight line-clamp-2 drop-shadow-lg">
                    {posts[0].title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                    <span>{new Date(posts[0].date).toLocaleDateString("hi-IN")}</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>क्राइम स्टोरी</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Crime Stories Grid - 2 Columns */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {posts.slice(1, 5).map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="group block">
            <div className="flex gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              {/* Thumbnail */}
              <div className="relative w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {post.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="112px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </div>
                )}
                {/* Play icon overlay for video crime news */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-8 h-8 rounded-full bg-red-600/90 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition line-clamp-2 text-sm md:text-base">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-400">
                    {new Date(post.date).toLocaleDateString("hi-IN")}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-[10px] text-red-500">क्राइम</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* More Crime News - Horizontal Scroll */}
      {posts.length > 5 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-red-600 rounded-full"></div>
            <h3 className="text-base font-bold text-gray-800">अपराध की अन्य खबरें</h3>
          </div>
          
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-4 scrollbar-hide">
                {posts.slice(5, 10).map((post) => (
                  <Link key={post.id} href={`/post/${post.slug}`} className="group flex-shrink-0 w-[260px] block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="relative h-36 bg-gray-100">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="260px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            </svg>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                          क्राइम
                        </div>
                      </div>
                      <div className="p-2">
                        <h4 className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-[9px] text-gray-400 mt-1 block">
                          {new Date(post.date).toLocaleDateString("hi-IN")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"></div>
          </div>
        </div>
      )}

      {/* View All Button */}
      <div className="mt-6 text-center">
        <Link 
          href="/category/crime"
          className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
        >
          सभी क्राइम खबरें देखें
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}