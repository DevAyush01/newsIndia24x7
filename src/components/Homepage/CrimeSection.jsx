// components/Homepage/CrimeSection.jsx - ✅ Updated with Desh Style

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

async function getCrimePosts() {
  try {
    const query = `
      query GetCrimePosts {
        posts(first: 6, where: { categoryName: "crime" }) {
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
    <section className="w-full py-5 bg-white overflow-hidden">
      
      {/* Header - Desh Style */}
      <div className="flex items-center justify-between mb-3 px-5 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
          <h2 className="text-[20px] font-bold text-black">क्राइम</h2>
        </div>
        <Link
          href="/category/crime"
          className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
        >
          और भी
          <span className="group-hover:translate-x-1 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Content - Desh Style Layout */}
      <div className="space-y-5 px-5">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* BIG NEWS - Featured */}
          {posts[0] && (
            <Link
              href={`/post/${posts[0].slug}`}
              className="group block"
            >
              <div className="relative h-[250px] overflow-hidden">
                {posts[0].featuredImage?.node?.sourceUrl ? (
                  <>
                    <Image
                      src={posts[0].featuredImage.node.sourceUrl}
                      alt={posts[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-800 to-orange-700 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[21px] font-bold">
                    {posts[0].title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* RIGHT SIDE - 2 Small News */}
          <div className="flex flex-col">
            {posts.slice(1, 3).map((post, index) => (
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
                      <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        </svg>
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
          {posts.slice(3, 5).map((post) => (
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
                    <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
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