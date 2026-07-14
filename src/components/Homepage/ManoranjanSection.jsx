// components/Homepage/ManoranjanSection.jsx - ✅ Only Entertainment Section

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
    
    const entertainmentRes = await graphqlQuery(entertainmentQuery);
    
    return {
      entertainmentPosts: entertainmentRes?.data?.posts?.nodes || [],
    };
  } catch (error) {
    console.error('Error fetching manoranjan data:', error);
    return {
      entertainmentPosts: [],
    };
  }
}

export default async function ManoranjanSection() {
  const { entertainmentPosts } = await getManoranjanData();

  if (!entertainmentPosts.length) {
    return null;
  }

  return (
    <section className="container max-w-7xl mx-auto  py-2">

  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
      <h2 className="text-[20px] font-bold">मनोरंजन</h2>
    </div>

    <Link
      href="/category/entertainment"
       className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
    >
      और भी
      <span className="group-hover:translate-x-1 transition">→</span>
    </Link>
  </div>

  {/* Content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-gray-50 p-3">

    {/* Left Featured */}
    {entertainmentPosts[0] && (
      <Link
        href={`/post/${entertainmentPosts[0].slug}`}
        className="block"
      >
        <div className="relative h-[280px]">
          <Image
            src={entertainmentPosts[0].featuredImage?.node?.sourceUrl}
            alt={entertainmentPosts[0].title}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="mt-3 text-base sm:text-2xl font-bold leading-snug">
          {entertainmentPosts[0].title}
        </h3>
      </Link>
    )}

    {/* Right News List */}
    <div>
      {entertainmentPosts.slice(1, 5).map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.slug}`}
          className="flex gap-3 py-3 border-b border-gray-300 last:border-b-0"
        >
          <div className="relative w-[120px] h-[70px] flex-shrink-0">
            <Image
              src={post.featuredImage?.node?.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-sm sm:text-base leading-relaxed hover:text-red-600">
            {post.title}
          </h3>
        </Link>
      ))}
    </div>

  </div>

</section>
  );
}