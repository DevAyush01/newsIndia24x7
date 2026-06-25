// components/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, Search } from 'lucide-react';

export default function Header({ categories = [] }) {
  const [currentDate, setCurrentDate] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

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

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchOpen]);

  // ✅ Hover handlers for dropdown
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowStateDropdown(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowStateDropdown(false);
    }, 200);
  };

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

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const res = await fetch('/api/search?q=' + encodeURIComponent(query));
      const data = await res.json();
      setSearchResults(data.posts || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar - Aaj Tak Style */}
        <div className="bg-gradient-to-r from-red-700 to-red-600">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-1">
              <div className="text-[11px] text-white/90 font-medium">
                {currentDate}
              </div>
              <div className="hidden md:flex items-center gap-5">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2 inline-block mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  LIVE TV
                </span>
                <span className="w-px h-4 bg-white/30"></span>
                {topCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="text-[11px] text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-[72px]">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12 md:w-14 md:h-14">
                  <Image 
                    src="/news-indiaLogo.webp" 
                    alt="News India 24x7"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex items-center gap-1">
                  {/* Home Link */}
                  <li>
                    <Link 
                      href="/"
                      className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 block ${
                        pathname === '/' 
                          ? 'text-red-600 border-red-600' 
                          : 'text-gray-700 border-transparent hover:text-red-600 hover:border-red-300'
                      }`}
                    >
                      होम
                    </Link>
                  </li>

                  {mainMenuCategories.map((category) => {
                    const isActive = pathname === `/category/${category.slug}`;
                    
                    if (category.name === 'State' || category.name === 'राज्य') {
                      return (
                        <li 
                          key={category.slug} 
                          className="relative" 
                          ref={dropdownRef}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <button
                            className={`px-3 py-2 text-sm font-semibold transition-colors inline-flex items-center gap-1 border-b-2 ${
                              isActive || showStateDropdown 
                                ? 'text-red-600 border-red-600' 
                                : 'text-gray-700 border-transparent hover:text-red-600 hover:border-red-300'
                            }`}
                          >
                            राज्य
                            <ChevronDown size={14} className={`transition-transform duration-200 ${showStateDropdown ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {showStateDropdown && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-80 bg-white shadow-xl border rounded-b-xl z-[100] max-h-96 overflow-y-auto">
                              <div className="p-4">
                                {/* <Link
                                  href={`/category/${category.slug}`}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition"
                                  onClick={() => setShowStateDropdown(false)}
                                >
                                  🌏 सभी राज्य समाचार
                                </Link> */}
                                {/* <div className="border-t my-2"></div> */}
                                <div className="grid grid-cols-2 gap-1">
                                  {stateCategories.map((state) => (
                                    <Link
                                      key={state.slug}
                                      href={`/category/${state.slug}`}
                                      className="block px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
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
                          className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 block ${
                            isActive 
                              ? 'text-red-600 border-red-600' 
                              : 'text-gray-700 border-transparent hover:text-red-600 hover:border-red-300'
                          }`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Right Side - Search */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto" ref={mobileMenuRef}>
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-1">
                <Link
                  href="/"
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg
                    ${pathname === '/' ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  होम
                </Link>

                {mainMenuCategories.map((category) => {
                  const isActive = pathname === `/category/${category.slug}`;
                  
                  if (category.name === 'State' || category.name === 'राज्य') {
                    return (
                      <div key={category.slug}>
                        <button
                          onClick={() => setShowStateDropdown(!showStateDropdown)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg flex items-center justify-between
                            ${isActive || showStateDropdown ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-50'}
                          `}
                        >
                          राज्य
                          <ChevronDown size={16} className={`transition-transform ${showStateDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showStateDropdown && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                            <Link
                              href={`/category/${category.slug}`}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              onClick={() => {
                                setShowStateDropdown(false);
                                setMobileMenuOpen(false);
                              }}
                            >
                              सभी राज्य समाचार
                            </Link>
                            {stateCategories.map((state) => (
                              <Link
                                key={state.slug}
                                href={`/category/${state.slug}`}
                                className="block px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                onClick={() => {
                                  setShowStateDropdown(false);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {state.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-lg
                        ${isActive ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-50'}
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  );
                })}
                
                <div className="border-t border-gray-200 my-3 pt-3">
                  {topCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-500 hover:text-red-600 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Full Screen Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-start justify-center pt-20 md:pt-32">
          <div className="w-full max-w-3xl mx-4">
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute cursor-pointer top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="खोजें... (Search)"
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-red-500 text-white text-2xl md:text-4xl font-light py-4 px-2 outline-none transition-colors placeholder:text-white/30"
                autoFocus
              />
              <button
                type="submit"
                className="absolute cursor-pointer right-2 bottom-4 text-white/40 hover:text-white transition-colors"
              >
                <Search size={28} />
              </button>
            </form>

            {searchQuery.length >= 2 && (
              <div className="mt-8 max-h-[50vh] overflow-y-auto">
                {searchLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    {searchResults.map((post) => (
                      <Link
                        key={post.id}
                        href={`/post/${post.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="block group"
                      >
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors">
                          {post.featuredImage?.node?.sourceUrl && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-white text-lg font-medium group-hover:text-red-400 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <span className="text-white/40 text-sm">
                              {new Date(post.date).toLocaleDateString('hi-IN')}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/40 text-lg">
                    कोई परिणाम नहीं मिला
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}