// app/contact/page.jsx
import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
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
          <span className="text-gray-700 font-medium">संपर्क करें</span>
        </nav>

        {/* ✅ Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-b-4 border-red-600 pb-3">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                संपर्क <span className="text-red-600">करें</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">हमसे जुड़ने के लिए नीचे दिए गए माध्यमों का उपयोग करें</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ✅ LEFT - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                <h2 className="text-white font-bold text-lg">संपर्क जानकारी</h2>
                <p className="text-red-100 text-sm">हमसे जुड़ने के लिए नीचे दिए गए माध्यमों का उपयोग करें</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">पता</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      1st Floor, KK House, 247/3, D Block,<br />
                      Sector 63, Noida, Uttar Pradesh 201301
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">ईमेल</h4>
                    <a href="mailto:social@newsindia24x7.tv" className="text-sm text-red-600 hover:text-red-700 transition">
                      social@newsindia24x7.tv
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700">फोन</h4>
                    <a href="tel:01206980000" className="text-sm text-red-600 hover:text-red-700 transition block">
                      0120-6980000
                    </a>
                    <a href="tel:+919311797253" className="text-sm text-red-600 hover:text-red-700 transition">
                      +91-9311797253
                    </a>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          {/* ✅ RIGHT - Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  हमारा स्थान
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  1st Floor, KK House, 247/3, D Block, Sector 63, Noida, Uttar Pradesh 201301
                </p>
              </div>
              <div className="w-full h-[450px] bg-gray-200">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9664841402364!2d77.37978917536925!3d28.630766584161158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5b5cb77873d%3A0xa27dc877b32a8860!2sNews%20India%2024x7!5e0!3m2!1sen!2sin!4v1782824967694!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="News India 24x7 Office Location"
                />
              </div>
            </div>
          </div>

        </div>

       
      </div>
    </div>
  );
}