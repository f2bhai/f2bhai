import React from 'react';
import LegalLayout from '../components/LegalLayout';

const CookiePolicy = () => {
  return (
    <LegalLayout title="Cookie Policy">
      <div className="space-y-6">
        <p className="text-white/60">Last Updated: [20/02/2025]</p>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and helping with our marketing efforts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-medium mb-2">1. Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
          </p>

          <h3 className="text-xl font-medium mb-2">2. Analytics Cookies</h3>
          <p className="mb-4">
            We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's functionality and content.
          </p>

          <h3 className="text-xl font-medium mb-2">3. Preference Cookies</h3>
          <p className="mb-4">
            These cookies remember your choices and preferences to provide enhanced, personalized features.
          </p>

          <h3 className="text-xl font-medium mb-2">4. Marketing Cookies</h3>
          <p>
            These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website.
          </p>
          <p className="mt-4">
            To learn more about cookies and how to manage them, visit{' '}
            <a
              href="https://www.aboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400"
            >
              www.aboutcookies.org
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:{' '}
            <a href="mailto:f2business26@gmail.com" className="text-teal-500 hover:text-teal-400">
              f2business26@gmail.com
            </a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default CookiePolicy;