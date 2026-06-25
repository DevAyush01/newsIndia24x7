// components/Homepage/FirstTopSection.jsx - Server Component
import Image from "next/image";
import Link from "next/link";
import { getHomeTopSection } from "@/lib/wordpress";

export default async function FirstTopSection() {
  const data = await getHomeTopSection();

  const latestPost = data.hero;
  const recentPosts = data.latest?.filter((post) => post.id !== latestPost?.id).slice(0, 2) || [];
  const superfastNews = [...(data.featured || []), ...(data.latest || [])].slice(0, 6);
  const liveTvNews = [...(data.featured || []), ...(data.latest || [])].slice(0, 4);

  return (
    <section className="container max-w-7xl mx-auto px-3 py-4">
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 md:col-span-5 lg:col-span-5">
          {latestPost && (
            <Link href={`/post/${latestPost.slug}`}>
              <article className="group cursor-pointer">
                <div className="relative w-full aspect-3/2 overflow-hidden rounded-md bg-gray-200 shadow">
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
                <h1 className="mt-3 text-lg md:text-xl font-extrabold leading-snug text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                  {latestPost.title}
                </h1>
                <div
                  className="mt-1.5 text-sm text-gray-500 line-clamp-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: latestPost.excerpt }}
                />
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <span>{new Date(latestPost.date).toLocaleDateString("hi-IN")}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{latestPost.readTime || "3 मिनट में पढ़ें"}</span>
                </div>
              </article>
            </Link>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <article className="group cursor-pointer">
                  <div className="relative w-full aspect-video overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-fill transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-1.5 text-xs font-semibold leading-snug text-gray-800 group-hover:text-red-600 line-clamp-2">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-white">
              <div className="flex items-end gap-1">
                <div className="flex flex-col leading-none">
                  <span className="text-red-600 font-black text-[17px] tracking-tighter leading-none" style={{ fontStyle: "italic" }}>
                    सुपरफास्ट
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-gray-700 font-bold text-[9px] tracking-[0.2em] uppercase">NEWS</span>
                    <span className="flex gap-px">
                      {[12, 9, 7].map((h, i) => (
                        <span key={i} className="inline-block w-px bg-red-500" style={{ height: h }}></span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-[10px] leading-tight text-right max-w-[130px]">
                सबसे कम समय में सबसे ज़्यादा खबरें...
              </span>
            </div>

            {superfastNews[0] && (
              <Link href={`/post/${superfastNews[0].slug}`}>
                <article className="group">
                  <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                    <Image
                      src={superfastNews[0].featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                      alt={superfastNews[0].title}
                      fill
                      className="object-fill transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  <div className="px-3 py-2.5 border-b border-gray-100">
                    <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-red-600 line-clamp-2">
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

            <div className="divide-y divide-gray-100">
              {superfastNews.slice(1, 6).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <article className="group flex gap-2.5 px-3 py-2 hover:bg-red-50 transition-colors">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-gray-100">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold leading-snug text-gray-800 group-hover:text-red-600 line-clamp-2">
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

            <div className="border-t border-gray-100 px-3 py-2 flex justify-end bg-gray-50">
              <Link href="/latest" className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors group">
                और भी
                <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-red-600 group-hover:border-l-red-700 transition-colors"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4">
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
            <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2">
                <span className="w-1 h-4 bg-red-600 rounded-full"></span>
                ट्रेंडिंग न्यूज़
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {liveTvNews.slice(0, 4).map((post, idx) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <article className="group flex gap-2.5 px-3 py-2 hover:bg-red-50 transition-colors">
                    <span className="text-red-600 font-bold text-sm min-w-[24px]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold leading-snug text-gray-800 group-hover:text-red-600 line-clamp-2">
                        {post.title}
                      </h3>
                      <span className="text-[9px] text-gray-400 mt-0.5 block">
                        {new Date(post.date).toLocaleDateString("hi-IN")}
                      </span>
                    </div>
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded bg-gray-100">
                      <Image
                        src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
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
        </div>
      </div>
    </section>
  );
}