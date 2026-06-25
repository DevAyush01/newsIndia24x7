// app/post/[slug]/page.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostData, getRelatedPosts } from '@/lib/wordpress';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const categoryName = post.categories?.nodes?.[0]?.name || 'News';
  const categorySlug = post.categories?.nodes?.[0]?.slug || 'news';
  const postId = post.id;

  // ✅ Related posts fetch karo
  const relatedPosts = await getRelatedPosts(categorySlug, postId, 6);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      
      {/* ✅ Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              होम
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li>
            <Link 
              href={`/category/${categorySlug}`} 
              className="hover:text-blue-600 transition"
            >
              {categoryName}
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-700 font-medium line-clamp-1">
            {post.title}
          </li>
        </ol>
      </nav>

      {/* ✅ Post Content */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-64 md:h-96 bg-gray-200">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
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

          {/* Meta Info - Bina emoji ke */}
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

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mt-6 text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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

      {/* ✅ Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-red-600 pb-2">
            संबंधित समाचार
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative w-full h-40 bg-gray-200">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-3xl text-gray-400">📰</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold group-hover:text-red-600 transition-colors line-clamp-2">
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
      )}

      {/* ✅ Back to Category */}
      <div className="mt-6 text-center">
        <Link 
          href={`/category/${categorySlug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          ← {categoryName} श्रेणी में और समाचार देखें
        </Link>
      </div>
    </div>
  );
}