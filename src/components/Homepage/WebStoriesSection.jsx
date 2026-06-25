'use client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

export default function WebStoriesSection() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWebStories() {
      try {
        // Query to get posts that are web stories (by category or by specific criteria)
        // First, let's get all posts and we can identify stories by their format or category
        const query = `
          query GetPostsForStories {
            posts(first: 20) {
              nodes {
                id
                title
                slug
                date
                excerpt
                postFormat {
                  name
                  slug
                }
                categories {
                  nodes {
                    id
                    name
                    slug
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        `;
        
        const response = await graphqlQuery(query);
        const allPosts = response?.data?.posts?.nodes || [];
        
        // Filter posts that are web stories (by category named "web-stories" or post format)
        let storyPosts = allPosts.filter(post => 
          post.categories?.nodes?.some(cat => 
            cat.slug === 'web-stories' || 
            cat.slug === 'webstory' || 
            cat.name?.toLowerCase().includes('story')
          ) ||
          post.postFormat?.slug === 'web-story'
        );
        
        // If no specific category found, use the most recent 6 posts as featured stories
        if (storyPosts.length === 0 && allPosts.length > 0) {
          storyPosts = allPosts.slice(0, 6);
          console.log('No web-stories category found. Showing recent posts as featured stories.');
        }
        
        setStories(storyPosts);
        
        if (storyPosts.length === 0) {
          console.log('No posts available for stories section.');
        }
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWebStories();
  }, []);

  if (loading) {
    return (
      <section className="container max-w-7xl mx-auto px-3 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              वेब स्टोरीज
            </h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-[280px] md:w-[300px]">
              <div className="relative rounded-xl overflow-hidden bg-gray-200 aspect-[3/4] animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container max-w-7xl mx-auto px-3 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-700 text-sm">Unable to load stories. Please check back later.</p>
        </div>
      </section>
    );
  }

  if (stories.length === 0) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto px-3 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            वेब स्टोरीज
          </h2>
          <span className="text-[10px] font-semibold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">
            नई
          </span>
        </div>
        <Link 
          href="/web-stories" 
          className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 group"
        >
          सभी देखें 
          <span className="group-hover:translate-x-1 transition">→</span>
        </Link>
      </div>

      {/* Horizontal Scrolling Stories */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {stories.slice(0, 10).map((story, index) => {
            const imageUrl = story.featuredImage?.node?.sourceUrl;
            const gradientColors = [
              "from-blue-600/80 to-indigo-600/80",
              "from-green-600/80 to-emerald-600/80",
              "from-orange-600/80 to-red-600/80",
              "from-pink-600/80 to-rose-600/80",
              "from-purple-600/80 to-violet-600/80",
              "from-cyan-600/80 to-teal-600/80",
            ];
            const gradientColor = gradientColors[index % gradientColors.length];
            
            return (
              <Link 
                key={story.id} 
                href={`/${story.slug}`}
                className="group flex-shrink-0 w-[280px] md:w-[300px] snap-start"
              >
                <div 
                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[3/4] w-full">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor}`}></div>
                    )}
                    
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} opacity-70`}></div>
                    
                    <div className="absolute top-3 right-3 z-10">
                      <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {story.categories?.nodes?.[0]?.name || "स्टोरी"}
                      </span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="text-white font-bold text-sm leading-snug line-clamp-3">
                        {story.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 mt-2 text-white/80 text-[10px]">
                        <span>देखें</span>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                    <div className="w-0 h-full bg-white group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {stories.length > 3 && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block"></div>
          </>
        )}
      </div>

      {stories.length > 3 && (
        <div className="flex justify-center gap-1 mt-4">
          {stories.slice(0, 5).map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === 0 ? 'bg-purple-600 w-3' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      )}
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}