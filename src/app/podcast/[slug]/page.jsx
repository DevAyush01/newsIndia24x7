// app/podcast/[slug]/page.jsx

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
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`;
  }
  return null;
};

// ✅ Remove video embed from content
const cleanContent = (content) => {
  if (!content) return '';
  
  let cleaned = content.replace(/<iframe[^>]*youtube\.com\/embed\/[^>]*><\/iframe>/gi, '');
  cleaned = cleaned.replace(/https?:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/g, '');
  cleaned = cleaned.replace(/https?:\/\/youtu\.be\/[a-zA-Z0-9_-]+/g, '');
  cleaned = cleaned.replace(/https?:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/g, '');
  
  return cleaned;
};

// ✅ Fetch ONLY podcast posts
async function getPodcastData(slug) {
  const query = `
    query GetPodcastPost($slug: String!) {
      posts(where: { 
        name: $slug,
        categoryName: "podcast"
      }) {
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
      cleanContent: cleanContent(post.content)
    };
  } catch (error) {
    console.error('❌ Error fetching podcast:', error);
    return null;
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

export default async function PodcastPage({ params }) {
  const { slug } = await params;
  const podcast = await getPodcastData(slug);
  const latestNews = await getLatestNews();

  if (!podcast || !podcast.youtubeId) {
    notFound();
  }

  const categoryName = podcast.categories?.nodes?.[0]?.name || 'Podcast';

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
          <Link href="/podcasts" className="hover:text-red-600 transition-colors">
            पॉडकास्ट
          </Link>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium line-clamp-1 max-w-[200px] md:max-w-full">
            {podcast.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ✅ LEFT CONTENT - Podcast Player */}
          <div className="w-full lg:w-[70%]">
            
            {/* ✅ Podcast Player */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-video bg-black">
                {podcast.embedUrl ? (
                  <iframe
                    src={podcast.embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={podcast.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                    <svg className="w-20 h-20 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-500 text-sm">Podcast not available</span>
                  </div>
                )}
                
                {/* ✅ Podcast Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z"/>
                    </svg>
                    पॉडकास्ट
                  </span>
                </div>
              </div>

              {/* ✅ Podcast Info */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                    {categoryName}
                  </span>
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(podcast.date).toLocaleDateString('hi-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {podcast.title}
                </h1>

                {podcast.excerpt && (
                  <div 
                    className="text-gray-600 text-sm mt-4 leading-relaxed border-l-4 border-red-600 pl-4 bg-gray-50 py-2 rounded-r"
                    dangerouslySetInnerHTML={{ __html: podcast.excerpt }}
                  />
                )}

                {/* ✅ Clean Content */}
                {podcast.cleanContent && (
                  <div 
                    className="text-gray-700 text-base mt-6 leading-relaxed prose prose-gray max-w-none
                      [&>p]:mb-4 [&>p]:leading-7
                      [&>h2]:text-gray-900 [&>h2]:font-bold [&>h2]:text-xl [&>h2]:mt-6 [&>h2]:mb-3
                      [&>h3]:text-gray-900 [&>h3]:font-bold [&>h3]:text-lg [&>h3]:mt-5 [&>h3]:mb-2
                      [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
                      [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
                      [&>li]:mb-1.5 [&>li]:leading-7
                      [&>strong]:text-gray-900 [&>b]:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: podcast.cleanContent }}
                  />
                )}

                {/* ✅ Share Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share this podcast:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://newsindia24x7.tv/podcast/${podcast.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1877F2] hover:bg-[#0d65d9] text-white px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://newsindia24x7.tv/podcast/${podcast.slug}`)}&text=${encodeURIComponent(podcast.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#000000] hover:bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </a>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent(`${podcast.title} - https://newsindia24x7.tv/podcast/${podcast.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1da851] text-white px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Back to Podcasts */}
            <div className="mt-6 text-center">
              <Link 
                href="/podcasts"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition border border-gray-200 hover:border-red-300 px-6 py-3 rounded-xl text-sm font-medium bg-white hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                सभी पॉडकास्ट देखें
              </Link>
            </div>
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