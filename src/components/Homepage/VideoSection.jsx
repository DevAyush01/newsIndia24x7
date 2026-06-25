// components/Homepage/VideoSection.jsx - ✅ Server Component

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

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

const getYouTubeThumbnail = (content) => {
  const videoId = getYouTubeId(content);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
};

async function getVideoData() {
  try {
    const query = `
      query GetVideos {
        posts(first: 12, where: { categoryName: "Video" }) {
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
    
    const response = await graphqlQuery(query);
    const videoPosts = response?.data?.posts?.nodes || [];
    
    const processedVideos = videoPosts.map(post => ({
      ...post,
      thumbnailUrl: getYouTubeThumbnail(post.content),
      youtubeId: getYouTubeId(post.content)
    }));
    
    return processedVideos.filter(video => video.youtubeId);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideoSection() {
  const videos = await getVideoData();

  if (!videos || videos.length === 0) {
    return null;
  }

  const featuredVideo = videos[0];
  const otherVideos = videos.slice(1, 5);

  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-6">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-white/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              वीडियो
            </h2>
          </div>

          <Link
            href="/videos"
            className="text-white/80 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors group"
          >
            सभी वीडियो देखें
            <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* Left Column Videos */}
          <div className="space-y-4">
            {otherVideos.slice(0, 2).map((video) => (
              <Link key={video.id} href={`/video/${video.slug}`} className="group block">
                <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white text-sm font-semibold mt-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Video - Center Large */}
          {featuredVideo && (
            <Link
              href={`/video/${featuredVideo.slug}`}
              className="lg:col-span-2 group block"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                  <Image
                    src={featuredVideo.thumbnailUrl}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-lg">
                      {featuredVideo.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-white/80 text-xs">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Watch Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Right Column Videos */}
          <div className="space-y-4">
            {otherVideos.slice(2, 4).map((video) => (
              <Link key={video.id} href={`/video/${video.slug}`} className="group block">
                <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white text-sm font-semibold mt-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}