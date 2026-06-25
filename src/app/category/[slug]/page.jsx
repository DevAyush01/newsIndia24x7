// app/category/[slug]/page.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryData } from "@/lib/wordpress";

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  
  // ✅ Cursor from URL
  const cursor = (await searchParams)?.cursor || null;
  const currentPage = cursor ? parseInt((await searchParams)?.page) || 2 : 1;
  const perPage = 12;

  const { category, posts, pageInfo, latestPosts, totalCount } = await getCategoryData(slug, perPage, cursor);

  if (!category) {
    notFound();
  }

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold border-b border-gray-700 pb-3">
            {category.name}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            कुल {totalCount || posts.length} समाचार
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[75%]">

            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">

                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-[#252525] border border-gray-700 rounded overflow-hidden"
                    >
                      <Link href={`/post/${post.slug}`}>
                        <div className="relative h-72">
                          {post.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={post.featuredImage.node.sourceUrl}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full bg-gray-700 flex items-center justify-center">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h2 className="text-2xl font-bold leading-snug hover:text-red-500 transition">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                              {post.excerpt.replace(/<[^>]*>/g, "")}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-500">{category.name}</span>
                            <span className="text-xs text-gray-500">
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

                {/* ✅ PAGINATION - Previous / Next */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                    
                    {/* Previous Button */}
                    {currentPage > 1 && (
                      <Link
                        href={`/category/${slug}?page=${currentPage - 1}`}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                      >
                        ← पिछला
                      </Link>
                    )}

                    {/* Page Info */}
                    <span className="text-sm text-gray-400">
                      {currentPage} / {totalPages}
                    </span>

                    {/* Next Button */}
                    {pageInfo?.hasNextPage && (
                      <Link
                        href={`/category/${slug}?cursor=${pageInfo.endCursor}&page=${currentPage + 1}`}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                      >
                        अगला →
                      </Link>
                    )}

                  </div>
                )}

               
               

              </>
            ) : (
              <div className="bg-[#252525] border border-gray-700 rounded-lg p-12 text-center">
                <p className="text-gray-400">इस श्रेणी में कोई समाचार नहीं है</p>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-[25%]">
            <div className="sticky top-24 bg-[#252525] border border-gray-700 rounded-lg p-5">
              <h2 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-5">
                ताज़ातरीन
              </h2>
              <div className="space-y-5">
                {latestPosts?.map((item) => (
                  <Link
                    key={item.id}
                    href={`/post/${item.slug}`}
                    className="block border-b border-gray-700 pb-4 last:border-0"
                  >
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></div>
                      <div>
                        <h3 className="text-sm leading-6 hover:text-red-500 transition">
                          {item.title}
                        </h3>
                        <div className="text-xs text-gray-500 mt-2">
                          {new Date(item.date).toLocaleDateString('hi-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}