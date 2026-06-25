// components/Homepage/TravelSection.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TravelSection({ travelData }) {
  // Agar data nahi hai toh empty state
  if (!travelData || travelData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between border-b-2 border-blue-600 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span>✈️</span> Travel
            </h2>
            <Link 
              href="/category/travel" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              और देखें <span>→</span>
            </Link>
          </div>
          <p className="text-gray-500 text-center py-8">कोई समाचार उपलब्ध नहीं है</p>
        </div>
      </div>
    );
  }

  // ✅ Step 1: Har post ki PRIMARY category decide karo
  const getPrimaryCategory = (post) => {
    if (!post?.categories?.nodes) return 'others-news';
    
    const cats = post.categories.nodes.map(c => c.slug.toLowerCase());
    
    // Priority order: travel > job-education > good-news > others-news
    if (cats.some(c => c === 'travel' || c.includes('travel'))) return 'travel';
    if (cats.some(c => c === 'job-and-education' || c.includes('job') || c.includes('education'))) return 'job-education';
    if (cats.some(c => c === 'good-news' || c.includes('good'))) return 'good-news';
    if (cats.some(c => c === 'others-news' || c.includes('others'))) return 'others-news';
    
    return 'others-news';
  };

  // ✅ Step 2: Posts ko unki primary category ke hisaab se group karo
  const groupedPosts = {
    'travel': [],
    'job-education': [],
    'good-news': [],
    'others-news': []
  };

  // ✅ Step 3: Har post ko ek hi category mein daalo
  travelData.forEach(post => {
    const primaryCategory = getPrimaryCategory(post);
    if (groupedPosts[primaryCategory]) {
      groupedPosts[primaryCategory].push(post);
    }
  });

  // ✅ Step 4: Columns banao
  const columns = [
    { 
      key: 'travel', 
      label: '✈️ यात्रा', 
      data: groupedPosts.travel.slice(0, 3),
      slug: 'travel'
    },
    { 
      key: 'job-education', 
      label: '💼 जॉब एंड एजुकेशन', 
      data: groupedPosts['job-education'].slice(0, 3),
      slug: 'job-and-education'
    },
    { 
      key: 'good-news', 
      label: '🌟 गुड न्यूज', 
      data: groupedPosts['good-news'].slice(0, 3),
      slug: 'good-news'
    },
    { 
      key: 'others-news', 
      label: '⭐ स्पेशल', 
      data: groupedPosts['others-news'].slice(0, 3),
      slug: 'others-news'
    },
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      'travel': '✈️',
      'job-education': '💼',
      'good-news': '🌟',
      'others-news': '⭐'
    };
    return icons[category] || '📰';
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'travel': 'bg-blue-100 text-blue-700',
      'job-education': 'bg-purple-100 text-purple-700',
      'good-news': 'bg-green-100 text-green-700',
      'others-news': 'bg-yellow-100 text-yellow-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryLabel = (slug) => {
    const labels = {
      'travel': 'यात्रा',
      'job-education': 'जॉब एजुकेशन',
      'good-news': 'गुड न्यूज',
      'others-news': 'स्पेशल'
    };
    return labels[slug] || slug;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Header - Commented out kyunki duplicate hai */}
        {/* <div className="flex items-center justify-between border-b-2 border-blue-600 px-6 py-3">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <span>✈️</span> Travel
          </h2>
          <Link 
            href="/category/travel" 
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
          >
            और देखें <span>→</span>
          </Link>
        </div> */}

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {columns.map((column) => {
              const icon = getCategoryIcon(column.key);
              const badgeColor = getCategoryBadge(column.key);
              
              return (
                <div key={column.key} className="space-y-3">
                  <h3 className="font-bold text-lg border-b-2 border-gray-200 pb-2 flex items-center gap-2">
                    {column.label}
                  </h3>

                  {column.data.length > 0 ? (
                    column.data.map((post) => {
                      // ✅ Post ki primary category use karo
                      const category = getPrimaryCategory(post);
                      const postBadgeColor = getCategoryBadge(category);
                      const postIcon = getCategoryIcon(category);
                      
                      return (
                        <Link key={post.id} href={`/post/${post.slug}`} className="block group">
                          <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
                            <div className="relative w-full h-32 bg-gray-200">
                              {post.featuredImage?.node?.sourceUrl ? (
                                <Image
                                  src={post.featuredImage.node.sourceUrl}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <span className="text-3xl">{postIcon}</span>
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              {/* <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${postBadgeColor}`}>
                                {postIcon} {getCategoryLabel(category)}
                              </span> */}
                              <h4 className="text-sm font-semibold mt-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <span className="text-xs text-gray-400">
                                {new Date(post.date).toLocaleDateString('hi-IN', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <span className="text-3xl block mb-2">📭</span>
                      <p className="text-gray-400 text-sm">कोई पोस्ट नहीं</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}