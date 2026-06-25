// components/BreakingNewsTicker.jsx - ✅ Server Component (No styled-jsx)

import React from 'react';
import Link from 'next/link';
import { getBreakingNews } from '@/lib/wordpress';

export default async function BreakingSectionTop() {
  const breakingNews = await getBreakingNews(10);

  if (!breakingNews || breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white border-b border-red-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12">
          {/* Breaking Label */}
          <div className="flex items-center gap-2 shrink-0 bg-red-600 px-4 py-1.5 rounded-full shadow-md mr-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-bold text-sm tracking-wider">BREAKING NEWS</span>
          </div>

          {/* ✅ Marquee Slider - CSS inline */}
          <div className="relative flex-1 overflow-hidden h-full">
            <div 
              className="whitespace-nowrap inline-flex items-center h-full"
              style={{
                animation: 'marquee 30s linear infinite',
                width: 'max-content'
              }}
            >
              {breakingNews.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Link
                    href={`/post/${item.slug}`}
                    className="inline-flex items-center gap-2 mx-4 text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {index < 2 && (
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    )}
                    <span className="font-medium">{item.title}</span>
                    {index === 0 && (
                      <span className="inline-block bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 animate-pulse">
                        NEW
                      </span>
                    )}
                  </Link>
                  {index < breakingNews.length - 1 && (
                    <span className="text-red-300 text-lg mx-1">✦</span>
                  )}
                </React.Fragment>
              ))}
              
              {/* Duplicate for seamless loop */}
              {breakingNews.map((item, index) => (
                <React.Fragment key={`dup-${item.id}`}>
                  <Link
                    href={`/post/${item.slug}`}
                    className="inline-flex items-center gap-2 mx-4 text-sm hover:text-yellow-300 transition-colors duration-200"
                  >
                    {index < 2 && (
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                    )}
                    <span className="font-medium">{item.title}</span>
                    {index === 0 && (
                      <span className="inline-block bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
                        NEW
                      </span>
                    )}
                  </Link>
                  <span className="text-red-300 text-lg mx-1">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Live Time */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-4 bg-red-800/50 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono">
              LIVE • {new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Global CSS - style tag */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}