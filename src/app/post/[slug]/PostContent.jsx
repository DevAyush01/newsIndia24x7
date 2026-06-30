// app/post/[slug]/PostContent.jsx
// ✅ Client Component

'use client';

import { useState } from 'react';

export default function PostContent({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6">
      <div 
        className="prose prose-lg max-w-none text-gray-800 leading-relaxed 
          [&>p]:leading-8 [&>p]:mb-5 
          [&>h1]:font-bold [&>h1]:text-3xl [&>h1]:mt-8 [&>h1]:mb-4
          [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 
          [&>h3]:font-bold [&>h3]:text-xl [&>h3]:mt-6 [&>h3]:mb-3 
          [&>h4]:font-bold [&>h4]:text-lg [&>h4]:mt-5 [&>h4]:mb-3
          [&>h5]:font-bold [&>h5]:text-base [&>h5]:mt-4 [&>h5]:mb-2
          [&>h6]:font-bold [&>h6]:text-sm [&>h6]:mt-3 [&>h6]:mb-2
          [&>ul]:my-4 [&>ol]:my-4 [&>li]:mb-2 
          [&>strong]:font-bold [&>b]:font-bold
          overflow-hidden transition-all duration-300"
        style={{ maxHeight: isExpanded ? 'none' : '400px' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {!isExpanded && (
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      )}

      <div className="text-center mt-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
        >
          {isExpanded ? 'कम पढ़ें ↑' : 'और पढ़ें ↓'}
        </button>
      </div>
    </div>
  );
}