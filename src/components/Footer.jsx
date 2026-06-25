// components/Footer.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('कृपया सही ईमेल पता दर्ज करें');
      return;
    }

    // Here you can add API call to save email
    console.log('📧 Subscribed Email:', email);
    
    setSubscribed(true);
    setError('');
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="container mx-auto px-4 py-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-red-500">News</span>India<span className="text-red-500">24x7</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              भारत और दुनिया की ताज़ा खबरें, हिंदी में। 
              सटीक, तेज़ और विश्वसनीय समाचार।
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © 2026 NewsIndia24x7. All rights reserved.
            </p>
          </div>

          {/* Column 2: News Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              NEWS
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/india" className="hover:text-red-500 transition">भारत</Link></li>
              <li><Link href="/category/world" className="hover:text-red-500 transition">विदेश</Link></li>
              <li><Link href="/category/states" className="hover:text-red-500 transition">राज्य</Link></li>
              <li><Link href="/category/politics" className="hover:text-red-500 transition">राजनीति</Link></li>
              <li><Link href="/category/sports" className="hover:text-red-500 transition">खेल</Link></li>
              <li><Link href="/category/entertainment" className="hover:text-red-500 transition">मनोरंजन</Link></li>
            </ul>
          </div>

          {/* Column 3: States */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              STATES
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/delhi" className="hover:text-red-500 transition">दिल्ली</Link></li>
              <li><Link href="/category/punjab" className="hover:text-red-500 transition">पंजाब</Link></li>
              <li><Link href="/category/west-bengal" className="hover:text-red-500 transition">पश्चिम बंगाल</Link></li>
              <li><Link href="/category/madhya-pradesh" className="hover:text-red-500 transition">मध्य प्रदेश</Link></li>
              <li><Link href="/category/maharashtra" className="hover:text-red-500 transition">महाराष्ट्र</Link></li>
              <li><Link href="/category/uttar-pradesh" className="hover:text-red-500 transition">उत्तर प्रदेश</Link></li>
            </ul>
          </div>

          {/* Column 4: Trending */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              TRENDING
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/ipl" className="hover:text-red-500 transition">आईपीएल</Link></li>
              <li><Link href="/category/rasifal" className="hover:text-red-500 transition">राशिफल</Link></li>
              <li><Link href="/category/astrology" className="hover:text-red-500 transition">ग्रह गोचर</Link></li>
              <li><Link href="/category/bollywood" className="hover:text-red-500 transition">बॉलीवुड</Link></li>
              <li><Link href="/category/regional-cinema" className="hover:text-red-500 transition">रीजनल सिनेमा</Link></li>
              <li><Link href="/category/elections" className="hover:text-red-500 transition">चुनाव</Link></li>
            </ul>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-bold text-xl mb-2">
              Subscribe to Updates
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest news directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-red-500 transition"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}

            {subscribed && (
              <p className="text-green-400 text-sm mt-2">
                ✅ आपको सफलतापूर्वक सब्सक्राइब कर लिया गया है!
              </p>
            )}

            <p className="text-xs text-gray-500 mt-3">
              By signing up, you agree to our{' '}
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white underline">
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/terms" className="text-gray-400 hover:text-white underline">
                Terms & Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 NewsIndia24x7. All rights reserved.</p>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Condition</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}