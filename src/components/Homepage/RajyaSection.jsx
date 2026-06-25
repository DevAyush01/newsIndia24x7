// components/Homepage/RajyaSection.jsx - ✅ Server Component (No styled-jsx)

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { graphqlQuery } from "@/lib/wordpress";

const STATE_KEYWORDS = [
  'uttar-pradesh', 'bihar', 'delhi', 'uttarakhand', 'madhya-pradesh',
  'rajasthan', 'west-bengal', 'bengal', 'chhattisgarh', 'jharkhand',
  'maharashtra', 'gujarat', 'punjab', 'haryana', 'kerala', 'tamil-nadu',
  'karnataka', 'andhra-pradesh', 'telangana'
];

const STATE_NAME_MAP = {
  'uttar-pradesh': 'उत्तर प्रदेश',
  'bihar': 'बिहार',
  'delhi': 'दिल्ली',
  'uttarakhand': 'उत्तराखंड',
  'madhya-pradesh': 'मध्य प्रदेश',
  'rajasthan': 'राजस्थान',
  'west-bengal': 'पश्चिम बंगाल',
  'bengal': 'बंगाल',
  'chhattisgarh': 'छत्तीसगढ़',
  'jharkhand': 'झारखंड',
  'maharashtra': 'महाराष्ट्र',
  'gujarat': 'गुजरात',
  'punjab': 'पंजाब',
  'haryana': 'हरियाणा',
  'kerala': 'केरल',
  'tamil-nadu': 'तमिलनाडु',
  'karnataka': 'कर्नाटक',
  'andhra-pradesh': 'आंध्र प्रदेश',
  'telangana': 'तेलंगाना'
};

const STATE_ORDER = {
  'uttar-pradesh': 1,
  'bihar': 2,
  'delhi': 3,
  'uttarakhand': 4,
  'madhya-pradesh': 5,
  'rajasthan': 6,
  'west-bengal': 7,
  'bengal': 8,
  'chhattisgarh': 9,
  'jharkhand': 10,
  'maharashtra': 11,
  'gujarat': 12,
  'punjab': 13,
  'haryana': 14
};

async function getRajyaData() {
  try {
    // ✅ Fetch all categories
    const categoryQuery = `
      query GetStateCategories {
        categories(first: 50) {
          nodes {
            id
            name
            slug
            count
          }
        }
      }
    `;
    
    const categoryResponse = await graphqlQuery(categoryQuery);
    const allCategories = categoryResponse?.data?.categories?.nodes || [];
    
    // ✅ Filter state categories
    const stateCategories = allCategories.filter(cat => 
      STATE_KEYWORDS.includes(cat.slug) || 
      cat.name?.includes('प्रदेश') ||
      cat.name?.includes('राज्य') ||
      cat.name === 'दिल्ली' ||
      cat.slug === 'delhi'
    );
    
    // ✅ Sort states
    const sortedStates = stateCategories.sort((a, b) => {
      return (STATE_ORDER[a.slug] || 999) - (STATE_ORDER[b.slug] || 999);
    });
    
    // ✅ Fetch posts for all states in parallel
    const statePromises = sortedStates.map(async (state) => {
      const postQuery = `
        query GetStateNews {
          posts(first: 8, where: { categoryName: "${state.slug}" }) {
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
      
      const response = await graphqlQuery(postQuery);
      return {
        state: state,
        posts: response?.data?.posts?.nodes || []
      };
    });
    
    const results = await Promise.all(statePromises);
    
    // ✅ Build data object
    const allPostsData = {};
    results.forEach(({ state, posts }) => {
      allPostsData[state.slug] = posts;
    });
    
    return {
      states: sortedStates,
      allPostsData: allPostsData,
    };
  } catch (error) {
    console.error('Error fetching rajya data:', error);
    return {
      states: [],
      allPostsData: {},
    };
  }
}

export default async function RajyaSection() {
  const { states, allPostsData } = await getRajyaData();

  if (!states || states.length === 0) {
    return null;
  }

  const selectedState = states[0]?.slug || '';
  const currentPosts = allPostsData[selectedState] || [];

  const getStateDisplayName = (slug) => {
    return STATE_NAME_MAP[slug] || slug;
  };

  return (
    <section className="max-w-7xl mx-auto py-5 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-5 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
          <h2 className="text-[26px] font-bold text-black">राज्यवार खबरें</h2>
          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full ml-2">
            STATE NEWS
          </span>
        </div>

        <Link
          href={`/category/${selectedState}`}
          className="text-red-600 font-bold text-sm hover:text-red-700 transition-colors flex items-center gap-1 group"
        >
          और भी 
          <span className="group-hover:translate-x-1 transition">▶</span>
        </Link>
      </div>

      {/* Tabs - Static */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto px-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex scrollbar-hide">
            {states.map((state) => (
              <Link
                key={state.id}
                href={`/category/${state.slug}`}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                  state.slug === selectedState
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {getStateDisplayName(state.slug)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content - Static */}
      <div className="min-h-[500px]">
        {currentPosts.length > 0 ? (
          <>
            {/* Featured Section */}
            <div className="grid lg:grid-cols-2 gap-6 p-5">
              <div>
                <Link href={`/post/${currentPosts[0].slug}`} className="group block overflow-hidden rounded-lg shadow-md">
                  <div className="relative h-[280px] bg-gray-100">
                    {currentPosts[0].featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={currentPosts[0].featuredImage.node.sourceUrl}
                        alt={currentPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    {getStateDisplayName(selectedState)}
                  </span>
                </div>
                <Link href={`/post/${currentPosts[0].slug}`}>
                  <h2 className="text-[26px] md:text-[34px] font-bold leading-tight hover:text-red-600 transition line-clamp-3">
                    {currentPosts[0].title}
                  </h2>
                </Link>
                {currentPosts[0].excerpt && (
                  <p className="mt-3 text-[15px] text-gray-600 leading-relaxed line-clamp-3">
                    {currentPosts[0].excerpt.replace(/<[^>]*>/g, '')}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                  <span>{new Date(currentPosts[0].date).toLocaleDateString("hi-IN")}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>राज्य समाचार</span>
                </div>
              </div>
            </div>

            {/* Bottom News Grid */}
            {currentPosts.slice(1).length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 px-5 pb-5">
                {currentPosts.slice(1, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="group block hover:bg-gray-50 rounded-lg transition-colors p-2"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-[150px] h-[85px] shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[18px] leading-6 text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-gray-400">
                            {new Date(post.date).toLocaleDateString("hi-IN")}
                          </span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-[10px] text-red-500">{getStateDisplayName(selectedState)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View All Button */}
            {currentPosts.length > 5 && (
              <div className="text-center py-4 border-t border-gray-100 mt-2">
                <Link 
                  href={`/category/${selectedState}`}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                  सभी खबरें देखें
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[450px] text-center">
            <svg className="w-16 h-16 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
            <p className="text-gray-500 text-lg">इस राज्य से कोई खबर नहीं है</p>
            <p className="text-gray-400 text-sm mt-1">कृपया किसी अन्य राज्य का चयन करें</p>
          </div>
        )}
      </div>
    </section>
  );
}