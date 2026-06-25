// app/videos/page.jsx
export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { graphqlQuery } from '@/lib/wordpress';

const getYouTubeThumbnail = (content) => {
  const match = content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
};

const getYouTubeId = (content) => {
  const match = content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

async function getAllVideos() {
  const query = `
    query GetAllVideos {
      posts(first: 30, where: { categoryName: "Video" }) {
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
    const response = await graphqlQuery(query);
    const posts = response?.data?.posts?.nodes || [];
    
    return posts.filter(post => getYouTubeId(post.content));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getAllVideos();

  return (
    <div className="bg-[#1f1f1f] min-h-screen text-white">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-4 mb-6">
          🎬 सभी वीडियो
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video.id} href={`/video/${video.slug}`} className="group">
              <div className="bg-[#252525] border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="relative aspect-video bg-gray-800">
                  <Image
                    src={getYouTubeThumbnail(video.content)}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold group-hover:text-red-500 transition line-clamp-2">
                    {video.title}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {new Date(video.date).toLocaleDateString('hi-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}