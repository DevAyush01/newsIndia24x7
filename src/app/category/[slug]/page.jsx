// app/category/[slug]/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryData } from "@/lib/wordpress";

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  
  const cursor = (await searchParams)?.cursor || null;
  const page = cursor ? parseInt((await searchParams)?.page) || 2 : 1;
  const perPage = 15;

  const { category, posts, pageInfo, latestPosts, totalCount } = await getCategoryData(slug, perPage, cursor);

  if (!category) {
    notFound();
  }

  const totalPages = Math.ceil(totalCount / perPage);

  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3, 15);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ✅ Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-red-600 transition-colors">
            होम
          </Link>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">{category.name}</span>
        </nav>

        {/* ✅ Category Header with Count
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{category.name}</h1>
                {category.description && (
                  <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                )}
              </div>
            </div>
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium border border-red-100">
              {totalCount} समाचार
            </div>
          </div>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ✅ LEFT CONTENT */}
          <div className="w-full lg:w-[70%]">

            {posts.length > 0 ? (
              <>
                {/* ✅ Featured Row - 3 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  {featuredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 ${
                        index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                      }`}
                    >
                      <Link href={`/post/${post.slug}`}>
                        <div className="relative h-52 bg-gray-200 overflow-hidden">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized={true}
                            />
                          ) : (
                            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg">
                              {category.name}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(post.date).toLocaleDateString('hi-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* ✅ Remaining Posts */}
                {remainingPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {remainingPosts.map((post) => (
                      <article
                        key={post.id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
                      >
                        <Link href={`/post/${post.slug}`}>
                          <div className="relative h-44 bg-gray-200 overflow-hidden">
                            {post.featuredImage?.node?.sourceUrl ? (
                              <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized={true}
                              />
                            ) : (
                              <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                              </div>
                            )}
                            <div className="absolute top-2 left-2">
                              <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg">
                                {category.name}
                              </span>
                            </div>
                          </div>
                          <div className="p-3.5">
                            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(post.date).toLocaleDateString('hi-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}

                {/* ✅ Pagination - Professional */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200">
                    
                    
                    <div className="flex items-center gap-2">
                      {page > 1 && (
                        <Link
                          href={`/category/${slug}?page=${page - 1}`}
                          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all text-sm font-medium shadow-sm flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          पिछला
                        </Link>
                      )}

                      <span className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold shadow-sm">
                        {page}
                      </span>

                      {pageInfo?.hasNextPage && (
                        <Link
                          href={`/category/${slug}?cursor=${pageInfo.endCursor}&page=${page + 1}`}
                          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all text-sm font-medium shadow-sm flex items-center gap-2"
                        >
                          अगला
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-700">कोई समाचार नहीं</h3>
                <p className="text-gray-400 text-sm mt-1">इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है</p>
              </div>
            )}

          </div>

          {/* ✅ RIGHT SIDEBAR - Latest News */}
          <aside className="w-full lg:w-[30%]">
            <div className="sticky top-24">
              {/* Latest News Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
                    </svg>
                    <h2 className="text-white font-bold text-sm uppercase tracking-wider">ताज़ा समाचार</h2>
                  </div>
                </div>
                
                <div className="p-4 divide-y divide-gray-100">
                  {latestPosts?.slice(0, 8).map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/post/${item.slug}`}
                      className="block group py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-1 h-auto bg-red-500 rounded-full mt-1"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(item.date).toLocaleDateString('hi-IN', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-100 p-3 bg-gray-50 text-center">
                  <Link 
                    href="/latest"
                    className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-2 group"
                  >
                    सभी ताज़ा समाचार देखें
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

             
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}