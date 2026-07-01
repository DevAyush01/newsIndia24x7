// app/advertise/page.jsx
import React from 'react';
import Link from 'next/link';

export default function AdvertisePage() {
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
          <span className="text-gray-700 font-medium">Advertise With Us</span>
        </nav>

        {/* ✅ Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-b-4 border-red-600 pb-3">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Advertise <span className="text-red-600">With Us</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Digital and TV advertising solutions to communicate your message to your audience
              </p>
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
                    We offer a wide variety of advertising and digital solutions to communicate your message to your audience.
                  </p>
                </div>

                {/* Branded Content Studio */}
                <h2 className="text-xl font-bold text-gray-900 mt-6">In-house Content Studio</h2>
                <p className="text-gray-600">
                  News India 24x7 In-house Content Studio: Branded Content Solutions is where our expertise lies, we apply the highest standards of quality to the content we create for brands. With that thought aligned with world class storytelling, we create branded content that our readers love. Our work is narrative driven and engaging. We not only know how to create dynamic, effective advertising for your business, we know exactly how to place it so that it reaches your target audience at the right times for the lowest cost and optimum profit potential.
                </p>

                {/* Advertising Objective */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Advertising Objective</h2>
                <p className="text-gray-600">
                  To reach the right people in right time we are inviting you in our network, as our focus is to provide targeted brand visibility and promotion. Reach your audience where they're most engaged. Boost your brand awareness, drive conversions, or promote content with personalized messages delivered to prospects. Promote your brand to targeted audiences and drive awareness and leads on the most viewed professional news feed. We offer a wide variety of advertising and digital solutions to highlight your message to the right audience at the right time.
                </p>

                {/* Our Solutions */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">What You Can Buy</h2>
                <p className="text-gray-500 text-sm mb-4">Our advertising offerings / products / solutions</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Branded Content */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-800">Branded Content</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      We create narrative driven, thought provoking, engaging and persuasive content that our readers love and your consumers need which sits prominently on all our channels.
                    </p>
                  </div>

                  {/* Native Articles */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-800">Native Articles</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      A combination of editorial expertise and research, our simple to comprehend textual content makes for a powerful narrative which resonates well with our readers and delivers on brand KPIs.
                    </p>
                  </div>

                  {/* Video Stories */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-800">Video Stories</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Visual finesse added to the stories brought out through branded content excellence culminates into video solutions offered by our in-house studio. Our videos make users experience the branded story in a language and manner they understand.
                    </p>
                  </div>

                  {/* Display Innovations */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-gray-800">Display Innovations</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Stunning impactful visual renditions of display ads created as per client briefs and expectations by our design studio. We take a fewer, better approach to display advertising.
                    </p>
                  </div>
                </div>

                {/* Sponsored Content */}
                <h3 className="text-lg font-bold text-gray-800 mt-6">Sponsored Content</h3>
                <p className="text-gray-600">
                  We offer advertisers the opportunity to maximize their partnerships with News India 24x7 through ownership of key content which aligns both brands.
                </p>

                {/* Why Advertise */}
                <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">Why Advertise with News India 24x7</h2>
                <p className="text-gray-600">
                  We build inclusive, progressive brands. We know the pulse and heart of your audience and we tell a compelling brand story that your audience will connect with. The honest values we have held since our founding are just as relevant today, they're modern. We recognize that brands can scale anywhere, but we offer something much harder to capture: our reach comes with attention, affinity, and trust.
                </p>
                <p className="text-gray-600 mt-2">
                  When you think about the vast range of subjects and interests that The We Cover, it means we have an accurate understanding of how our readers behave and what they are into. News India 24x7 has been in the news publishing business for a decade now and a culture of ethical reporting, storytelling and service to our communities has created countless milestone moments in this journey so far.
                </p>
                <p className="text-gray-600 mt-2">
                  With awareness and evolving approach News India 24x7 continues to grow and adapt to change. The strength of News India 24x7 lies in consistent and crisp reporting, editorial coverage, with a clear focus on variety on not only local issues of our Hindi heartland, but also on issues of State, as well as National and International interest.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT - Sidebar */}
          <aside className="w-full lg:w-[30%]">
            <div className="sticky top-24 space-y-6">
              
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-4">
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get in Touch
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Call us</p>
                      <a href="tel:01206980000" className="text-sm font-medium text-gray-800 hover:text-red-600 transition">0120-6980000</a>
                      <br />
                      <a href="tel:+919311797253" className="text-sm font-medium text-gray-800 hover:text-red-600 transition">+91-9311797253</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Email us</p>
                      <a href="mailto:social@newsindia24x7.tv" className="text-sm font-medium text-gray-800 hover:text-red-600 transition">social@newsindia24x7.tv</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Visit us</p>
                      <p className="text-sm text-gray-600">1st Floor, KK House, 247/3, D Block, Sector 63, Noida, UP 201301</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm">Quick Links</h4>
                </div>
                <div className="p-4 space-y-2">
                  <Link href="/contact" className="block text-sm text-gray-600 hover:text-red-600 transition py-1.5 border-b border-gray-50">
                    Contact Us →
                  </Link>
                  <Link href="/privacy-policy" className="block text-sm text-gray-600 hover:text-red-600 transition py-1.5 border-b border-gray-50">
                    Privacy Policy →
                  </Link>
                  <Link href="/terms-and-conditions" className="block text-sm text-gray-600 hover:text-red-600 transition py-1.5">
                    Terms & Conditions →
                  </Link>
                </div>
              </div>

            </div>
          </aside>

        </div>

        
      </div>
    </div>
  );
}