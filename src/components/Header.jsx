// components/Header.jsx - Fixed Notification Dropdown

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, Search, Bell, Tv } from 'lucide-react';

export default function Header({ categories = [] }) {
  const [currentDate, setCurrentDate] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationLoaded, setIsNotificationLoaded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const notificationRef = useRef(null);

  // ✅ Notification fetch
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          'https://newsindia24x7.tv/wp-json/wp/v2/posts?per_page=20&_embed=true&orderby=date&order=desc'
        );
        
        const posts = await res.json();
        
        if (posts && posts.length > 0) {
          const formattedPosts = posts.map(post => ({
            id: post.id,
            title: post.title?.rendered || 'No Title',
            slug: post.slug,
            date: post.date,
            featuredImage: {
              node: {
                sourceUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
              }
            }
          }));
          setNotifications(formattedPosts);
          setUnreadCount(formattedPosts.length);
        }
        setIsNotificationLoaded(true);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setIsNotificationLoaded(true);
      }
    };

    fetchNotifications();
  }, []);

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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
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

  const topBarLinks = [
    { name: 'पॉडकास्ट', href: '/podcasts' },
    { name: 'वीडियो', href: '/videos' },
    { name: 'Explainer', href: '/category/explainer' },
  ];

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

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
    if (!notificationOpen) {
      setUnreadCount(0);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'अभी';
    if (diffMins < 60) return `${diffMins} मिनट पहले`;
    if (diffHours < 24) return `${diffHours} घंटे पहले`;
    if (diffDays < 7) return `${diffDays} दिन पहले`;
    return postDate.toLocaleDateString('hi-IN');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-red-700 to-red-600">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-1">
              <div className="text-[11px] text-white/90 font-medium">
                {currentDate}
              </div>
              <div className="hidden md:flex items-center gap-5">
                <Link 
                  href="/live-tv"
                  className="flex items-center gap-1.5 text-[10px] text-white/80 hover:text-white transition-colors font-bold uppercase tracking-wider"
                >
                  <div className="relative w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8"/>
                      <path d="M8 19L12 15L16 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <text x="12" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" letterSpacing="0.5">LIVE</text>
                    </svg>
                  </div>
                  <span className="sr-only">LIVE</span>
                </Link>
                <span className="w-px h-4 bg-white/30"></span>
                {topBarLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[11px] text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-12 h-12 md:w-14 md:h-14">
                  <Image 
                    src="/news-indiaLogo.png" 
                    alt="News India 24x7"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              <nav className="hidden md:block">
                <ul className="flex items-center gap-1">
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

              <div className="flex items-center gap-1">
                <Link 
                  href="/live-tv"
                  className="flex items-center justify-center w-9 h-9 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Live TV"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 27.324 21.72">
                    <defs>
                      <clipPath id="clipPath">
                        <rect id="Rectangle_4" data-name="Rectangle 4" width="27.324" height="21.72" fill="none"/>
                      </clipPath>
                    </defs>
                    <g id="Group_4" data-name="Group 4" transform="translate(0 0)">
                      <g id="Group_3" data-name="Group 3" transform="translate(0 0)" clip-path="url(#clipPath)">
                        <path id="Path_6" data-name="Path 6" d="M26.745,0H.567A.554.554,0,0,0,0,.567V16.7a.554.554,0,0,0,.567.567H13.048v3.323h-6a.567.567,0,1,0,0,1.135H20.342a.567.567,0,0,0,0-1.135H14.264V17.263H26.745c.324,0,.648-.243.567-.567V.567A.554.554,0,0,0,26.745,0M7.051,20.666a.477.477,0,0,0-.308.133.4.4,0,0,1,.308-.133m13.465.034a.524.524,0,0,0-.173-.034.456.456,0,0,1,.173.034" transform="translate(0 0)" fill="#d71920"/>
                        <rect id="Rectangle_3" data-name="Rectangle 3" width="24.962" height="14.912" transform="translate(1.182 1.083)" fill="#d71920"/>
                        <path id="Path_7" data-name="Path 7" d="M5.571,13.322a.226.226,0,0,1-.226-.226V6.941a.226.226,0,0,1,.226-.227H6.45a.22.22,0,0,1,.16.066.216.216,0,0,1,.066.16V12.2H9.668a.227.227,0,0,1,.169.066.231.231,0,0,1,.066.17V13.1a.218.218,0,0,1-.066.16.23.23,0,0,1-.169.066Z" transform="translate(-1.013 -1.273)" fill="#fff"/>
                        <path id="Path_8" data-name="Path 8" d="M12.326,13.322A.226.226,0,0,1,12.1,13.1V6.941a.226.226,0,0,1,.226-.227h.887a.218.218,0,0,1,.166.066.228.228,0,0,1,.061.16V13.1a.227.227,0,0,1-.061.16.218.218,0,0,1-.166.066Z" transform="translate(-2.294 -1.273)" fill="#fff"/>
                        <path id="Path_9" data-name="Path 9" d="M17.4,13.322a.343.343,0,0,1-.236-.075.427.427,0,0,1-.122-.189L15.019,7A.225.225,0,0,1,15,6.913a.193.193,0,0,1,.056-.142.2.2,0,0,1,.143-.057h.83a.276.276,0,0,1,.2.071.322.322,0,0,1,.089.137l1.6,4.861,1.595-4.861a.33.33,0,0,1,.089-.137.277.277,0,0,1,.2-.071h.831a.2.2,0,0,1,.137.057.186.186,0,0,1,.062.142A.228.228,0,0,1,20.814,7l-2.02,6.06a.427.427,0,0,1-.122.189.346.346,0,0,1-.237.075Z" transform="translate(-2.843 -1.273)" fill="#fff"/>
                        <path id="Path_10" data-name="Path 10" d="M23.658,13.322a.226.226,0,0,1-.226-.226V6.951a.23.23,0,0,1,.066-.17.219.219,0,0,1,.16-.066h4.154a.227.227,0,0,1,.236.237v.622a.219.219,0,0,1-.066.16.227.227,0,0,1-.169.066H24.706V9.47h2.9a.24.24,0,0,1,.169.062.215.215,0,0,1,.066.165v.584a.218.218,0,0,1-.066.166.243.243,0,0,1-.169.061h-2.9v1.728h3.181a.233.233,0,0,1,.17.066.23.23,0,0,1,.066.17V13.1a.218.218,0,0,1-.066.16.233.233,0,0,1-.17.066Z" transform="translate(-4.442 -1.273)" fill="#fff"/>
                      </g>
                    </g>
                  </svg>
                </Link>

                {/* Notification */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={handleNotificationClick}
                    className="relative p-2 cursor-pointer text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* ✅ Notification Dropdown - Always render when notificationOpen is true */}
                  {notificationOpen && (
                    <div className="absolute right-0 top-full mt-2 w-[400px] max-h-[480px] overflow-y-auto overscroll-contain bg-white rounded-2xl shadow-2xl border border-gray-100 z-[200] origin-top-right animate-slide-down">
                      {/* Header */}
                      <div className="sticky top-0 z-10 bg-white border-b border-gray-100/80 px-5 py-4 flex items-center justify-between rounded-t-2xl">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg tracking-tight">NOTIFICATIONS</h3>
                          <p className="text-xs text-gray-400 font-medium mt-0.5">
                            {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotificationOpen(false)}
                          className="flex items-center justify-center cursor-pointer w-8 h-8 text-red-600 border-2 border-red-600 hover:bg-red-50 hover:text-red-700 rounded-full transition-colors"
                          aria-label="Close notifications"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* List */}
                      <div className="divide-y divide-gray-50">
                        {isNotificationLoaded && notifications.length > 0 ? (
                          notifications.map((post) => (
                            <Link
                              key={post.id}
                              href={`/post/${post.slug}`}
                              onClick={() => {
                                setNotificationOpen(false);
                                setUnreadCount(0);
                              }}
                              className="block px-5 py-3.5 hover:bg-red-50/50 transition-colors group"
                            >
                              <div className="flex items-start gap-3">
                                {post.featuredImage?.node?.sourceUrl ? (
                                  <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image
                                      src={post.featuredImage.node.sourceUrl}
                                      alt={post.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-[72px] h-[72px] rounded-lg flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-300 text-xs">No Image</span>
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
                                    {post.title}
                                  </h4>
                                  <p className="text-[11px] text-gray-400 font-medium mt-1.5">
                                    {getTimeAgo(post.date)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : isNotificationLoaded && notifications.length === 0 ? (
                          <div className="px-5 py-10 text-center text-gray-400">
                            <Bell size={32} className="mx-auto mb-3 text-gray-300" />
                            <p className="text-sm font-medium">कोई नोटिफिकेशन नहीं</p>
                          </div>
                        ) : (
                          <div className="px-5 py-10 text-center text-gray-400">
                            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-sm font-medium">लोड हो रहा...</p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      {isNotificationLoaded && notifications.length > 0 && (
                        <div className="sticky bottom-0 z-10 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100/80 px-5 py-3 text-center rounded-b-2xl">
                          <Link
                            href="/latest"
                            onClick={() => {
                              setNotificationOpen(false);
                              setUnreadCount(0);
                            }}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors inline-flex items-center gap-1"
                          >
                            सभी खबरें देखें
                            <span className="text-lg leading-none">→</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
                  {topBarLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-500 hover:text-red-600 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
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

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}