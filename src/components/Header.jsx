// components/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function Header({ categories = [] }) {
  const [currentDate, setCurrentDate] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('hi-IN', options));

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stateCategoryNames = [
    'उत्तर प्रदेश', 'दिल्ली/NCR', 'बिहार', 'महाराष्ट्र', 
    'राजस्थान', 'मध्य प्रदेश', 'गुजरात', 'पंजाब', 
    'हरियाणा', 'उत्तराखंड', 'हिमाचल प्रदेश', 'झारखंड',
    'छत्तीसगढ़', 'पश्चिम बंगाल', 'ओडिशा', 'केरल', 
    'तमिलनाडु', 'कर्नाटक', 'तेलंगाना', 'जम्मू कश्मीर'
  ];

  const stateCategories = categories
    .filter(cat => stateCategoryNames.includes(cat.name))
    .map(cat => ({ name: cat.name, slug: cat.slug }));

  const topBarCategories = ['पॉडकास्ट', 'वीडियो', 'Explainer', 'शैक्षिक'];
  const topCategories = categories.filter(cat => topBarCategories.includes(cat.name));

  const mainMenuOrder = ['State', 'दुनिया', 'राजनीति', 'क्राइम', 'मनोरंजन', 'खेल', 'लाइफस्टाइल', 'व्यापार'];
  const mainMenuCategories = mainMenuOrder
    .map(orderName => categories.find(cat => cat?.name === orderName))
    .filter(Boolean);

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="text-xs text-gray-600">
              {currentDate}
            </div>
            <div className="flex gap-4">
              {topCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="text-xs text-gray-600 hover:text-red-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Blue Background with Centered Logo */}
      <div className="bg-blue-800">
        <div className="container mx-auto px-4 flex items-center justify-start ">
          {/* Logo Section - Center */}
          <div className="flex justify-center py-3">
            <Link 
              href="/" 
              className="bg-white rounded-full p-2 shadow-md inline-block"
            >
              <Image 
                src="/news-indiaLogo.webp" 
                alt="News Divas"
                width={65}
                height={65}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu - Center */}
          <nav className="pb-3">
            <div className="overflow-x-auto scrollbar-hide">
              <ul className="flex gap-6 min-w-max justify-center">
                {mainMenuCategories.map((category) => {
                  const isActive = pathname === `/category/${category.slug}`;
                  
                  if (category.name === 'State' || category.name === 'राज्य') {
                    return (
                      <li key={category.slug} className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setShowStateDropdown(!showStateDropdown)}
                          className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap inline-flex items-center gap-1
                            ${isActive || showStateDropdown ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}
                          `}
                        >
                          {category.name === 'State' ? 'राज्य' : category.name}
                          <ChevronDown size={14} className={`transition-transform ${showStateDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showStateDropdown && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white shadow-xl border rounded-lg z-[100] max-h-96 overflow-y-auto">
                            <div className="p-3">
                              <Link
                                href={`/category/${category.slug}`}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded font-medium"
                                onClick={() => setShowStateDropdown(false)}
                              >
                                सभी राज्य समाचार
                              </Link>
                              <div className="border-t my-2"></div>
                              <div className="grid grid-cols-2 gap-1">
                                {stateCategories.map((state) => (
                                  <Link
                                    key={state.slug}
                                    href={`/category/${state.slug}`}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded"
                                    onClick={() => setShowStateDropdown(false)}
                                  >
                                    {state.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }
                  
                  return (
                    <li key={category.slug}>
                      <Link 
                        href={`/category/${category.slug}`}
                        className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap inline-block
                          ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white hover:text-yellow-400'}
                        `}
                      >
                        {category.name === 'State' ? 'राज्य' : category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}