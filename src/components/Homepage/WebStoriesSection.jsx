// components/Homepage/WebStoriesSection.jsx - ✅ Tech Section - Only Title, No Image

import Link from "next/link";
import Image from "next/image";
import WebStoriesSlider from "./WebStoriesSlider";
import RajyaSection from "./RajyaSection";
import WorldSection from "./WorldSection";
import { graphqlQuery, getPostsByCategory } from "@/lib/wordpress";
import SportsSection from "./SportsSection";
import ManoranjanSection from "./ManoranjanSection";
import DharmSection from "./DharmSection";

// components/Homepage/WebStoriesSection.jsx - ✅ Fixed Rajya Data Fetch

// ✅ Rajya Data Fetch Function - FIXED
async function getRajyaData() {
  try {
    const STATE_KEYWORDS = [
      'uttar-pradesh', 'bihar', 'delhi', 'uttarakhand', 'madhya-pradesh',
      'rajasthan', 'west-bengal', 'bengal', 'chhattisgarh', 'jharkhand',
      'maharashtra', 'gujarat', 'punjab', 'haryana', 'kerala', 'tamil-nadu',
      'karnataka', 'andhra-pradesh', 'telangana',
      'jammu-kashmir', 'himachal-pradesh', 'goa', 'assam', 'odisha'
    ];

    const STATE_ORDER = {
      'uttar-pradesh': 1,
      'bihar': 2,
      'delhi': 3,
      'madhya-pradesh': 4,
      'rajasthan': 5,
      'west-bengal': 6,
      'maharashtra': 7,
      'gujarat': 8,
      'punjab': 9,
      'haryana': 10,
    };

    // ✅ Fetch all categories
    const categoryQuery = `
      query GetStateCategories {
        categories(first: 100) {
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
    
    
    // ✅ Filter state categories - more flexible
    const stateCategories = allCategories.filter(cat => {
      // Direct match with STATE_KEYWORDS
      if (STATE_KEYWORDS.includes(cat.slug)) return true;
      
      // Check if name contains state indicators
      const name = cat.name?.toLowerCase() || '';
      if (name.includes('प्रदेश') || 
          name.includes('राज्य') || 
          name === 'दिल्ली' ||
          name === 'बिहार' ||
          name === 'उत्तराखंड' ||
          name === 'झारखंड' ||
          name === 'महाराष्ट्र' ||
          name === 'गुजरात' ||
          name === 'पंजाब' ||
          name === 'हरियाणा' ||
          name === 'केरल' ||
          name === 'कर्नाटक' ||
          name === 'तेलंगाना' ||
          name === 'जम्मू कश्मीर' ||
          name === 'हिमाचल प्रदेश' ||
          name === 'गोवा' ||
          name === 'असम' ||
          name === 'ओडिशा') {
        return true;
      }
      
      return false;
    });
    
    
    const sortedStates = stateCategories.sort((a, b) => {
      return (STATE_ORDER[a.slug] || 999) - (STATE_ORDER[b.slug] || 999);
    });
    
    // ✅ If still no states, try to get by direct category names
    let finalStates = sortedStates;
    if (finalStates.length === 0) {
      console.log('⚠️ No states found via filter, trying direct fetch...');
      
      // Try to fetch each state directly
      const directStatePromises = STATE_KEYWORDS.map(async (slug) => {
        try {
          const stateQuery = `
            query GetState {
              category(idType: SLUG, id: "${slug}") {
                id
                name
                slug
                count
              }
            }
          `;
          const response = await graphqlQuery(stateQuery);
          const state = response?.data?.category;
          if (state) {
            return state;
          }
          return null;
        } catch (e) {
          return null;
        }
      });
      
      const directStates = await Promise.all(directStatePromises);
      finalStates = directStates.filter(Boolean);
      
      // Sort
      finalStates = finalStates.sort((a, b) => {
        return (STATE_ORDER[a.slug] || 999) - (STATE_ORDER[b.slug] || 999);
      });
    }
    
    // ✅ Fetch posts for all states in parallel
    const statePromises = finalStates.map(async (state) => {
      try {
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
      } catch (error) {
        console.error(`Error fetching posts for ${state.slug}:`, error);
        return {
          state: state,
          posts: []
        };
      }
    });
    
    const results = await Promise.all(statePromises);
    
    // ✅ Build data object
    const allPostsData = {};
    results.forEach(({ state, posts }) => {
      allPostsData[state.slug] = posts;
    });
    
    
    return {
      states: finalStates,
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

async function getPodcastVideo() {
  try {
    const query = `
      query GetPodcast {
        posts(first: 1, where: { categoryName: "podcast" }) {
          nodes {
            id
            title
            slug
            content
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
    
    const response = await graphqlQuery(query);
    const podcastPosts = response?.data?.posts?.nodes || [];
    
    const processedPodcasts = podcastPosts.map(post => ({
      ...post,
      youtubeId: getYouTubeId(post.content)
    }));
    
    return processedPodcasts.filter(podcast => podcast.youtubeId);
  } catch (error) {
    console.error('Error fetching podcast:', error);
    return [];
  }
}


// ✅ Function to extract YouTube ID from content
const getYouTubeId = (content) => {
  if (!content) return null;
  
  const embedMatch = content.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  const youtuBeMatch = content.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) return youtuBeMatch[1];
  
  const watchMatch = content.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  return null;
};

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

// ✅ Fetch Video Posts - GraphQL Query
async function getVideoData() {
  try {
    const query = `
      query GetVideos {
        posts(first: 1, where: { categoryName: "Video" }) {
          nodes {
            id
            title
            slug
            content
            excerpt
            date
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
    
    const response = await graphqlQuery(query);
    const videoPosts = response?.data?.posts?.nodes || [];
    
    const processedVideos = videoPosts.map(post => ({
      ...post,
      youtubeId: getYouTubeId(post.content)
    }));
    
    return processedVideos.filter(video => video.youtubeId);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

// ✅ Fetch Tech News - Category slug "tech"
async function getTechNews() {
  try {
    return await getPostsByCategory("tech", 5);
  } catch (error) {
    console.error("❌ Error fetching tech news:", error);
    return [];
  }
}

async function getWorldData() {
  try {
    return await getPostsByCategory("world", 5);
  } catch (error) {
    console.error("❌ Error fetching world news:", error);
    return [];
  }
}

async function getSportsNews(){

  try{
    return await getPostsByCategory("sports", 5);

  }catch(error){
    console.error("Error fetching sports news", error)
    return [];
  }
}

async function getReligiousNews(){

  try{
    return await getPostsByCategory("religious", 5);

  }catch(error){
    console.error("Error fetching religious news", error)
    return [];
  }
}

async function getRasifalNews(){

  try{
    return await getPostsByCategory("rasifal", 5);

  }catch(error){
    console.error("Error fetching rasifal news", error)
    return [];
  }
}


async function getBusinessNews(){

  try{
    return await getPostsByCategory("business", 9);

  }catch(error){
    console.error("Error fetching business news", error)
    return [];
  }
}

async function getLifestyleNews(){

  try{
    return await getPostsByCategory("lifestyle", 4);

  }catch(error){
    console.error("Error fetching lifestyle news", error)
    return [];
  }
}


export default async function WebStoriesSection() {
  const stories = await getWebStories();
  const deshPosts = await getDeshNews();
  const explainerNews = await getExplainerNews();
  const crimeNews = await getCrimeNews();
  const videos = await getVideoData();
  const techNews = await getTechNews();
   const worldData = await getWorldData();
   const sportsData = await getSportsNews();
     const businessNews = await getBusinessNews();
  const lifestyleNews = await getLifestyleNews();
  const religiousNews = await getReligiousNews();
  const rasifalNews = await getRasifalNews();
  const podcastVideo = await getPodcastVideo()
  
  const { states, allPostsData } = await getRajyaData();

  if (!stories?.length && !deshPosts?.length) return null;

  // ✅ Get first video
  const videoPost = videos[0];
  const youtubeId = videoPost?.youtubeId || null;

    // ✅ Get first podcast
  const podcastPost = podcastVideo[0];
  const podcastYoutubeId = podcastPost?.youtubeId || null;

  return (
    <section className="container max-w-7xl mx-auto px-1 py-5 border-t border-gray-200">
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* LEFT COLUMN - 70% */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Web Stories Section */}
          {stories?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                  <h2 className="text-[20px] font-bold text-black">विजुअल स्टोरीज</h2>
                </div>
                <Link
                  href="/web-stories"
                  className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
                >
                  सभी देखें
                  <span className="group-hover:translate-x-1 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>

              <WebStoriesSlider stories={stories} />
            </div>
          )}

          {/* Desh Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                <h2 className="text-[20px] font-bold text-black">देश की खबरें</h2>
              </div>
              <Link
                href="/category/desh"
                className="text-red-600 text-sm font-semibold hover:text-red-700 transition flex items-center gap-1 group"
              >
                और भी
                <span className="group-hover:translate-x-1 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="space-y-5">

              {/* TOP SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* BIG NEWS */}
                {deshPosts[0] && (
                  <Link
                    href={`/post/${deshPosts[0].slug}`}
                    className="group block"
                  >
                    <div className="relative h-[250px] overflow-hidden">
                      <Image
                        src={
                          deshPosts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""
                        }
                        alt={deshPosts[0].title?.rendered || ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-[21px] font-bold">
                          {deshPosts[0].title?.rendered}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )}

                {/* RIGHT SIDE */}
                <div className="flex flex-col">
                  {deshPosts.slice(1, 3).map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/post/${post.slug}`}
                      className={`group ${
                        index === 0 ? "pb-4 border-b border-gray-200" : "pt-4"
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-[165px] h-[109px] shrink-0 overflow-hidden">
                          <Image
                            src={
                              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""
                            }
                            alt={post.title?.rendered || ""}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                        <h3 className="text-[17px] font-extrabold text-black group-hover:text-red-600">
                          {post.title?.rendered}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>

              {/* BOTTOM SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-gray-200 pt-5">
                {deshPosts.slice(3, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-[165px] h-[109px] shrink-0 overflow-hidden">
                        <Image
                          src={
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""
                          }
                          alt={post.title?.rendered || ""}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                      <h3 className="text-[18px] leading-7 font-bold text-black group-hover:text-red-600">
                        {post.title?.rendered}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>

          {/* RajyaSection */}
          <RajyaSection states={states} allPostsData={allPostsData} />

              <WorldSection worldData={worldData} />

              <SportsSection  sportsData={sportsData}/>

                <ManoranjanSection />

                <DharmSection religiousData={religiousNews}
                  rasifalData={rasifalNews}
                 />
                

          
        </div>

        {/* RIGHT COLUMN - 30% - Explainer + Crime + Video + Tech */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4">

            {/* Explainer Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                  <h3 className="text-lg font-bold text-gray-900">एक्सप्लेनर</h3>
                </div>
                <Link
                  href="/category/explainer"
                  className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group"
                >
                  और भी
                  <span className="group-hover:translate-x-1 transition">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>

              {explainerNews?.length > 0 && (
                <Link href={`/post/${explainerNews[0].slug}`} className="group block mb-3">
                  <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                    <Image
                      src={explainerNews[0].featuredImage?.node?.sourceUrl || ""}
                      alt={explainerNews[0].title || "Explainer"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-sm font-bold text-white line-clamp-2">
                        {explainerNews[0].title}
                      </h4>
                    </div>
                  </div>
                </Link>
              )}

              <div className="space-y-2">
                {explainerNews?.slice(1, 3).map((item) => (
                  <Link key={item.id} href={`/post/${item.slug}`} className="block group">
                    <div className="flex gap-3 hover:bg-gray-50 p-2 transition-colors border-b border-gray-300 py-4">
                      {item.featuredImage?.node?.sourceUrl && (
                        <div className="flex-shrink-0 w-28 h-16 overflow-hidden bg-gray-100">
                          <Image
                            src={item.featuredImage.node.sourceUrl}
                            alt={item.title}
                            width={80}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-3">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Crime Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                  <h3 className="text-lg font-bold text-gray-900">क्राइम</h3>
                </div>
                <Link
                  href="/category/crime"
                  className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group"
                >
                  और भी
                  <span className="group-hover:translate-x-1 transition">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>

              {crimeNews?.length > 0 && (
                <Link href={`/post/${crimeNews[0].slug}`} className="group block mb-3">
                  <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                    <Image
                      src={crimeNews[0].featuredImage?.node?.sourceUrl || ""}
                      alt={crimeNews[0].title || "Crime"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-sm font-bold text-white line-clamp-2">
                        {crimeNews[0].title}
                      </h4>
                    </div>
                  </div>
                </Link>
              )}

              <div className="space-y-2">
                {crimeNews?.slice(1, 4).map((item) => (
                  <Link key={item.id} href={`/post/${item.slug}`} className="block group">
                    <div className="flex gap-3 hover:bg-gray-50 p-2 transition-colors border-b border-gray-300 py-4">
                      {item.featuredImage?.node?.sourceUrl && (
                        <div className="flex-shrink-0 w-28 h-16 overflow-hidden bg-gray-100">
                          <Image
                            src={item.featuredImage.node.sourceUrl}
                            alt={item.title}
                            width={80}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-3">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ✅ Video Section - Only Video Player */}
            {youtubeId && (
              <div className="mt-2 mb-4">
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Latest Video"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* ✅ Tech Section - Only Title, No Image */}
            {techNews?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2 mt-8 pb-1 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">टेक्नोलॉजी</h3>
                  </div>
                  <Link
                    href="/category/tech"
                    className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-0.5 group"
                  >
                    और भी
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </Link>
                </div>

                <div className="space-y-2">
                  {techNews.slice(0, 5).map((item) => (
                    <Link key={item.id} href={`/post/${item.slug}`} className="block group">
                      <div className="hover:bg-gray-50 p-2  border-b border-gray-300 transition-colors">
                        <h4 className="text-[16px] font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-2">
                          {item.title}
                        </h4>
                        
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}


            <div className="mt-2">
  <Image
    src="/newsletter_website.png"
    alt="Newsletter"
    width={500}
    height={400}
    className="w-full h-auto rounded-lg"
    unoptimized
  />
</div>
 {businessNews?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">बिजनेस</h3>
                  </div>
                  <Link
                    href="/category/business"
                    className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group"
                  >
                    और भी
                    <span className="group-hover:translate-x-1 transition">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {businessNews[0] && (
                  <Link href={`/post/${businessNews[0].slug}`} className="group block mb-3">
                    <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                      <Image
                        src={businessNews[0].featuredImage?.node?.sourceUrl || ""}
                        alt={businessNews[0].title || "Business"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-sm font-bold text-white line-clamp-2">
                          {businessNews[0].title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="space-y-2">
                  {businessNews.slice(1, 5).map((item) => (
                    <Link key={item.id} href={`/post/${item.slug}`} className="block group">
                      <div className="flex gap-3 hover:bg-gray-50 p-2 transition-colors border-b border-gray-300 py-4">
                        {item.featuredImage?.node?.sourceUrl && (
                          <div className="flex-shrink-0 w-28 h-16 overflow-hidden bg-gray-100">
                            <Image
                              src={item.featuredImage.node.sourceUrl}
                              alt={item.title}
                              width={80}
                              height={64}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-3">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Lifestyle Section - Same as Crime Section Design */}
            {lifestyleNews?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">लाइफस्टाइल</h3>
                  </div>
                  <Link
                    href="/category/lifestyle"
                    className="text-red-600 text-xs font-semibold hover:text-red-700 transition flex items-center gap-1 group"
                  >
                    और भी
                    <span className="group-hover:translate-x-1 transition">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {lifestyleNews[0] && (
                  <Link href={`/post/${lifestyleNews[0].slug}`} className="group block mb-3">
                    <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
                      <Image
                        src={lifestyleNews[0].featuredImage?.node?.sourceUrl || ""}
                        alt={lifestyleNews[0].title || "Lifestyle"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-sm font-bold text-white line-clamp-2">
                          {lifestyleNews[0].title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="space-y-2">
                  {lifestyleNews.slice(1, 4).map((item) => (
                    <Link key={item.id} href={`/post/${item.slug}`} className="block group">
                      <div className="flex gap-3 hover:bg-gray-50 p-2 transition-colors border-b border-gray-300 py-4">
                        {item.featuredImage?.node?.sourceUrl && (
                          <div className="flex-shrink-0 w-28 h-16 overflow-hidden bg-gray-100">
                            <Image
                              src={item.featuredImage.node.sourceUrl}
                              alt={item.title}
                              width={80}
                              height={64}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition line-clamp-3">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}


             {/* ✅ Podcast Video Section - ADDED HERE */}
            {podcastYoutubeId && (
              <div className="mt-2 mb-4">
                {/* <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-gray-800">पॉडकास्ट</h4>
                </div> */}
                <div className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${podcastYoutubeId}?autoplay=0&controls=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Latest Podcast"
                    loading="lazy"
                  />
                </div>
              </div>
            )}


          </div>
        </div>

      </div>
    </section>
  );
}