   <div className="mt-6">
        <div className="flex items-center justify-between border-b-2 border-red-600 pb-1.5 mb-4">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <span className="bg-red-600 inline-block w-1 h-5 rounded-full"></span>
            फीचर्ड न्यूज़
          </h2>
          <Link href="/featured" className="text-xs text-red-600 hover:underline font-semibold">
            सभी देखें →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.featured?.slice(0, 4).map((post) => (
            <Link key={post.id} href={`/${post.slug}`}>
              <article className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.categories?.nodes?.[0]?.name === "वीडियो" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                        <span className="text-black text-base ml-0.5">▶</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <h3 className="font-bold text-xs leading-snug text-gray-800 group-hover:text-red-600 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span>{post.categories?.nodes?.[0]?.name || "न्यूज़"}</span>
                    <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                    <span>{new Date(post.date).toLocaleDateString("hi-IN")}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>