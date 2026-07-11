import Image from "next/image";
import Link from "next/link";
import { getHomeTopSection, getBreakingNews, getPostsByCategory } from "@/lib/wordpress";
import BreakingSlider from "./BreakingSlider";

export default async function FirstTopSection() {
  const data = await getHomeTopSection();
  const breakingNews = await getBreakingNews(8);
  
  // ✅ Uttar Pradesh category se 3 news fetch karo
  const upNews = await getPostsByCategory("uttar-pradesh", 3);

  const latestPost = data.hero;
  
  // ✅ FIX: 8 posts chahiye, filter ke baad bhi 8
  let recentPosts = data.latest?.filter((post) => post.id !== latestPost?.id) || [];
  
  // ✅ Agar 8 se kam hain toh aur posts add karo (featured se)
  if (recentPosts.length < 8) {
    const extraPosts = data.featured?.filter((post) => 
      post.id !== latestPost?.id && !recentPosts.some(p => p.id === post.id)
    ) || [];
    recentPosts = [...recentPosts, ...extraPosts];
  }
  
  // ✅ Sirf 8 posts lo
  recentPosts = recentPosts.slice(0, 8);

  const superfastNews = [...(data.featured || []), ...(data.latest || [])].slice(0, 11);
  const liveTvNews = [...(data.featured || []), ...(data.latest || [])].slice(0, 4);

  return (
    <section className="container max-w-7xl mx-auto py-4">
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          {latestPost && (
            <Link href={`/post/${latestPost.slug}`}>
              <article className="group cursor-pointer bg-gray-100 p-1">
                <h1 className="mt-3 text-lg md:text-2xl font-extrabold leading-snug [word-spacing:6px] text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                  {latestPost.title}
                </h1>
                <div className="relative w-full aspect-3/2 overflow-hidden bg-gray-200 shadow">
                  <Image
                    src={latestPost.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                    alt={latestPost.title}
                    fill
                    className="object-fill transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {latestPost.categories?.nodes?.[0] && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded-sm">
                      {latestPost.categories.nodes[0].name}
                    </span>
                  )}
                </div>
                <div
                  className="mt-1.5 text-[13px] px-1 leading-relaxed text-gray-500 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: latestPost.excerpt }}
                />
              </article>        
            </Link>
          )}

          {/* Recent Posts - Mobile: 1 column, Desktop: 2 columns */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:px-0 px-2">
            {recentPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 pb-3">
                <Link href={`/post/${post.slug}`}>
                  <article className="group cursor-pointer flex gap-3 items-start">
                    <div className="relative w-28 h-16 shrink-0 overflow-hidden bg-gray-100">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="flex-1 text-[15px] font-medium leading-relaxed text-gray-800 group-hover:text-red-600 line-clamp-3">
                      {post.title}
                    </h3>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          {/* BREAKING SECTION - Slider with Images */}
          <BreakingSlider breakingNews={breakingNews} />
        </div>

        {/* CENTER - Superfast News */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 sm:px-0 px-2">
          <div className="overflow-hidden bg-white rounded-sm">
            <div className="flex items-center justify-between px-3 py-2 bg-white">
              <div className="flex items-end gap-1">
                <div className="flex flex-col leading-none">
                  <span className="text-red-600 font-black text-[20px] tracking-tighter leading-none" style={{ fontStyle: "italic" }}>
                    सुपरफास्ट
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-gray-700 font-bold text-[12px] tracking-[0.2em] uppercase">NEWS</span>
                    <span className="flex gap-px">
                      {[12, 9, 7].map((h, i) => (
                        <span key={i} className="inline-block w-px bg-red-500" style={{ height: h }}></span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-[11px] leading-tight text-right max-w-[130px]">
                सबसे कम समय में सबसे ज़्यादा खबरें...
              </span>
            </div>

            {superfastNews[0] && (
              <Link href={`/post/${superfastNews[0].slug}`}>
                <article className="group border-b border-gray-200">
                  <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                    <Image
                      src={superfastNews[0].featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                      alt={superfastNews[0].title}
                      fill
                      className="object-fill transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  <div className="px-3 py-2.5">
                    <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-red-600 line-clamp-2">
                      {superfastNews[0].title}
                    </h3>
                    {superfastNews[0].date && (
                      <span className="text-[10px] text-gray-400 mt-0.5 block">
                        {new Date(superfastNews[0].date).toLocaleDateString("hi-IN")}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            )}

            {superfastNews.slice(1, 10).map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <article className="group sm:px-0 px-2 flex gap-4 py-4 hover:bg-red-50 transition-colors border-b border-gray-200">
                  <div className="relative h-17 w-28 shrink-0 overflow-hidden bg-gray-100">
                    <Image
                      src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-medium leading-relaxed text-gray-800 group-hover:text-red-600 line-clamp-3">
                      {post.title}
                    </h3>
                    {post.date && (
                      <span className="text-[10px] text-gray-400 mt-0.5 block">
                        {new Date(post.date).toLocaleDateString("hi-IN")}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4 sm:px-0 px-2">
          <div className="rounded-sm border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="bg-red-600 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-bold tracking-wide">NewsIndia24x7</span>
                <span className="bg-white/20 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">LIVE</span>
              </div>
            </div>
            <div className="relative bg-black">
              <iframe
                src="https://www.youtube.com/embed/fy3C4GF43Io?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
                allowFullScreen
                title="NewsIndia24x7 Live TV"
              ></iframe>
            </div>
          </div>

          <div className="rounded-sm border border-gray-200 overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                ट्रेंडिंग न्यूज़
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {liveTvNews.slice(0, 4).map((post, idx) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <article className="group flex gap-2.5 px-2 py-2 hover:bg-red-50 transition-colors">
                    <span className="text-red-600 font-bold text-sm min-w-[24px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold leading-snug text-gray-800 group-hover:text-red-600 line-clamp-3">
                       {post.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 px-3 py-2 bg-gray-50 text-center">
              <Link href="/latest" className="text-[10px] text-red-600 hover:underline font-semibold inline-flex items-center gap-1">
                सभी देखें <span>→</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.google.com/search?q=newsindia24x7.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[330px] h-11 border border-red-500 rounded-lg bg-[#f3f5f7] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="text-yellow-400 text-xl leading-none">★</span>
              <span className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">
                FAV US ON
              </span>
              <img
                src="/google.gif"
                alt="Google G"
                className="w-16 h-7"
              />
            </a>
          </div>

          {/* ✅ Uttar Pradesh News - Full width image with title overlay */}
          {upNews.length > 0 && (
            <div className="space-y-6 mt-10">
              {upNews.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="block">
                  <div className="group relative w-full aspect-[16/9] overflow-hidden bg-gray-100 cursor-pointer">
                    {/* Full Width Image */}
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    {/* Title on top of image - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}