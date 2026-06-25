// app/video/[slug]/page.jsx

export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { graphqlQuery } from '@/lib/wordpress';

// ✅ Function to extract YouTube ID from content
const getYouTubeId = (content) => {
  if (!content) return null;
  
  const embedMatch = content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  const youtuBeMatch = content.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) return youtuBeMatch[1];
  
  const watchMatch = content.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  return null;
};

const getEmbedUrl = (content) => {
  const videoId = getYouTubeId(content);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
};

// ✅ Remove video embed from content
const cleanContent = (content) => {
  if (!content) return '';
  
  // Remove YouTube embed iframe
  let cleaned = content.replace(/<iframe[^>]*youtube\.com\/embed\/[^>]*><\/iframe>/gi, '');
  
  // Remove YouTube embed links
  cleaned = cleaned.replace(/https?:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/g, '');
  cleaned = cleaned.replace(/https?:\/\/youtu\.be\/[a-zA-Z0-9_-]+/g, '');
  cleaned = cleaned.replace(/https?:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g, '');
  
  return cleaned;
};

// ✅ Fetch video post data
async function getVideoData(slug) {
  const query = `
    query GetVideoPost($slug: String!) {
      posts(where: { name: $slug }) {
        nodes {
          id
          title
          slug
          content
          excerpt
          date
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

  try {
    const response = await graphqlQuery(query, { slug });
    const post = response?.data?.posts?.nodes?.[0] || null;
    
    if (!post) return null;
    
    return {
      ...post,
      embedUrl: getEmbedUrl(post.content),
      youtubeId: getYouTubeId(post.content),
      // ✅ Clean content - remove video embed
      cleanContent: cleanContent(post.content)
    };
  } catch (error) {
    console.error('❌ Error fetching video:', error);
    return null;
  }
}

export default async function VideoPage({ params }) {
  const { slug } = await params;
  const video = await getVideoData(slug);

  if (!video || !video.youtubeId) {
    notFound();
  }

  const categoryName = video.categories?.nodes?.[0]?.name || 'Video';

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        
        {/* ✅ Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-white transition">
                होम
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link href="/videos" className="hover:text-white transition">
                वीडियो
              </Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-300 line-clamp-1 max-w-[200px]">
              {video.title}
            </li>
          </ol>
        </nav>

        {/* ✅ Video Player */}
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-black">
            {video.embedUrl ? (
              <iframe
                src={video.embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-gray-500">Video not available</span>
              </div>
            )}
          </div>

          {/* ✅ Video Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {categoryName}
              </span>
              <span className="text-gray-500 text-xs">
                {new Date(video.date).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {video.title}
            </h1>

            {video.excerpt && (
              <div 
                className="text-gray-400 text-sm mt-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: video.excerpt }}
              />
            )}

            {/* ✅ Clean Content - Without Video Embed */}
            {video.cleanContent && (
              <div 
                className="text-gray-300 text-base mt-6 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: video.cleanContent }}
              />
            )}

            {/* ✅ Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Share this video:</h4>
              <div className="flex flex-wrap gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://newsindia24x7.tv/video/${video.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Facebook
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://newsindia24x7.tv/video/${video.slug}`)}&text=${encodeURIComponent(video.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Twitter
                </a>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(`${video.title} - https://newsindia24x7.tv/video/${video.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Back to Videos */}
        <div className="mt-6 text-center">
          <Link 
            href="/videos"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            ← सभी वीडियो देखें
          </Link>
        </div>
      </div>
    </div>
  );
}