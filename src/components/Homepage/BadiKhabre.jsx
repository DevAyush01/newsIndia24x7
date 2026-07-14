import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory } from "@/lib/wordpress";

export default async function BadiKhabre() {

  const [coverStoryTop, coverStoryBig, newsLatest] = await Promise.all([
    getPostsByCategory("cover-story-top", 5),
    getPostsByCategory("cover-story-big", 3),
    getPostsByCategory("news-latest", 5),
  ]);

  return (
    <section className="container max-w-7xl mx-auto py-5 px-4">
        <div className="flex items-center gap-2 mb-4">
            <span className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[10px] border-t-transparent border-b-transparent border-l-red-600"></span>
            <h2 className="text-lg font-bold text-black">बड़ी खबरें</h2>
          </div>
      <div className="grid grid-cols-12 gap-5">
        
        {/* ========================================================= */}
        {/* LEFT - बड़ी खबरें (Text Only with Borders) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-3">
          <div>
            {coverStoryTop.slice(0, 4).map((post, index) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <div
                  className={`py-4 cursor-pointer group px-1 rounded ${
                    index !== 4 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <h3 className="text-[16px] leading-6 font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER - Image News (Mobile: 1 column, Tablet: 2, Desktop: 3) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {coverStoryBig.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <article className="group cursor-pointer bg-[#F5F5F5] border border-[#d1d1d1] h-auto lg:h-80">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-fill"
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 sm:mt-3 text-[15px] sm:text-[15px] p-2 font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-4 sm:line-clamp-6">
                    {post.title}
                  </h3>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT - इंडिया टुडे विशेष (With Red Border) */}
        {/* ========================================================= */}
        <div className="col-span-12 lg:col-span-4 mt-4 lg:mt-0">
          <div className="border-t-4 border-b-4 border-l-[10px] border-r-[10px] border-red-600 p-4 bg-white rounded-sm">
            <h2 className="text-lg font-bold mb-4">
              <span className="text-red-600">इंडिया टुडे</span>{" "}
              <span className="text-gray-900">विशेष</span>
            </h2>

            <div className="space-y-4">
              {newsLatest.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`}>
                  <div className="flex gap-4 items-start group cursor-pointer p-1 py-2">
                    <div className="relative w-24 sm:w-30 h-16 shrink-0 overflow-hidden bg-gray-100">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-[8px]">No Image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-sm font-bold leading-5 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-2 pt-3">
              <Link
                href="/latest"
                className="text-red-600 font-bold text-sm hover:text-red-700 transition-colors inline-flex items-center gap-1"
              >
                और भी <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}