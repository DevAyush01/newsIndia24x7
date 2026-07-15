// app/superfast/page.jsx
import React from 'react';
import { getPostsByCategory } from "@/lib/wordpress";
import SuperfastSlider from '@/components/Homepage/SuperfastSlider';

export default async function SuperfastPage({ searchParams }) {
    const params = await searchParams;
    const posts = await getPostsByCategory("", 20);
    const postSlug = params?.post || null;
    
    return (
        <SuperfastSlider posts={posts} initialSlug={postSlug} />
    );
}