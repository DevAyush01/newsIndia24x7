// app/about/page.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* ✅ Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-red-600 transition-colors">
            होम
          </Link>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">About Us</span>
        </nav>

        {/* ✅ Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-b-4 border-red-600 pb-3">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                About <span className="text-red-600">Us</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">Know more about News India 24x7</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ✅ LEFT - Main Content */}
          <div className="w-full lg:w-[70%]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="prose prose-gray max-w-none">
                
                {/* Intro */}
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r mb-6">
                  <p className="text-gray-700 text-sm">
                    News India 24x7 is a Hindi-language national news Channel, headquartered in Noida, Uttar Pradesh, India. 
                    'News India 24x7' literally means people's emotions and is directed by the idea of bringing in the news in 
                    its truest form and reporting the positive and purposeful news stories that we need today.
                  </p>
                </div>

                <p className="text-gray-600">
                  Our national daily covers sports, entertainment, local and general interest news with India's sharpest political 
                  stories, hard-hitting investigative pieces and global opinion and editorial pages. While our website provides 
                  credible news to millions of people nationwide, the site provides real-time news on politics, business, sports, 
                  entertainment, technology, lifestyle, and the world, in text, images and videos.
                </p>

                {/* Our Story */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Our Story</h2>
                <p className="text-gray-600">
                  Founded in 2013, News India 24x7 is one of India's fastest growing Hindi news Channels. With a large daily 
                  viewership, making it to one of the Top News channel in India. The geography of News India 24x7 news covers 
                  all over India. News India 24x7 runs 24-hour TV and Digital channel with the most prominent team of Anchors, 
                  reporters and editorial team. Within mainline TV Journalism and the website, we focus on every aspect of 
                  society which helps to achieve our Tagline.
                </p>

                {/* Tagline */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 my-6 text-center">
                  <p className="text-white text-sm font-medium uppercase tracking-wider">Our Tagline / Motto</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                    “Rashtra Ki Aawaz”
                  </h3>
                  <p className="text-red-100 text-sm mt-1">Voice of the Nation</p>
                </div>

                {/* Our Culture */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Our Culture</h2>
                <p className="text-gray-600">
                  Fair Stories, Ethical Reporting, Diversity, Equality, and Inclusion is our commitment to our colleagues and 
                  our customers. Creating an environment that celebrates and supports diversity is what joins us together to 
                  foster creativity and innovation. Across every division, our employees are connected by shared values of 
                  innovation, storytelling, creativity, vision, social good and partnership.
                </p>

                {/* Our Work */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Our Work</h2>
                <p className="text-gray-600">
                  We work with clients across various industries and craft result-oriented native content strategies to help 
                  accomplish their desired campaign goals. Our flair for story-telling goes beyond messaging and touches upon 
                  the purpose of the brand. We think, create, and drive our partners' stories to the most relevant audiences. 
                  Our reach helps advertisers reach the most relevant audiences across platforms be it digital or on-ground.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-gray-100">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">2013</p>
                    <p className="text-xs text-gray-500">Founded</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">24×7</p>
                    <p className="text-xs text-gray-500">Hours Coverage</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">Pan-India</p>
                    <p className="text-xs text-gray-500">Reach</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">TV + Digital</p>
                    <p className="text-xs text-gray-500">Platforms</p>
                  </div>
                </div>

                {/* Core Values */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Fair Stories</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Ethical Reporting</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Diversity & Inclusion</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Innovation & Creativity</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Social Good</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <span className="text-red-600 text-lg">✓</span>
                    <span className="text-sm text-gray-700">Partnership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT - Sidebar */}
          <aside className="w-full lg:w-[30%]">
            <div className="sticky top-24 space-y-6">
              
              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-3">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quick Links
                  </h3>
                </div>
                <div className="p-4 space-y-2">
                  <Link href="/advertise" className="block text-sm text-gray-600 hover:text-red-600 transition py-2 border-b border-gray-50">
                    Advertise With Us →
                  </Link>
                  <Link href="/contact" className="block text-sm text-gray-600 hover:text-red-600 transition py-2 border-b border-gray-50">
                    Contact Us →
                  </Link>
                  <Link href="/privacy-policy" className="block text-sm text-gray-600 hover:text-red-600 transition py-2 border-b border-gray-50">
                    Privacy Policy →
                  </Link>
                  <Link href="/terms-and-conditions" className="block text-sm text-gray-600 hover:text-red-600 transition py-2">
                    Terms & Conditions →
                  </Link>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm">Get in Touch</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Call us</p>
                      <a href="tel:01206980000" className="text-sm font-medium text-gray-800 hover:text-red-600 transition">0120-6980000</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Email us</p>
                      <a href="mailto:social@newsindia24x7.tv" className="text-sm font-medium text-gray-800 hover:text-red-600 transition">social@newsindia24x7.tv</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>

        
      </div>
    </div>
  );
}