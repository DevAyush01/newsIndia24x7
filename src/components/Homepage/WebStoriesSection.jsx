// components/Homepage/WebStoriesSection.jsx - ✅ Server Component

import Link from "next/link";
import Image from "next/image";
import WebStoriesSlider from "./WebStoriesSlider";
import { graphqlQuery, getPostsByCategory } from "@/lib/wordpress";

async function getWebStories() {
  try {
    const res = await fetch(
      "https://newsindia24x7.tv/wp-json/web-stories/v1/web-story?per_page=10&_embed=true",
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getDeshNews() {
  try {
    const res = await fetch(
      "https://newsindia24x7.tv/wp-json/wp/v2/posts?per_page=6&categories=36&_embed=true&status=publish&orderby=date&order=desc",
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getExplainerNews() {
  try {
    return await getPostsByCategory("explainer", 4);
  } catch (error) {
    console.error("❌ Error fetching explainer news:", error);
    return [];
  }
}

async function getCrimeNews() {
  try {
    return await getPostsByCategory("crime", 4);
  } catch (error) {
    console.error("❌ Error fetching crime news:", error);
    return [];
  }
}

export default async function WebStoriesSection() {
  const stories = await getWebStories();
  const deshPosts = await getDeshNews();
  const explainerNews = await getExplainerNews();
  const crimeNews = await getCrimeNews();

  if (!stories?.length && !deshPosts?.length) return null;

  return (
    <section className="container max-w-7xl mx-auto px-4 py-5 border-t border-gray-200">
      
      {/* ✅ Main Grid - Left (70%) | Right (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* ✅ LEFT COLUMN - 70% (7/10) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* ✅ Web Stories Section */}
          {stories?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
                  <h2 className="text-xl font-bold text-gray-900">
                    <span className="text-purple-600">विजुअल</span> स्टोरीज
                  </h2>
                  <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 animate-pulse">
                    नई
                  </span>
                </div>
                <Link
                  href="/web-stories"
                  className="text-purple-600 text-xs font-semibold hover:text-purple-700 transition flex items-center gap-1 group"
                >
                  सभी देखें
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>

              <WebStoriesSlider stories={stories} />
            </div>
          )}

          {/* ✅ Desh Category Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  <span className="text-red-600">देश</span> की खबरें
                </h2>
              </div>
              <Link
                href="/category/desh"
                className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group"
              >
                और देखें
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>

            {/* ✅ Desh News - 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* LEFT COLUMN - Featured + Medium Post */}
              <div className="space-y-4">
                
                {/* Featured Post (Big) - Text on Image (Absolute) */}
                {deshPosts[0] && (
                  <Link href={`/post/${deshPosts[0].slug}`} className="group block">
                    <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative h-[260px] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={deshPosts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
                          alt={deshPosts[0].title?.rendered || "Featured"}
                          fill
                          className="object-fill group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition line-clamp-2 drop-shadow-lg">
                            {deshPosts[0].title?.rendered || "No Title"}
                          </h3>
                          <span className="text-[10px] text-white/80">
                            {new Date(deshPosts[0].date).toLocaleDateString("hi-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5">
                            देश
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Medium Post */}
                {deshPosts[1] && (
                  <Link href={`/post/${deshPosts[1].slug}`} className="group block">
                    <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="flex gap-3 p-3">
                        <div className="relative w-[120px] h-[80px] flex-shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={deshPosts[1]._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
                            alt={deshPosts[1].title?.rendered || "News"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition line-clamp-3">
                            {deshPosts[1].title?.rendered || "No Title"}
                          </h4>
                          <span className="text-[10px] text-gray-400">
                            {new Date(deshPosts[1].date).toLocaleDateString("hi-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}
              </div>

              {/* RIGHT COLUMN - 3 Small Posts */}
              <div className="space-y-3">
                {deshPosts.slice(2, 6).map((post) => (
                  <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                    <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-3">
                      <div className="flex gap-3">
                        <div className="relative w-[80px] h-[60px] flex-shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}
                            alt={post.title?.rendered || "News"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 group-hover:text-red-600 transition line-clamp-2">
                            {post.title?.rendered || "No Title"}
                          </h4>
                          <span className="text-[9px] text-gray-400">
                            {new Date(post.date).toLocaleDateString("hi-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ✅ RIGHT COLUMN - 30% (3/10) - Explainer + Crime Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 shadow-sm p-4">

            {/* ✅ Explainer Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200">
                <span className="text-blue-600 text-sm">◀</span>
                <h3 className="text-sm font-bold text-gray-900">एक्सप्लेनर</h3>
                <span className="text-[8px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 ml-auto">
                  EXPLAINER
                </span>
              </div>

              <div className="space-y-2.5">
                {explainerNews?.length > 0 ? (
                  explainerNews.map((item) => {
                    const imageUrl = item.featuredImage?.node?.sourceUrl || null;
                    const title = item.title || "No Title";
                    const slug = item.slug || item.id;
                    const date = item.date || new Date();

                    return (
                      <Link
                        key={item.id}
                        href={`/post/${slug}`}
                        className="block group"
                      >
                        <div className="flex gap-2.5 hover:bg-gray-50 p-1.5 rounded transition">
                          {imageUrl && (
                            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded">
                              <Image
                                src={imageUrl}
                                alt={title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
                              {title}
                            </h4>
                            <span className="text-[9px] text-gray-400">
                              {new Date(date).toLocaleDateString("hi-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-400 text-center py-2">
                    कोई एक्सप्लेनर नहीं
                  </p>
                )}
              </div>

              <div className="mt-2 pt-1.5 border-t border-gray-100 text-center">
                <Link
                  href="/category/explainer"
                  className="text-[10px] text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group"
                >
                  सभी देखें
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </div>

            {/* ✅ Crime Section */}
            <div>
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200">
                <span className="text-red-600 text-sm">◀</span>
                <h3 className="text-sm font-bold text-gray-900">क्राइम</h3>
                <span className="text-[8px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 ml-auto">
                  CRIME
                </span>
              </div>

              <div className="space-y-2.5">
                {crimeNews?.length > 0 ? (
                  crimeNews.map((item) => {
                    const imageUrl = item.featuredImage?.node?.sourceUrl || null;
                    const title = item.title || "No Title";
                    const slug = item.slug || item.id;
                    const date = item.date || new Date();

                    return (
                      <Link
                        key={item.id}
                        href={`/post/${slug}`}
                        className="block group"
                      >
                        <div className="flex gap-2.5 hover:bg-gray-50 p-1.5 rounded transition">
                          {imageUrl && (
                            <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-100 rounded">
                              <Image
                                src={imageUrl}
                                alt={title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                              {title}
                            </h4>
                            <span className="text-[9px] text-gray-400">
                              {new Date(date).toLocaleDateString("hi-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-400 text-center py-2">
                    कोई क्राइम न्यूज़ नहीं
                  </p>
                )}
              </div>

              <div className="mt-2 pt-1.5 border-t border-gray-100 text-center">
                <Link
                  href="/category/crime"
                  className="text-[10px] text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 group"
                >
                  सभी देखें
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}