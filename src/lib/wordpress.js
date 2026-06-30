
// 22-06-2026


// import axios from 'axios';

// const WPGRAPHQL_URL = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || 'https://newsindia24x7.com/graphql';

// export async function getHeaderCategories() {
//   try {
//     const response = await axios.post(WPGRAPHQL_URL, {
//       query: `
//         query GetHeaderCategories {
//           categories(first: 100) {
//             nodes {
//               name
//               slug
//               count
//             }
//           }
//         }
//       `
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     return response.data?.data?.categories?.nodes || [];
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return [];
//   }
// }


// export async function graphqlQuery(query, variables = {}) {
//   try {
//     const response = await axios.post(WPGRAPHQL_URL, {
//       query,
//       variables
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.error('GraphQL Error:', error);
//     throw error;
//   }
// } 

// export async function getHomeTopSection() {
//   const query = `
//     query HomeTopSection {
//       hero: posts(first: 1) {
//         nodes {
//           id
//           title
//           slug
//           excerpt
//           date
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }

//       latest: posts(
//         first: 8
//         where: { categoryName: "News Latest" }
//       ) {
//         nodes {
//           id
//           title
//           slug
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }

//       featured: posts(
//         first: 6
//         where: { categoryName: "News Featured" }
//       ) {
//         nodes {
//           id
//           title
//           slug
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//   `;

//   const res = await fetch(WPGRAPHQL_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//     next: { revalidate: 60 },
//   });

//   const data = await res.json();

//   return {
//     hero: data?.data?.hero?.nodes?.[0],
//     latest: data?.data?.latest?.nodes || [],
//     featured: data?.data?.featured?.nodes || [],
//   };
// }

// 22-06-2026

// lib/wpapi.js

import axios from 'axios';

const WPGRAPHQL_URL = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || 'https://newsindia24x7.com/graphql';

// ✅ EXISTING FUNCTIONS (as they are)
export async function getHeaderCategories() {
  try {
    const response = await axios.post(WPGRAPHQL_URL, {
      query: `
        query GetHeaderCategories {
          categories(first: 100) {
            nodes {
              name
              slug
              count
            }
          }
        }
      `
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data?.data?.categories?.nodes || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function graphqlQuery(query, variables = {}) {
  try {
    const response = await axios.post(WPGRAPHQL_URL, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}

export async function getHomeTopSection() {
  const query = `
    query HomeTopSection {
      hero: posts(first: 1) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }

      latest: posts(
        first: 8
        where: { categoryName: "News Latest" }
      ) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }

      featured: posts(
        first: 6
        where: { categoryName: "News Featured" }
      ) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const res = await fetch(WPGRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return {
    hero: data?.data?.hero?.nodes?.[0],
    latest: data?.data?.latest?.nodes || [],
    featured: data?.data?.featured?.nodes || [],
  };
}

// ✅ DYNAMIC FUNCTION - Kisi bhi category se data lao
export async function getPostsByCategory(categorySlug, limit = 10) {
  const query = `
    query GetPostsByCategory {
      posts(first: ${limit}, where: { categoryName: "${categorySlug}" }) {
        nodes {
          id
          title
          slug
          excerpt
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

  try {
    const res = await fetch(WPGRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    return data?.data?.posts?.nodes || [];
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

// ✅ SPECIFIC FUNCTIONS (using the dynamic one)
export async function getSportsPosts(limit = 9) {
  return getPostsByCategory('sports', limit);
}

export async function getReligiousPosts(limit = 5) {
  return getPostsByCategory('religious', limit);
}

export async function getRasifalPosts(limit = 6) {
  return getPostsByCategory('rasifal', limit);
}

export async function getTravelPosts(limit = 9) {
  const query = `
    query GetTravelPosts {
      posts(first: ${limit}, where: { categoryName: "travel" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(WPGRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    return data?.data?.posts?.nodes || [];
  } catch (error) {
    console.error('Error fetching travel posts:', error);
    return [];
  }
}




export async function getAllHomepageData() {
  const query = `
    query GetAllHomepageData {
      allLatest: posts(first: 6) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      sports: posts(first: 9, where: { categoryName: "sports" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      religious: posts(first: 5, where: { categoryName: "religious" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      rasifal: posts(first: 6, where: { categoryName: "rasifal" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      travel: posts(first: 9, where: { categoryName: "travel" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      jobEducation: posts(first: 9, where: { categoryName: "job-and-education" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      goodNews: posts(first: 9, where: { categoryName: "good-news" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      othersNews: posts(first: 9, where: { categoryName: "others-news" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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
      world: posts(first: 5, where: { categoryName: "world" }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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

  try {
    // ✅ OPTION 1: Direct fetch with proper headers
    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        query: query  // ✅ Ensure query is sent
      }),
      next: { revalidate: 60 },
    });

    // ✅ Check if response is ok
    if (!response.ok) {
      console.error('❌ Response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // ✅ Check for GraphQL errors
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return {
        allLatest: [],
        sports: [],
        religious: [],
        rasifal: [],
        travel: [],
        jobEducation: [],
        goodNews: [],
        othersNews: [],
        world: [],
      };
    }

    // ✅ Debug logs
    console.log('📊 allLatest:', data?.data?.allLatest?.nodes?.length || 0);
    console.log('📊 sports:', data?.data?.sports?.nodes?.length || 0);
    console.log('📊 religious:', data?.data?.religious?.nodes?.length || 0);
    console.log('📊 rasifal:', data?.data?.rasifal?.nodes?.length || 0);
    console.log('📊 travel:', data?.data?.travel?.nodes?.length || 0);
    console.log('📊 jobEducation:', data?.data?.jobEducation?.nodes?.length || 0);
    console.log('📊 goodNews:', data?.data?.goodNews?.nodes?.length || 0);
    console.log('📊 othersNews:', data?.data?.othersNews?.nodes?.length || 0);
    console.log('📊 world:', data?.data?.world?.nodes?.length || 0);

    return {
      allLatest: data?.data?.allLatest?.nodes || [],
      sports: data?.data?.sports?.nodes || [],
      religious: data?.data?.religious?.nodes || [],
      rasifal: data?.data?.rasifal?.nodes || [],
      travel: data?.data?.travel?.nodes || [],
      jobEducation: data?.data?.jobEducation?.nodes || [],
      goodNews: data?.data?.goodNews?.nodes || [],
      othersNews: data?.data?.othersNews?.nodes || [],
      world: data?.data?.world?.nodes || [],
    };
  } catch (error) {
    console.error('❌ Error fetching all homepage data:', error);
    return {
      allLatest: [],
      sports: [],
      religious: [],
      rasifal: [],
      travel: [],
      jobEducation: [],
      goodNews: [],
      othersNews: [],
      world: [],
    };
  }
}






// lib/wordpress.js - ✅ Add this function

export async function getLatestPosts(limit = 8) {
  const query = `
    query GetLatestPosts {
      posts(first: ${limit}, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return [];
    }

    return data?.data?.posts?.nodes || [];
  } catch (error) {
    console.error('❌ Error fetching latest posts:', error);
    return [];
  }
}


// lib/wordpress.js - ✅ FIXED: Cursor-based pagination

export async function getCategoryData(slug, first = 15, after = null) {
  const query = `
    query GetCategoryData($slug: String!, $first: Int!, $after: String) {
      categories(where: { search: $slug }) {
        nodes {
          id
          name
          slug
          description
          count
        }
      }
      
      posts(
        first: $first
        after: $after
        where: {
          categoryName: $slug
        }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
      
      latestPosts: posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
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

  try {
    const res = await fetch(WPGRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          slug,
          first,
          after,
        },
      }),
      next: { revalidate: 60 },
    });

    const json = await res.json();

    if (json.errors) {
      console.error('❌ GraphQL Errors:', json.errors);
      return {
        category: null,
        posts: [],
        pageInfo: { hasNextPage: false, endCursor: null },
        latestPosts: [],
        totalCount: 0,
      };
    }

    const totalCount = json?.data?.categories?.nodes?.[0]?.count || 0;

    return {
      category: json?.data?.categories?.nodes?.[0] || null,
      posts: json?.data?.posts?.nodes || [],
      pageInfo: json?.data?.posts?.pageInfo || { hasNextPage: false, endCursor: null },
      latestPosts: json?.data?.latestPosts?.nodes || [],
      totalCount: totalCount,
    };
  } catch (error) {
    console.error('❌ Error fetching category data:', error);
    return {
      category: null,
      posts: [],
      pageInfo: { hasNextPage: false, endCursor: null },
      latestPosts: [],
      totalCount: 0,
    };
  }
}


// lib/wordpress.js - ✅ FINAL FIXED VERSION

export async function getPostData(slug) {
  try {
    // ✅ Option 1: Exact slug match
    let res = await fetch(`https://newsindia24x7.tv/wp-json/wp/v2/posts?slug=${slug}&_embed=true`, {
      next: { revalidate: 60 }
    });
    
    let posts = await res.json();
    
    if (posts && posts.length > 0) {
      console.log('✅ Post found via exact slug:', posts[0].title.rendered);
      return convertPostData(posts[0]);
    }
    
    console.log('❌ Not found via exact slug, trying fallback...');
    
    // ✅ Option 2: Fallback - Search all posts and filter
    const allRes = await fetch('https://newsindia24x7.tv/wp-json/wp/v2/posts?per_page=100&_embed=true', {
      next: { revalidate: 60 }
    });
    const allPosts = await allRes.json();
    
    // ✅ Find post where slug matches or contains the slug
    const foundPost = allPosts.find(post => 
      post.slug === slug || 
      post.slug.includes(slug) || 
      slug.includes(post.slug)
    );
    
    if (foundPost) {
      console.log('✅ Post found via fallback search:', foundPost.title.rendered);
      return convertPostData(foundPost);
    }
    
    console.log('❌ Post not found anywhere for slug:', slug);
    return null;
    
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return null;
  }
}

// ✅ Helper function to convert REST API to GraphQL format
function convertPostData(post) {
  return {
    id: post.id,
    title: post.title?.rendered || 'No Title',
    slug: post.slug,
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    date: post.date,
    modified: post.modified,
    categories: {
      nodes: post._embedded?.['wp:term']?.[0]?.map(cat => ({
        name: cat.name,
        slug: cat.slug
      })) || []
    },
    featuredImage: {
      node: {
        sourceUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      }
    },
    author: {
      node: {
        name: post._embedded?.author?.[0]?.name || 'Unknown'
      }
    }
  };
}

// lib/wordpress.js - ✅ FIXED getRelatedPosts

// ✅ GET RELATED POSTS (same category) - WITHOUT exclude
export async function getRelatedPosts(categorySlug, postId, limit = 6) {
  const query = `
    query GetRelatedPosts($categorySlug: String!, $limit: Int!) {
      posts(
        first: $limit
        where: { 
          categoryName: $categorySlug
        }
      ) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
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

  try {
    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { categorySlug, limit }
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status);
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return [];
    }

    // ✅ Filter out current post manually
    const posts = data?.data?.posts?.nodes || [];
    return posts.filter(post => post.id !== postId);
  } catch (error) {
    console.error('❌ Error fetching related posts:', error);
    return [];
  }
}

export async function getTagData(slug, perPage = 12) {
  try {
    // ✅ Step 1: Get tag ID from slug
    const tagRes = await fetch(
      `https://newsindia24x7.tv/wp-json/wp/v2/tags?slug=${slug}`,
      { next: { revalidate: 60 } }
    );
    const tags = await tagRes.json();
    const tag = tags?.[0] || null;
    
    if (!tag) {
      return { tag: null, posts: [], totalCount: 0 };
    }

    // ✅ Step 2: Get posts with this tag
    const postsRes = await fetch(
      `https://newsindia24x7.tv/wp-json/wp/v2/posts?tags=${tag.id}&_embed=true&per_page=${perPage}`,
      { next: { revalidate: 60 } }
    );
    const posts = await postsRes.json();

    // ✅ Step 3: Get total count
    const totalCount = posts.length || 0;

    return {
      tag: tag,
      posts: posts || [],
      totalCount: totalCount,
    };
  } catch (error) {
    console.error('❌ Error fetching tag data:', error);
    return { tag: null, posts: [], totalCount: 0 };
  }
}


export async function getTrendingTags(limit = 20) {
  const query = `
    query GetTrendingTags {
      tags(first: ${limit}, where: {orderby: COUNT, order: DESC}) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `;

  try {
    // ✅ Use fetch with proper URL
    const response = await fetch(process.env.NEXT_PUBLIC_WPGRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    return data?.data?.tags?.nodes || [];
  } catch (error) {
    console.error('❌ Error fetching trending tags:', error);
    return [];
  }
}




// lib/wordpress.js - ✅ getBreakingNews

export async function getBreakingNews(limit = 10) {
  const query = `
    query GetBreakingNews {
      posts(
        first: ${limit},
        where: {
          categoryName: "breaking",
          orderby: { field: DATE, order: DESC }
        }
      ) {
        nodes {
          id
          title
          slug
          date
          excerpt
        }
      }
    }
  `;

  try {
    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return [];
    }

    let posts = data?.data?.posts?.nodes || [];

    if (posts.length === 0) {
      console.log('⚠️ No breaking-news found, fetching latest posts...');
      return await getLatestPosts(limit);
    }

    return posts;
  } catch (error) {
    console.error('❌ Error fetching breaking news:', error);
    return await getLatestPosts(limit);
  }
}

// ✅ Fallback function - Latest posts fetch karega
// async function getLatestPosts(limit = 10) {
//   const query = `
//     query GetLatestPosts {
//       posts(first: ${limit}, where: { orderby: { field: DATE, order: DESC } }) {
//         nodes {
//           id
//           title
//           slug
//           date
//           excerpt
//         }
//       }
//     }
//   `;

//   try {
//     const response = await fetch(WPGRAPHQL_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query }),
//       next: { revalidate: 60 },
//     });

//     const data = await response.json();
//     return data?.data?.posts?.nodes || [];
//   } catch (error) {
//     console.error('❌ Error fetching latest posts:', error);
//     return [];
//   }
// }