// components/Homepage/PodcastSection.jsx - ✅ Server Component

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

// Function to extract YouTube ID from content
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

async function getPodcastData() {
  try {
    const query = `
      query GetPodcasts {
        posts(first: 8, where: { categoryName: "podcast" }) {
          nodes {
            id
            title
            slug
            content
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
    const fetchedPosts = response?.data?.posts?.nodes || [];
    
    // Process podcasts to add YouTube thumbnails
    const processedPodcasts = fetchedPosts.map(post => ({
      ...post,
      thumbnailUrl: getYouTubeThumbnail(post.content) || post.featuredImage?.node?.sourceUrl,
      youtubeId: getYouTubeId(post.content)
    }));
    
    return processedPodcasts;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

export default async function PodcastSection() {
  const podcasts = await getPodcastData();

  if (!podcasts || podcasts.length === 0) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto py-6 px-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b-2 border-red-600 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-red-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">पॉडकास्ट</h2>
          <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full ml-1">
            PODCASTS
          </span>
        </div>
        <Link href="/podcasts" className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group">
          सभी देखें 
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      {/* 4 Videos Grid - Fixed Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {podcasts.slice(0, 4).map((podcast) => (
          <Link key={podcast.id} href={`/podcast/${podcast.slug}`} className="group block">
            <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
              {/* Thumbnail with Play Button */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {podcast.thumbnailUrl ? (
                  <>
                    <Image
                      src={podcast.thumbnailUrl}
                      alt={podcast.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </div>
                )}
                
                {/* Podcast Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                    पॉडकास्ट
                  </span>
                </div>
                
                {/* Episode Badge */}
                <div className="absolute bottom-2 right-2 z-10 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded">
                  🎙️ एपिसोड
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-semibold text-red-600 uppercase tracking-wider">पॉडकास्ट</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-[8px] text-gray-400">
                    {new Date(podcast.date).toLocaleDateString("hi-IN")}
                  </span>
                </div>
                
                <h3 className="font-bold text-xs leading-snug text-gray-800 group-hover:text-red-600 line-clamp-2">
                  {podcast.title}
                </h3>
                
                {/* Listen Now Indicator */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[9px] text-red-600 font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    सुनें
                  </span>
                </div> 
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}