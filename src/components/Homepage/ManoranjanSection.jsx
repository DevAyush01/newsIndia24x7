// components/Homepage/ManoranjanSection.jsx - ✅ Server Component

import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

async function getManoranjanData() {
  try {
    // ✅ Entertainment Posts
    const entertainmentQuery = `
      query GetEntertainmentPosts {
        posts(first: 10, where: { categoryName: "entertainment" }) {
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
    
    // ✅ Business Posts
    const businessQuery = `
      query GetBusinessPosts {
        posts(first: 5, where: { categoryName: "business" }) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;
    
    // ✅ Lifestyle Posts
    const lifestyleQuery = `
      query GetLifestylePosts {
        posts(first: 5, where: { categoryName: "lifestyle" }) {
          nodes {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `;
    
    const [entertainmentRes, businessRes, lifestyleRes] = await Promise.all([
      graphqlQuery(entertainmentQuery),
      graphqlQuery(businessQuery),
      graphqlQuery(lifestyleQuery)
    ]);
    
    return {
      entertainmentPosts: entertainmentRes?.data?.posts?.nodes || [],
      businessPosts: businessRes?.data?.posts?.nodes || [],
      lifestylePosts: lifestyleRes?.data?.posts?.nodes || [],
    };
  } catch (error) {
    console.error('Error fetching manoranjan data:', error);
    return {
      entertainmentPosts: [],
      businessPosts: [],
      lifestylePosts: [],
    };
  }
}

export default async function ManoranjanSection() {
  const { entertainmentPosts, businessPosts, lifestylePosts } = await getManoranjanData();

  if (!entertainmentPosts.length && !businessPosts.length && !lifestylePosts.length) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SECTION - मनोरंजन */}
        <div className="lg:w-[80%] border-b border-b-gray-400">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-red-500">
            <div className="flex items-center gap-2">
              <div className="w-0 h-0 border-l-[8px] border-l-red-600 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
              <h2 className="font-bold text-2xl">मनोरंजन</h2>
              <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full ml-1">
                एंटरटेनमेंट
              </span>
            </div>
            <Link href="/category/entertainment" className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group">
              और भी 
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>

          {/* Featured Post - Large */}
          {entertainmentPosts[0] && (
            <Link href={`/post/${entertainmentPosts[0].slug}`} className="group block mb-5">
              <div className="relative rounded-xl overflow-hidden bg-gray-900">
                <div className="relative h-[320px] md:h-[380px]">
                  {entertainmentPosts[0].featuredImage?.node?.sourceUrl ? (
                    <>
                      <Image
                        src={entertainmentPosts[0].featuredImage.node.sourceUrl}
                        alt={entertainmentPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-800 to-red-700 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      </svg>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      मनोरंजन
                    </span>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight line-clamp-2 drop-shadow-lg">
                      {entertainmentPosts[0].title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                      <span>{new Date(entertainmentPosts[0].date).toLocaleDateString("hi-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Entertainment Posts */}
          <div className="grid md:grid-cols-2 gap-4">
            {entertainmentPosts.slice(1, 5).map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                <div className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition">
                  <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-300 to-red-400 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 group-hover:text-red-600 line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {new Date(post.date).toLocaleDateString("hi-IN")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Business & Lifestyle */}
        <div className="lg:w-[20%] space-y-6">
          
          {/* Business Section */}
          <div>
            <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-red-500">
              <div className="flex items-center gap-1">
                <span className="text-red-600 text-sm">◀</span>
                <h2 className="font-bold text-lg">बिजनेस</h2>
              </div>
              <Link href="/category/business" className="text-red-600 text-xs font-semibold hover:text-red-700">
                और भी ▶
              </Link>
            </div>

            <div className="space-y-3">
              {businessPosts.slice(0, 4).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                  <div className="flex gap-2 hover:bg-gray-50 p-1 rounded transition">
                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-3">
                        {post.title}
                      </h3>
                      <span className="text-[9px] text-gray-400 mt-0.5 block">
                        {new Date(post.date).toLocaleDateString("hi-IN")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Lifestyle Section */}
          <div>
            <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-red-500">
              <div className="flex items-center gap-1">
                <span className="text-red-600 text-sm">◀</span>
                <h2 className="font-bold text-lg">लाइफस्टाइल</h2>
              </div>
              <Link href="/category/lifestyle" className="text-red-600 text-xs font-semibold hover:text-red-700">
                और भी ▶
              </Link>
            </div>

            <div className="space-y-3">
              {lifestylePosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                  <div className="flex gap-2 hover:bg-gray-50 p-1 rounded transition">
                    <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-gray-800 group-hover:text-red-600 line-clamp-3">
                        {post.title}
                      </h3>
                      <span className="text-[9px] text-gray-400 mt-0.5 block">
                        {new Date(post.date).toLocaleDateString("hi-IN")}
                      </span>
                    </div>
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