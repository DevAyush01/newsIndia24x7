// app/terms-and-conditions/page.jsx
import React from 'react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
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
          <span className="text-gray-700 font-medium">Terms &amp; Conditions</span>
        </nav>

        {/* ✅ Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 border-b-4 border-red-600 pb-3">
            <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Terms &amp; <span className="text-red-600">Conditions</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">Legal Disclaimer - News India 24x7</p>
            </div>
          </div>
        </div>

        {/* ✅ Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="prose prose-gray max-w-none">
            
            {/* Intro */}
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r mb-6">
              <p className="text-gray-700 text-sm">
                <strong>Effective Date:</strong> August 3, 2025
              </p>
              <p className="text-gray-600 text-sm mt-1">
                We at News India 24x7 are committed to safeguarding your online privacy. Please read our policy page to understand how your private information will be treated while you make full use of our online contents or other offerings. This policy may change from time to time, so please come back and check periodically.
              </p>
            </div>

            {/* Section 1 - General */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">1. General</h2>
            <p className="text-gray-600">
              This Agreement sets forth the terms and conditions that apply to use of this website, <a href="https://www.newsindia24x7.tv" className="text-red-600 hover:underline">www.newsindia24x7.tv</a>, and all sub-sites that reside under this site (collectively, the "News India 24x7 Sites"), by a Subscriber. "Subscriber" means each person who establishes or accesses an account ("Account") for access to and use of the Site.
            </p>

            {/* Section 2 - Restrictions on use */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">2. Restrictions on Use</h2>
            <p className="text-gray-600">
              News India 24x7 is owned and operated by Omega TV Media Pvt Ltd. ("the Company") and contains material which is derived in whole or in part from material supplied by the Company, various news agencies and other sources and is protected by international copyright and trademark laws. Except where specifically authorised, the Subscriber may not modify, copy, reproduce, republish, upload, post, transmit or distribute in any way any material from News India 24x7 including code and software.
            </p>
            <p className="text-gray-600 mt-2">
              By visiting our site, you are agreeing to be bound by the terms and conditions hereof. The Company shall have the right at any time to change or discontinue any aspect or feature of the News India 24x7 Site, including, but not limited to, content, hours of availability, equipment needed for access or use, adding fees and charges for use. Your continued use of the News India 24x7 site means that you accept any new or modified terms and conditions that we come up with.
            </p>

            {/* Section 3 - Subscriber Conduct */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">3. Subscriber Conduct</h2>
            <p className="text-gray-600">
              Subscriber shall use the News India 24x7 for lawful purposes only. Subscriber shall not post or transmit through the News India 24x7 Site any material which violates or infringes in any way upon the rights of others, is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any law, or which, without the Company's express prior written consent, contains advertising or any solicitation with respect to products or services.
            </p>
            <p className="text-gray-600 mt-2">
              Any conduct by a Subscriber that in the Company's discretion restricts or inhibits any other Subscriber from using or enjoying the News India 24x7 site will not be permitted. Subscriber shall not use the News India 24x7 Site to advertise or perform any commercial solicitation, including, but not limited to, the solicitation of users to become subscribers of other on-line information services competitive with News India 24x7 Site.
            </p>
            <p className="text-gray-600 mt-2">
              News India 24x7 Site contains copyrighted material, trademarks and other proprietary information, including, but not limited to, text, software, photos, video, graphics, music, sound, and the entire contents of the News India 24x7 Site are copyrighted as a collective or severable work under applicable copyright laws.
            </p>
            <p className="text-gray-600 mt-2">
              The Company and/or its affiliates own or have acquired the copyright in the selection, coordination, arrangement and enhancement of such content, as well as in the content original to it. Subscriber may not modify, publish, transmit, participate in the transfer or sale, create derivative works, or in any way exploit, any of the Content, in whole or in part. Subscriber may download copyrighted material for Subscriber's personal use only. Except as otherwise expressly permitted under copyright law, no copying, redistribution, retransmission, publication or other commercial exploitation of downloaded material will be permitted without the express permission of the Company and the copyright owner. Subscriber acknowledges that it does not acquire any ownership rights by downloading copyrighted material.
            </p>

            {/* Section 4 - Legal advice */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">4. Legal Advice for Indian Businesses</h2>
            <p className="text-gray-600">
              Subscriber shall not upload, post or otherwise make available on the News India 24x7 Sites any material protected by copyright, trademark or other proprietary right without the express permission of the owner of the copyright, trademark or other proprietary right and the burden of determining whether any material is not protected by copyright rests with Subscriber. Subscriber shall be solely liable for any damage resulting from any infringement of copyright, proprietary rights, or any other harm resulting from such a submission.
            </p>
            <p className="text-gray-600 mt-2">
              By submitting material to any public area of the News India 24x7 Site, Subscriber automatically grants, or warrants that the owner of such material has expressly granted, the Company the royalty-free, perpetual, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate and distribute such material (in whole or in part) worldwide and/or to incorporate it in other works in any form, media or technology now known or hereafter developed for the full term of any copyright that may exist in such material.
            </p>
            <p className="text-gray-600 mt-2">
              Subscriber also permits any other Subscriber to access, view, store or reproduce the material for that Subscriber's personal use. Subscriber hereby grants the Company the right to edit, copy, publish and distribute any material made available on the News India 24x7 Site by Subscriber. The foregoing provisions are for the benefit of the Company, its subsidiaries, affiliates, its third-party content providers and licensors and each shall have the right to assert and enforce such provisions directly or on its own behalf.
            </p>

            {/* Section 5 - Limitation of Liability */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              You expressly agree that use of the website is at your sole risk. The content, information, software, products, features and services published on this website may include inaccuracies or typographical errors. Changes are periodically added to the content herein. The Company, News India 24x7 site newsindia24x7.tv and/or its respective content providers may make improvements and/or changes to this web site at any time.
            </p>
            <p className="text-gray-600 mt-2">
              This Web Site may be temporarily unavailable from time to time due to required maintenance, telecommunications interruptions, or other disruptions. News India 24x7 (and its owners, suppliers, consultants, advertisers, affiliates, partners, employees or any other associated entities, all collectively referred to as associated entities) shall not be liable to the user or member or any third party if News India 24x7.com exercise its right to modify or discontinue any or all of the content, information, software, products, features and services published on this website.
            </p>
            <p className="text-gray-600 mt-2">
              In no event shall News India 24x7 and/or its associated entities be liable for any direct, indirect, punitive, incidental, special or consequential damages arising out of or in any way connected with the use of this website, or with the delay or inability to use this website, or for any content, information, software, products, features or services obtained through this website, or otherwise arising out of the use of this website.
            </p>

            {/* Section 6 - Indemnification */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">6. Indemnification</h2>
            <p className="text-gray-600">
              Subscriber agrees to defend, indemnify and hold harmless the Company, its affiliates and their respective directors, officers, employees and agents from and against all claims and expenses, including attorney's fees, arising out of the use of the News India 24x7 Site by Subscriber or Subscriber's Account.
            </p>

            {/* Section 7 - Termination */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">7. Termination</h2>
            <p className="text-gray-600">
              The Company shall have the right to immediately terminate Subscriber's Account in the event of any conduct by Subscriber which the Company, in its sole discretion, considers to be unacceptable, or in the event of any breach by Subscriber of this Agreement.
            </p>

            {/* Section 8 - Trademarks */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">8. Trademarks</h2>
            <p className="text-gray-600">
              "News India 24x7", or any other trademarks and trade names being shown or used on the News India 24x7 Sites are the property of their respective owners.
            </p>

            {/* Section 9 - Third Party Content */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">9. Third Party Content</h2>
            <p className="text-gray-600">
              The Company is a distributor (and not a publisher) of content supplied by third parties and Subscribers. Any opinions, advice, statements, services, offers, or other information or content expressed or made available by third parties, including information providers, Subscribers or any other user of the News India 24x7 site, are those of the respective author(s) or distributor(s) and not of the Company. Neither the Company nor any third-party provider of information guarantees the accuracy, completeness, or usefulness of any content, nor its merchantability or fitness for any particular purpose.
            </p>
            <p className="text-gray-600 mt-2">
              In many instances, the content available through News India 24x7 Sites represents the opinions and judgments of the respective information provider, Subscriber, or other user not under contract with the Company. The Company neither endorses nor is responsible for the accuracy or reliability of any opinion, advice or statement made on the News India 24x7 Site by anyone other than authorized Company employee spokespersons when acting in their official capacities. Under no circumstances will the Company be liable for any loss or damage caused by a Subscriber's reliance on information obtained through the News India 24x7 Sites. It is the responsibility of Subscriber to evaluate the accuracy, completeness or usefulness of any information, opinion, advice or other content available through the News India 24x7 site.
            </p>

            {/* Section 10 - Disclaimer */}
            <h2 className="text-xl font-bold text-gray-900 mt-8 pt-4 border-t border-gray-100">10. Disclaimer</h2>
            <p className="text-gray-600">
              The Company has provided or may provide links and pointers to Internet sites maintained by third parties. The linked sites are not under the control of the Company. The company has not reviewed, nor approved these sites and is not responsible for the content or omissions of any linked sites or for any links contained in a linked site. The inclusion of any linked site does not imply endorsement by the Company of the site.
            </p>
            <p className="text-gray-600 mt-2">
              The Company does not warrant that the functions contained in the materials will be uninterrupted or error-free, that defects will be corrected, or that this site, including Bulletin Boards, or the server that makes it available, are free of viruses or other harmful components. The Company does not warrant or make any representations regarding the use or the results of the use of the materials in The News India 24x7 or in third-party sites in terms of their correctness, accuracy, timeliness, reliability or otherwise. Subscriber (and not the Company) assume the entire cost of all necessary maintenance, repair or correction.
            </p>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-lg p-4 mt-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">
                If you have any questions about these Terms &amp; Conditions, please contact us at:
              </p>
              <div className="mt-2">
                <p className="text-gray-700 font-medium">News India 24x7</p>
                <p className="text-gray-600 text-sm">1st Floor, KK House, 247/3, D Block, Sector 63, Noida, Uttar Pradesh 201301</p>
                <p className="text-gray-600 text-sm">Email: <a href="mailto:social@newsindia24x7.tv" className="text-red-600 hover:underline">social@newsindia24x7.tv</a></p>
                <p className="text-gray-600 text-sm">Phone: 0120-6980000, +91-9311797253</p>
              </div>
            </div>

          </div>
        </div>

       
      </div>
    </div>
  );
}