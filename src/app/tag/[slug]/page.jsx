// app/tag/[slug]/page.jsx

export const dynamic = 'force-dynamic';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTagData } from "@/lib/wordpress";

export default async function TagPage({ params }) {
  const { slug } = await params;
  
  const { tag, posts, totalCount } = await getTagData(slug, 20);

  if (!tag || !posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ✅ Tag Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold border-b border-gray-700 pb-3">
            # {tag.name}
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            कुल {totalCount || posts.length} समाचार
          </p>
        </div>

        {/* ✅ Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.slug}`} className="block group">
              <div className="bg-[#252525] border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative w-full h-48 bg-gray-700">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <span className="text-4xl text-gray-500">📰</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    #{tag.name}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold leading-snug group-hover:text-red-500 transition line-clamp-2">
                    {post.title.rendered}
                  </h2>
                  {post.excerpt?.rendered && (
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('hi-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}