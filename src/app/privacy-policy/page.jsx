// app/privacy-policy/page.jsx
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* ✅ Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-red-600 transition-colors">
            होम
          </Link>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">Privacy Policy</span>
        </nav>

        {/* ✅ Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-b-4 border-red-600 pb-3">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Privacy <span className="text-red-600">Policy</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">Last Updated: <span className="font-medium">August 3, 2025</span></p>
            </div>
          </div>
        </div>

        {/* ✅ Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="prose prose-gray max-w-none">
            
            <p className="text-gray-600 text-sm">
              This Privacy Policy governs the manner in which News India 24x7 (referred to as "we," "us," or "our") collects, uses, maintains, and discloses information collected from users (each, a "User") of the <a href="https://www.newsindia24x7.tv" className="text-red-600 hover:underline">www.newsindia24x7.tv</a> website ("Site"). This policy applies to the Site and all products and services offered by News India 24x7.
            </p>

            {/* Section 1 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">1. Information We Collect</h2>
            <p className="text-gray-600">We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site.</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">A. Personal Identification Information (PII)</h3>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>Directly Provided Data:</strong> We may collect PII such as name, email address, and phone number when Users subscribe to our newsletter, submit a contact form, or create an account/profile.</li>
              <li><strong>Comments:</strong> When visitors leave comments on the site, we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.</li>
              <li><strong>Media:</strong> If Users upload images to the website (e.g., in comments or profile pictures), they should avoid uploading images with embedded location data (EXIF GPS) included. Other visitors to the website can download and extract any location data from images on the website.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">B. Non-Personal Identification Information (Non-PII)</h3>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>Log Data:</strong> Information that your browser sends whenever you visit our Site (IP address, browser type and version, pages visited, time and date of visit, time spent on pages, and other statistics).</li>
              <li><strong>Device Information:</strong> Type of computer, mobile device, operating system, and other technical information about Users' means of connection to our Site.</li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">2. Web Browser Cookies and Tracking Technologies</h2>
            <p className="text-gray-600">Our Site uses "cookies" to enhance the User experience. Users' web browsers place cookies on their hard drive for record-keeping purposes and sometimes to track information about them.</p>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>Purpose:</strong> Cookies are used for things like analyzing site traffic, remembering user preferences (such as login details), and serving personalized content and advertisements.</li>
              <li><strong>WordPress/Functionality:</strong> WordPress uses cookies for logged-in users and commenters. For example, if you leave a comment on our site, you may opt-in to saving your name, email address, and website in cookies.</li>
              <li><strong>Analytics &amp; Advertising:</strong> We may use third-party services like Google Analytics and Google AdSense (or similar ad networks) which use cookies to collect and track data. News India 24x7 has no access to or control over these cookies used by third-party advertisers.</li>
              <li><strong>Your Choices:</strong> Users may choose to set their web browser to refuse cookies or to alert them when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">3. How We Use the Collected Information</h2>
            <p className="text-gray-600">News India 24x7 collects and uses Users' personal information for the following purposes:</p>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>To Run and Operate Our Site:</strong> We may need your information to display content correctly.</li>
              <li><strong>To Improve Customer Service:</strong> Information you provide helps us respond to your support needs and service requests more efficiently.</li>
              <li><strong>To Personalize User Experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
              <li><strong>To Send Periodic Emails:</strong> We may use the email address to send User information and updates pertaining to their news subscription, account, or to respond to their inquiries, questions, and/or other requests.</li>
              <li><strong>For Advertising and Marketing:</strong> To serve targeted advertisements to our Users on our Site and third-party sites.</li>
            </ul>

            {/* Section 4 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">4. How We Protect Your Information</h2>
            <p className="text-gray-600">We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.</p>

            {/* Section 5 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">5. Sharing Your Personal Information</h2>
            <p className="text-gray-600">We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>
            <p className="text-gray-600 mt-2">We may use third-party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or conducting surveys. We may share your information with these third parties for those limited purposes, provided that you have given us your permission.</p>
            <p className="text-gray-600 mt-2"><strong>Third-Party Services (e.g., Google AdSense, Analytics):</strong> The privacy policies of these third-party services govern their use of your data. We encourage you to review their policies.</p>

            {/* Section 6 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">6. Retention of Your Data</h2>
            <p className="text-gray-600">If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p>
            <p className="text-gray-600 mt-2">For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p>

            {/* Section 7 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">7. Your Data Rights</h2>
            <p className="text-gray-600">Depending on your location and applicable law, you may have the following rights regarding your personal data:</p>
            <ul className="text-gray-600 list-disc pl-5 space-y-1">
              <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
            </ul>
            <p className="text-gray-600 mt-2">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us using the details below.</p>

            {/* Section 8 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-600">News India 24x7 has the discretion to update this privacy policy at any time. When we do, we will revise the "Effective Date" at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

            {/* Section 9 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">9. Your Acceptance of These Terms</h2>
            <p className="text-gray-600">By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

            {/* Section 10 */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">10. Contacting Us</h2>
            <p className="text-gray-600">If you have any questions about this Privacy Policy, the practices of this Site, or your dealings with this Site, please contact us at:</p>
            <div className="bg-gray-50 rounded-lg p-4 mt-2 border border-gray-200">
              <p className="text-gray-700 font-medium">News India 24x7</p>
              <p className="text-gray-600 text-sm">1st Floor, KK House, 247/3, D Block, Sector 63, Noida, Uttar Pradesh 201301</p>
              <p className="text-gray-600 text-sm">Email: <a href="mailto:social@newsindia24x7.tv" className="text-red-600 hover:underline">social@newsindia24x7.tv</a></p>
              <p className="text-gray-600 text-sm">Phone: 9833000048</p>
            </div>

          </div>
        </div>

       
      </div>
    </div>
  );
}