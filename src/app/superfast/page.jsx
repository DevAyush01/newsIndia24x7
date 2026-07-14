import React from 'react'
import { getPostsByCategory } from "@/lib/wordpress";
import LatestPostsSlider from '@/components/Homepage/LatestPostsSlider';

export default async function page() {
    const posts = await getPostsByCategory("", 10);
  return (
     <main className="min-h-screen bg-gray-50">
       <LatestPostsSlider posts={posts} />
  </main>
  )
}
