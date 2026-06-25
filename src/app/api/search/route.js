// app/api/search/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [] });
  }

  try {
    const WPGRAPHQL_URL = process.env.NEXT_PUBLIC_WPGRAPHQL_URL || 'https://newsindia24x7.tv/graphql';

    const graphqlQuery = `
      query SearchPosts($search: String!) {
        posts(first: 10, where: { search: $search }) {
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

    const response = await fetch(WPGRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { search: query }
      }),
    });

    const data = await response.json();
    return NextResponse.json({ posts: data?.data?.posts?.nodes || [] });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ posts: [] });
  }
}