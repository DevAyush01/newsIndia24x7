// app/podcasts/page.jsx
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

async function getAllPodcasts() {
  const query = `
    query GetAllPodcasts {
      posts(first: 30, where: { categoryName: "podcast" }) {
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
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

// ✅ Function to fetch latest news for sidebar
async function getLatestNews() {
  const query = `
    query GetLatestNews {
      posts(first: 8, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphqlQuery(query);
    return response?.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return [];
  }
}

export default async function PodcastsPage() {
  const podcasts = await getAllPodcasts();
  const latestNews = await getLatestNews();

  const featuredPodcast = podcasts.length > 0 ? podcasts[0] : null;
  const remainingPodcasts = podcasts.slice(1);

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
          <span className="text-gray-700 font-medium">पॉडकास्ट</span>
        </nav>

        {/* ✅ Header with Newspaper Style */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b-4 border-red-600 pb-3">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  <span className="text-red-600">पॉड</span>कास्ट
                </h1>
                <p className="text-gray-500 text-sm mt-1">ऑडियो समाचार, विशेष साक्षात्कार और चर्चा</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ✅ LEFT CONTENT - Podcasts */}
          <div className="w-full lg:w-[70%]">

            {/* ✅ Featured Podcast (Hero Section) */}
            {featuredPodcast && (
              <div className="mb-6">
                <Link href={`/podcast/${featuredPodcast.slug}`} className="group block">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="grid md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 relative aspect-video md:aspect-auto md:h-[280px] bg-gray-200 overflow-hidden">
                        <Image
                          src={getYouTubeThumbnail(featuredPodcast.content)}
                          alt={featuredPodcast.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized={true}
                        />
                        {/* ✅ Play Button Overlay - Hero */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            फीचर्ड
                          </span>
                        </div>
                      </div>
                      <div className="md:col-span-2 p-6 md:p-6 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            {featuredPodcast.categories?.nodes?.[0]?.name || 'Podcast'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(featuredPodcast.date).toLocaleDateString('hi-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-red-600 transition line-clamp-3">
                          {featuredPodcast.title}
                        </h2>
                        {featuredPodcast.excerpt && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2" 
                             dangerouslySetInnerHTML={{ __html: featuredPodcast.excerpt }} />
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                            पॉडकास्ट सुनें
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ✅ Podcasts Grid */}
            {remainingPodcasts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {remainingPodcasts.map((podcast) => (
                  <Link 
                    key={podcast.id} 
                    href={`/podcast/${podcast.slug}`} 
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full hover:-translate-y-1">
                      
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <Image
                          src={getYouTubeThumbnail(podcast.content)}
                          alt={podcast.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized={true}
                        />
                        
                        {/* ✅ Play Button Overlay - Grid */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Podcast Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
                          </svg>
                          पॉडकास्ट
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                            {podcast.categories?.nodes?.[0]?.name || 'Podcast'}
                          </span>
                        </div>
                        
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[38px]">
                          {podcast.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(podcast.date).toLocaleDateString('hi-IN', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                          
                          <span className="text-[10px] text-red-600 font-medium flex items-center gap-1 group-hover:underline">
                            सुनें
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                <div className="text-6xl mb-4">🎙️</div>
                <h3 className="text-xl font-semibold text-gray-700">कोई पॉडकास्ट नहीं</h3>
                <p className="text-gray-400 text-sm mt-1">अभी कोई पॉडकास्ट उपलब्ध नहीं है</p>
              </div>
            )}

            {podcasts.length > 30 && (
              <div className="mt-8 text-center">
                <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-xl border border-gray-200 transition-all hover:border-red-300 text-sm">
                  और पॉडकास्ट लोड करें
                </button>
              </div>
            )}

          </div>

          {/* ✅ RIGHT SIDEBAR - Latest News */}
          <aside className="w-full lg:w-[30%]">
            <div className="sticky top-24">
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
                  {latestNews?.slice(0, 8).map((item, index) => (
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