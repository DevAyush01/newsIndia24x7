// components/Homepage/TrendingSection.jsx - ✅ Fixed with JavaScript Filter

import Image from "next/image";
import Link from "next/link";
import { graphqlQuery, getTrendingTags } from "@/lib/wordpress";

async function getTrendingData() {
  try {
    // ✅ Fetch all posts first
    const newsQuery = `
      query GetTrendingNews {
        posts(first: 30, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
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

    const newsRes = await graphqlQuery(newsQuery);
    const allPosts = newsRes?.data?.posts?.nodes || [];

    // ✅ Filter out Video and Podcast categories (JavaScript)
    const excludeSlugs = ['video', 'podcast'];
    const filteredPosts = allPosts.filter(post => {
      const categorySlugs = post.categories?.nodes?.map(cat => cat.slug.toLowerCase()) || [];
      return !categorySlugs.some(slug => excludeSlugs.includes(slug));
    });

    const tags = await getTrendingTags(20);

    return {
      newsPosts: filteredPosts,
      trendingTags: tags || [],
    };
  } catch (error) {
    console.error('Error fetching trending data:', error);
    return {
      newsPosts: [],
      trendingTags: [],
    };
  }
}

export default async function TrendingSection() {
  const { newsPosts, trendingTags } = await getTrendingData();

  if (!newsPosts.length && !trendingTags.length) {
    return null;
  }

  // ✅ No featured post - all posts in grid
  const allPosts = newsPosts.slice(0, 12);

  return (
    <section className="container max-w-7xl mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SECTION - Trending News Grid (70% width) */}
        <div className="lg:w-[70%]">
     

          {/* ✅ 2 Column Grid - No Featured */}
          <div className="grid md:grid-cols-2 gap-5">
            {allPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
                  
                  {/* Thumbnail - Height 260px */}
                  <div className="relative h-[260px] bg-gray-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        </svg>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {post.categories?.nodes?.[0]?.name || 'News'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content - Padding 4px */}
                  <div className="p-4">
                    <h3 className="font-semibold text-base text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">
                        {new Date(post.date).toLocaleDateString("hi-IN")}
                      </span>
                      {post.categories?.nodes?.[0] && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-[10px] text-red-500 font-medium">
                            {post.categories.nodes[0].name}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Trending Tags (30% width) */}
        <div className="lg:w-[30%]">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                ट्रेंडिंग टैग्स
              </h3>
            </div>

            {/* Tags */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {trendingTags.slice(0, 15).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      border
                      border-gray-200
                      bg-gray-50
                      px-3
                      py-1
                      text-[11px]
                      font-medium
                      text-gray-700
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-red-500
                      hover:text-red-600
                      hover:bg-red-50
                      hover:shadow-md
                    "
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>

              {/* View All Tags Link */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <Link 
                  href="/tags"
                  className="text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 group"
                >
                  सभी टैग्स देखें
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>

              
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-white font-bold text-sm tracking-wide">
                  NewsIndia24x7
                </span>
              </div>
              <span className="bg-white/20 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                LIVE
              </span>
            </div>

            <div className="relative bg-black">
              <iframe
                src="https://www.youtube.com/embed/fy3C4GF43Io?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                allowFullScreen
                title="NewsIndia24x7 Live TV"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}