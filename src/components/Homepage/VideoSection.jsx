// components/Homepage/VideoSection.jsx - ✅ Fully Responsive Video Section

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
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 sm:py-6">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 pb-2 sm:pb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 sm:h-6 bg-red-500 rounded-full"></div>
            <h2 className="text-white text-base sm:text-xl font-bold flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              वीडियो
            </h2>
          </div>

          <Link
            href="/videos"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors group"
          >
            सभी वीडियो देखें
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile Layout: Featured Video on Top, then 2-2 videos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-0">
          
          {/* LEFT - Side Videos (Mobile: Bottom, Desktop: Left) */}
          <div className="lg:col-span-1 lg:pr-3 lg:border-r border-white/20 order-2 lg:order-1">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-3">
              {otherVideos.slice(0, 2).map((video) => (
                <Link key={video.id} href={`/video/${video.slug}`} className="group block">
                  <div className="relative overflow-hidden">
                    <div className="relative aspect-video h-[100px] sm:h-[120px]">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-semibold mt-1 sm:mt-2 line-clamp-3 sm:line-clamp-3">
                      {video.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER - Featured Video (Mobile: Top, Desktop: Center) */}
          {featuredVideo && (
            <div className="lg:col-span-3 lg:px-4 lg:border-r border-white/20 flex items-center justify-center order-1 lg:order-2">
              <Link
                href={`/video/${featuredVideo.slug}`}
                className="group block w-full"
              >
                <div className="relative overflow-hidden shadow-xl w-full">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                      <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold line-clamp-2">
                        {featuredVideo.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* RIGHT - Side Videos (Mobile: Bottom, Desktop: Right) */}
          <div className="lg:col-span-1 lg:pl-3 order-3">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-3">
              {otherVideos.slice(2, 4).map((video) => (
                <Link key={video.id} href={`/video/${video.slug}`} className="group block">
                  <div>
                    <div className="relative aspect-video h-[100px] sm:h-[120px]">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white text-xs sm:text-sm font-semibold mt-1 sm:mt-2 line-clamp-3 sm:line-clamp-3">
                      {video.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}